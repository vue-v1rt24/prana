<script setup lang="ts">
import type { TypePortfolios } from '~/types/portfolios.types';
import type { TypeWorkId, TypeWork } from '@/types/home-page/works.types';

// Получение ссылки на API
const { graphqlUrl } = useRuntimeConfig().public;

//
const route = useRoute();
const router = useRouter();

//
const activeClassFilter = ref('all'); // для переключения класса кнопки фильтра
const filterInstance = ref<any>(null); // для объекта плагина фильтра

const open = ref(false); // для открытия модального окна
const dataWork = useState<TypeWork>('work'); // для хранения полученных данных из админки
const viewSkeleton = ref(true); // для показа скелетона на карточках работ при загрузке страницы

const worksFilter = ref<HTMLDivElement | null>(null);
const filterJs = ref<HTMLDivElement | null>(null);

// Формирование мета тегов
const metadata = ref({
  metaTitle: 'Наши работы',
  metaDescription: 'Наши работы',
});

// Подключение файла для фильтрации сортировки
useHead({
  title: () => metadata.value.metaTitle,
  meta: [{ name: 'description', content: () => metadata.value.metaDescription }],
  script: [
    {
      defer: true,
      src: '/libs/mixitup.min.js',
    },
  ],
});

// Скрытие скелетона
setTimeout(() => {
  viewSkeleton.value = false;
}, 3000);

// Запрос на получение всех данных
const portfolios = {
  query: `
  {
    portfolios {
      nodes {
        databaseId
        slug
        homePreview {
          izobrazhenie {
            node {
              mediaItemUrl
            }
          }
          zagolovok
          vyborText
          zagolovokHover
          homePreviewTextTekst
          vyborVideo
          video {
            node {
              mediaItemUrl
            }
          }
        }
        portfolioCategories {
          nodes {
            name
          }
        }
      }
    }
    portfolioCategories {
      nodes {
        name
        count
      }
    }
  }
  `,
};

const { data: articles } = await useFetch(graphqlUrl, {
  query: portfolios,

  transform(data) {
    const d = data as TypePortfolios;
    const portfolios = d.data.portfolios.nodes;
    const categories = d.data.portfolioCategories.nodes;
    const countAllInCategoryArticle = categories.reduce((acc, item) => acc + item.count, 0);

    return {
      portfolios,
      categories,
      countAllInCategoryArticle,
    };
  },
});

// Запрос на получение одной записи работы
const getWork = async (id: number) => {
  const workQuery = {
    query: `
  {
    portfolioBy(portfolioId: ${id}) {
      databaseId
      metaTags {
        metaTitle
        metaDescription
      }
      fullOutputOfTheWork {
        zagolovok
        fullWorkOpisanieVypolnennojRaboty
        fullWorkDopDescMob
        dopolnitelnoeOpisanieVypolnennojRabotyDlyaMobilnogo
        godSdachi
        fullWorkSajtVypolnennojRaboty
        fullWorkFotoVypolnennojRabotyPc {
          fullWorkFotoVypolnennojRabotyPcIzobrazhenie {
            node {
              mediaItemUrl
            }
          }
        }
        fullWorkFotoVypolnennojRabotyVMob {
          fullWorkFotoVypolnennojRabotyVMobIzobrazhenie {
            node {
              mediaItemUrl
            }
          }
        }
        fullWorkKomandaProekta {
          fullWorkKomandaProektaFoto {
            node {
              mediaItemUrl
            }
          }
          fullWorkKomandaProektaDolzhnost
          fullWorkKomandaProektaImyaFamiliya
        }
        kolichestvoPonravivshimsyaStatya
      }
      portfolioCategories {
        nodes {
          name
        }
      }
    }
  }
  `,
  };

  if (process.server) {
    // Получение данных если есть параметр в адресной строке
    const { data } = await useFetch(graphqlUrl, {
      query: workQuery,

      transform(data) {
        const work = data as TypeWorkId;

        return {
          id: work.data.portfolioBy.databaseId,
          metaTags: work.data.portfolioBy.metaTags,
          ...work.data.portfolioBy.fullOutputOfTheWork,
          categories: work.data.portfolioBy.portfolioCategories.nodes,
        };
      },
    });

    return data.value;
  } else {
    // Получение данных по клику
    const data = await $fetch<TypeWorkId>(graphqlUrl, {
      query: workQuery,
    });

    return {
      id: data.data.portfolioBy.databaseId,
      metaTags: data.data.portfolioBy.metaTags,
      ...data.data.portfolioBy.fullOutputOfTheWork,
      categories: data.data.portfolioBy.portfolioCategories.nodes,
    };
  }
};

