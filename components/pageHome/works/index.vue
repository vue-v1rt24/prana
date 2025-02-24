<script setup lang="ts">
import {
  type TypeBlogWork,
  type TypeBlogWorkTransform,
  type TypeWorkId,
  type TypeWork,
} from '@/types/home-page/works.types';

// Получение ссылки на API
const { graphqlUrl } = useRuntimeConfig().public;

//
const route = useRoute();
const router = useRouter();

//
const open = ref(false);
const dataWork = useState<TypeWork>('work');

// Запрос на получение данных
const blogsPortfolios = {
  query: `
  {
    blogs(first: 100)  {
      nodes {
        databaseId
        slug
        date
        homePreview {
          vyvoditNaGlavnojStraniczy
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
        blogCategories {
          nodes {
            name
            taxonomyName
          }
        }
      }
    }
    portfolios(first: 100) {
      nodes {
        databaseId
        slug
        date
        homePreview {
          vyvoditNaGlavnojStraniczy
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
        portfolioCategories(where: {childless: true}) {
          nodes {
            name
            taxonomyName
          }
        }
      }
    }
  }
  `,
};

const { data: articles } = await useFetch(graphqlUrl, {
  query: blogsPortfolios,

  transform(data) {
    const typeData = data as TypeBlogWork;
    const all = [...typeData.data.blogs.nodes, ...typeData.data.portfolios.nodes];
    const articles: TypeBlogWorkTransform[] = [];

    for (const [key, item] of Object.entries(all)) {
      articles.push({
        id: key,
        databaseId: item.databaseId,
        date: item.date,
        slug: item.slug,
        homePreview: item.homePreview,
        categories: (item as any).blogCategories ?? (item as any).portfolioCategories,
        fullOutputOfTheWork: (item as any).fullOutputOfTheWork?.zagolovok
          ? (item as any).fullOutputOfTheWork
          : null,
      });
    }

    //@ts-ignore
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    return articles;
  },
});

// Запрос на получение одной записи работы
const getWork = async (id: number) => {
  const workQuery = {
    query: `
      {
        portfolioBy(portfolioId: ${id}) {
          databaseId
          slug
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
          portfolioCategories(where: {childless: true}) {
            nodes {
              name
            }
          }
          reviewClient {
            reviewZagruziteFajl {
              node {
                mediaItemUrl
              }
            }
            reviewNazvanieKompanii
            reviewSsylkaNaVideo
          }
        }
      }
  `,
  };

  if (import.meta.server) {
    // Получение данных если есть параметр в адресной строке
    const { data } = await useFetch(graphqlUrl, {
      query: workQuery,

      transform(data) {
        const work = data as TypeWorkId;

        return {
          ...work.data.portfolioBy.fullOutputOfTheWork,
          id: work.data.portfolioBy.databaseId,
          categories: work.data.portfolioBy.portfolioCategories.nodes,
          review: work.data.portfolioBy.reviewClient,
        };
      },
    });

    return data.value;
  } else {
    // Получение данных по клику
    const data = await $fetch<TypeWorkId>(graphqlUrl, {
      query: workQuery,
    });

    const work = {
      ...data.data.portfolioBy.fullOutputOfTheWork,
      id: data.data.portfolioBy.databaseId,
      categories: data.data.portfolioBy.portfolioCategories.nodes,
      review: data.data.portfolioBy.reviewClient,
    };

    return work;
  }
};

// Изменение URL
const changeRoutePath = (link: string) => {
  router.push(link);
};

// Вывод работы в модальном окне
const showWork = async () => {
  try {
    const work = articles.value?.find((work) => work.slug === route.params.slug);

    if (!work) {
      showError('');
    }

    if (work?.databaseId) {
      const workData = await getWork(work.databaseId);

      if (!workData?.zagolovok) throw new Error('Данные не получены');

      dataWork.value = workData;
      dataWork.value['slug'] = route.params.slug;
      open.value = true;
    }
  } catch (error) {
    console.log(error);
  }
};

// После закрытия модального окна
const closeWork = () => {
  router.push('/');
  open.value = false;
};

// Отслеживание параметра в адресной строке
watchEffect(async () => {
  if ('slug' in route.params) {
    await showWork();
  }
});
</script>

<template>
  <section class="works_bx">
    <h2 class="title_52">МЫ - это всё</h2>
    <p class="description">Наши проекты, статьи, а так же жизнь компании</p>

    <div class="works">
      <template v-for="item in articles" :key="item.id">
        <PageHomeWorksItem
          v-if="item.homePreview.vyvoditNaGlavnojStraniczy"
          :item="item"
          @route-path="changeRoutePath"
        />
      </template>
    </div>

    <!--  -->
    <div class="container">
      <UiButton
        class="works_portfolios_link"
        title="Перейти в портфолио"
        @click-btn="router.push('/portfolio')"
      />
    </div>

    <!--  -->
    <PageHomeWorksModalWork
      v-if="dataWork"
      :open="open"
      @close-work="closeWork"
      @close-modal="open = false"
      :data-work="dataWork"
    />
  </section>
</template>

<style lang="css" scoped>
.description {
  @media (max-width: 576px) {
    padding: 0 50px;
  }
}

/*  */
.works_portfolios_link {
  position: relative;
  z-index: 1;
  width: 438px;
  height: 103px;
  margin: 60px auto 0 auto;

  /*  */
  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 576px) {
    height: 80px;
  }
}
</style>
