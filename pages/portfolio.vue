<script setup lang="ts">
import { useGetParentsCategoryPortfolio } from '~/composables/portfolios/useGetParentsCategoryPortfolio';
import { useAllPortfolio } from '~/composables/portfolios/useAllPortfolio';
import { useGetWork as getWork } from '~/composables/portfolios/useGetWork'; // Запрос на получение одной записи работы

import { useActiveBtnCategoryPortfolio } from '~/composables/useLocalStorages';
import type { TypeWork } from '@/types/home-page/works.types';
import { replaceSpace } from '@/utils/utils';

import '@/assets/css/works.css';

//
const route = useRoute();
const router = useRouter();

//
const filterInstance = ref<any>(null); // для объекта плагина фильтра

const idxCategory = ref<number | null>(null); // для хранения индекса категории первого уровня кнопок. Нужно для открытия дочерних категорий (кнопок)

const open = ref(false); // для открытия модального окна
const dataWork = useState<TypeWork>('work'); // для хранения полученных данных из админки
const viewSkeleton = ref(true); // для показа скелетона на карточках работ при загрузке страницы

const worksFilter = ref<HTMLDivElement | null>(null);
const filterJs = ref<HTMLDivElement | null>(null);

// Формирование мета тегов
const metadata = ref({
  metaTitle: 'Портфолио | Проекты компании PRANA IT',
  metaDescription:
    'Кейсы по брендингу, web-разработке, продвижению в Интернете фото-и видеосъемке. Подберем решение для вашего бизнеса.',
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

// Запрос на получения родительских категорий портфолио
// (нужно для их исключения из тегов карточек)
const { cats } = await useGetParentsCategoryPortfolio();

// Запрос на получение всех данных
const { articles } = await useAllPortfolio();

// Вывод работы в модальном окне
const showWork = async () => {
  try {
    const work = articles.value?.portfolios.find((w) => w.slug === route.params.slug);

    if (!work) {
      showError('');
    }

    if (work?.databaseId) {
      const workData = await getWork(work.databaseId);

      if (!workData?.zagolovok) throw new Error('Данные не получены');

      metadata.value = workData.metaTags;

      dataWork.value = workData;
      dataWork.value['slug'] = route.params.slug;

      // Показ модального окна
      if (route.query.blog) {
        // когда приходим со страницы блога (видео)
        setTimeout(() => (open.value = true), 1000);
      } else {
        open.value = true;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// После закрытия модального окна
const closeWork = async (hashName: string) => {
  metadata.value.metaTitle = 'Наши работы';
  metadata.value.metaDescription = 'Наши работы';

  router.push({ path: '/portfolio' });

  if (hashName && hashName !== useActiveBtnCategoryPortfolio().value.parent) {
    changeFilter(hashName);

    setTimeout(() => {
      worksFilter.value?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 500);
  }

  //
  open.value = false;
};

// Получение названий разделов категорий (родительской и дочерней), когда кликаем по тегам карточки
const getNameParentChildrenCategory = (title: string) => {
  const res = {} as { idx: number; parent: string; child: string };

  articles.value?.categories.forEach((item, idx) => {
    for (const nameChild of item.children.nodes) {
      if (nameChild.name === title) {
        res['idx'] = idx;
        res['parent'] = item.name;
        res['child'] = nameChild.name;
        break;
      }
    }

    if (res.parent) {
      return;
    }
  });

  return res;
};

// Изменение фильтра
const changeFilter = (nameClassFilter: string) => {
  const cl = '.' + replaceSpace(nameClassFilter);

  filterInstance.value.filter(cl);

  //
  const names = getNameParentChildrenCategory(nameClassFilter);
  idxCategory.value = names.idx;
  useActiveBtnCategoryPortfolio().value.parent = names.parent;
  useActiveBtnCategoryPortfolio().value.child = names.child;

  //
  worksFilter.value?.scrollIntoView({
    behavior: 'smooth',
  });
};

// Сброс гет параметров в адресной строке при переключении кнопок фильтрации
const resetRouteQuery = () => {
  if (route.query.cat || route.query.catMenu) {
    router.push({ path: '/portfolio', query: {} });
  }
};

// Изменение значения переменной при клике на кнопки фильтрации родительской категории
const changeNameBtm = (name: string, idx?: number | null, isResetRouteQuery: boolean = true) => {
  idxCategory.value = idx ?? null;
  useActiveBtnCategoryPortfolio().value.parent = name;
  useActiveBtnCategoryPortfolio().value.child = 'Все';

  //
  if (isResetRouteQuery) {
    resetRouteQuery();
  }
};

// Изменение значения переменной при клике на кнопки фильтрации дочерних категорий (подкатегории)
const changeNameBtmSub = (name: string) => {
  if (cats.value?.includes(name)) {
    useActiveBtnCategoryPortfolio().value.child = 'Все';
  } else {
    useActiveBtnCategoryPortfolio().value.child = name;
  }

  filterInstance.value.filter(`.${replaceSpace(name)}`);
  resetRouteQuery();
};

//
onMounted(() => {
  // Фильтрация работ
  filterInstance.value = mixitup(filterJs.value);
});

//
onUnmounted(() => {
  filterInstance.value.destroy();

  useActiveBtnCategoryPortfolio().value.parent = 'all';
  useActiveBtnCategoryPortfolio().value.child = 'Все';
});

// Отслеживание параметра 'slug'
watchEffect(async () => {
  if ('slug' in route.params) {
    showWork();
  }

  // Изменение по тегам
  if (route.query.cat) {
    const f = decodeURI(route.query.cat as string);

    if (filterInstance.value) {
      changeFilter(f);
    }
  }

  // Изменение из всплывающего меню
  if (route.query.catMenu) {
    const f = decodeURI(route.query.catMenu as string);
    const idx = +decodeURI(route.query.idx as string);

    if (filterInstance.value) {
      changeFilter(f);
      changeNameBtm(f, idx, false);
    }
  }
});
</script>

<template>
  <div class="page_portfolio">
    <!-- Хлебные крошки -->
    <Breadcrumbs :breadcrumbs="[{ title: 'Портфолио' }]" />

    <!--  -->
    <div class="portfolio_particles"></div>

    <!--  -->
    <section class="works_filter" ref="worksFilter">
      <div class="container">
        <h2 class="title_52">Портфолио</h2>

        <!-- Кнопки -->
        <ButtonsTabPortfolio
          v-if="articles?.categories"
          :categories="articles.categories"
          :cats-parent="cats"
          :idx-category="idxCategory"
          @change-tag="changeNameBtm"
          @change-tag-sub="changeNameBtmSub"
        />
      </div>
    </section>

    <!-- Портфолио -->
    <section class="works_bx">
      <div v-if="viewSkeleton" class="works">
        <PagePortfolioSkeletonWork v-for="w in 15" :key="w" />
      </div>

      <div v-show="!viewSkeleton" class="works" ref="filterJs">
        <PagePortfolio
          v-for="article in articles?.portfolios"
          :key="article.databaseId"
          :cats
          :article
          @change-tag="changeFilter"
        />
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
  background-image: url(/img/portfolio/decor_portfolio_1.png);
  background-repeat: no-repeat;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
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

  @media (max-width: 768px) {
    font-size: 42px;
  }

  @media (max-width: 576px) {
    font-size: 32px;
    margin-bottom: 42px;
  }
}

/*  */
.works_filter {
  position: relative;
  z-index: 2;
  margin-bottom: 62px;

  /*  */
  @media (max-width: 576px) {
    margin-bottom: 52px;
  }
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
  font-family: var(--fontFamily-Unbounded);
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

/*  */

@media (max-width: 1250px) {
  .portfolio_particles {
    width: 552px;
    height: 508px;
    background-image: url(/img/portfolio/decor_portfolio_2.png);
  }
}

@media (max-width: 1199px) {
  .page_portfolio .works_bx::before {
    bottom: -170px;
  }
}

@media (max-width: 576px) {
  .portfolio_particles {
    width: 287px;
    height: 235px;
    background-image: url(/img/portfolio/decor_portfolio_3.png);
  }
}
</style>