// Вывод работы в модальном окне
const showWork = async () => {
  try {
    const work = articles.value?.portfolios.find((w) => w.slug === route.params.slug);

    if (work?.databaseId) {
      const workData = await getWork(work.databaseId);

      if (!workData?.zagolovok) throw new Error('Данные не получены');

      metadata.value = workData.metaTags;

      dataWork.value = workData;
      dataWork.value['slug'] = route.params.slug;
      open.value = true;
    }
  } catch (error) {
    console.log(error);
  }
};

// После закрытия модального окна
const closeWork = async () => {
  let cat = {};

  metadata.value.metaTitle = 'Наши работы';
  metadata.value.metaDescription = 'Наши работы';

  if (route.query.cat) {
    cat = { cat: route.query.cat };

    // Подъём на верх страницы при перестроении работ (когда фильтруем по тегам в модальном окне)
    worksFilter.value?.scrollIntoView();
    // document.body.scrollIntoView();
    // window.scrollTo(0, 0);
    console.log('Подъём');
  }

  router.push({ path: '/portfolio', query: cat });
  open.value = false;
};

// Изменение фильтра
const changeFilter = (nameClassFilter: string) => {
  const cl = '.' + nameClassFilter.replaceAll(' ', '_');

  filterInstance.value.filter(cl);
  activeClassFilter.value = nameClassFilter;
};

// Сброс гет параметров в адресной строке при переключении кнопок фильтрации
const resetRouteQuery = () => {
  if (route.query.cat) {
    router.push({ path: '/portfolio', query: {} });
  }
};

// Отслеживание параметра 'slug'
watchEffect(async () => {
  if ('slug' in route.params) {
    showWork();
  }

  if (route.query.cat) {
    const f = decodeURI(route.query.cat as string);

    if (filterInstance.value) {
      changeFilter(f);
    }
  }
});

//
onMounted(() => {
  // Фильтрация работ
  filterInstance.value = mixitup(filterJs.value);
});

//
onUnmounted(() => {
  filterInstance.value.destroy();
});
</script>

<template>
  <div class="page_portfolio">
    <!-- Хлебные крошки -->
    <div class="breadcrumbs_bx">
      <div class="container">
        <nav class="breadcrumbs">
          <NuxtLink to="/">Главная</NuxtLink>
          <span class="breadcrumbs_delimiter"></span>
          Портфолио
        </nav>
      </div>
    </div>

    <!--  -->
    <div class="portfolio_particles"></div>

    <!-- Кнопки -->
    <section class="works_fiter" ref="worksFilter">
      <div class="container">
        <h2 class="title_52">Портфолио</h2>

        <div v-show="!viewSkeleton" class="works_tabs">
          <button
            type="button"
            data-filter="all"
            @click="(activeClassFilter = 'all'), resetRouteQuery()"
            :class="['works_tabs__btn control', { active: activeClassFilter === 'all' }]"
          >
            <span class="works_tabs__btn_title">Все</span>
            <span class="works_tabs__btn_count">{{ articles?.countAllInCategoryArticle }}</span>
          </button>

          <button
            v-for="(cat, idx) in articles?.categories"
            :key="cat.name"
            type="button"
            :data-filter="`.${cat.name.replaceAll(' ', '_')}`"
            @click="(activeClassFilter = cat.name), resetRouteQuery()"
            :class="['works_tabs__btn control', { active: activeClassFilter === cat.name }]"
          >
            <span class="works_tabs__btn_title">{{ cat.name }}</span>
            <span class="works_tabs__btn_count">{{ cat.count }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Портфолио -->
    <section class="works_bx">
      <div v-show="viewSkeleton" class="works">
        <PagePortfolioSkeletonWork v-show="viewSkeleton" v-for="w in 30" :key="w" />
      </div>

      <div v-show="!viewSkeleton" class="works" ref="filterJs">
        <PagePortfolio v-for="article in articles?.portfolios" :key="article.databaseId" :article />
      </div>
    </section>

    <!--  -->
    <PagePortfolioModalWork
      v-if="dataWork"
      :open="open"
      @close-work="closeWork"
      :data-work="dataWork"
    />
  </div>
</template>

<style lang="css" scoped>
.page_portfolio {
  background-color: transparent;
  background-image: linear-gradient(var(--bg) 1000px, white 1000px);
}

.portfolio_particles {
  position: absolute;
  top: 0;
  right: 0;
  width: 1012px;
  height: 633px;
  background-image: url(/img/portfolio/decor_portfolio_1.svg);
  background-repeat: no-repeat;
  overflow: hidden;
  z-index: -1;
}

/*  */
.page_portfolio .works_bx::before {
  bottom: -228px;
}

.page_portfolio .title_52 {
  font-size: 62px;
  letter-spacing: 0.02em;
  text-align: left;
  margin-bottom: 82px;
}

/*  */
.works_tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 62px;
}

.works_tabs::-webkit-scrollbar {
  height: 0;
}

.works_tabs__btn {
  height: 71px;
  font-family: var(--fontFamily-RoadRadio);
  font-size: 18px;
  color: white;
  background-color: #060e1b;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
  border: none;
  border-radius: 18px;
  padding: 0 34px;
}

.works_tabs__btn.active {
  background-color: var(--accentColor2);
}

.works_tabs__btn_count {
  color: rgba(255, 255, 255, 0.25);
}

.works_tabs__btn.active .works_tabs__btn_count {
  color: var(--colorTextOpacity06);
}

/*  */
.discuss_bx {
  background-color: white;
  padding-bottom: 160px;
}

.discuss {
  color: var(--colorDark3);
  background-color: var(--colorBirch);
  background-image: url(../img/portfolio/discuss_particle.png);
  background-repeat: no-repeat;
  background-position: right center;
  border-radius: 42px;
  padding: 100px;
}

.discuss_form {
  max-width: 660px;
}

.discuss__title {
  font-family: var(--fontFamily-RFDewi);
  font-weight: 700;
  font-size: 38px;
  line-height: 120%;
  letter-spacing: 0.02em;
  margin-bottom: 52px;
}

.discuss__fields {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.discuss__fields input,
.discuss__fields textarea {
  width: 48%;
  height: 93px;
  font-family: var(--fontFamily-NeueMachina);
  background-color: white;
  border: none;
  border-radius: 24px;
  padding: 36px;
}

.discuss__fields input::placeholder,
.discuss__fields textarea::placeholder {
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: var(--colorGray);
}

.discuss__fields textarea {
  width: 100%;
  resize: none;
}

.discuss__file {
  margin: 42px 0;
}

.discuss__file_title {
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
  margin-bottom: 24px;
}

/*  */
.discuss__submit {
  display: flex;
  align-items: center;
  gap: 20px 24px;
}

.discuss__file_btn {
  width: 228px;
  height: 42px;
  color: var(--accentColor2);
  background-color: transparent;
  display: flex;
  align-items: center;
  column-gap: 10px;
  border: 2px solid var(--accentColor);
  border-radius: 47px;
  padding: 12px 26px;
}

.discuss__file_load,
.discuss__file_success {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
}

.discuss__file_btn.load .discuss__file_load {
  display: none;
}

.discuss__file_success {
  display: none;
}

.discuss__file_btn.load .discuss__file_success {
  display: flex;
}

.discuss__file_btn_plus {
  font-size: 28px;
}

.discuss_form .blue_btn {
  width: 315px;
  height: 103px;
  flex-shrink: 0;
  margin: 0;
}

.discuss__submit_text {
  font-weight: 300;
  font-size: 14px;
  line-height: 130%;
  color: var(--colorGray);
}

.discuss__submit_text a {
  color: var(--colorGray);
  border-bottom: 1px solid var(--colorGray);
}
</style>
