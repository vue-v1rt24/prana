<script setup lang="ts">
import { type TypeHome } from '@/types/home-page/homepage.types';
import '@/assets/css/works.css';

//
const { graphqlUrl } = useRuntimeConfig().public;

// Получение данных
const { data } = await useFetch(graphqlUrl, {
  query: {
    query: `
    {
      pageBy(pageId: 2) {
        metaTags {
          metaTitle
          metaDescription
        }
        contentHomePage {
          zagoovok
          podzagolook
          nextProjectCostZagolovok
          sphereVarianty {
            nazvanie
          }
          nextProjectCostVarianty {
            nextProjectCostUslugiRepeatIzbrazhenie {
              node {
                mediaItemUrl
              }
            }
            nextProjectCostUslugiRepeatNazvanie
            nextProjectCostVariantyRepeatOpisanie
            uslugi {
              nextProjectCostUslugaRepeatNazvanie
              nextProjectCostUslugaRepeatOpisanie
            }
          }
          howWorkCardProcent
          howWorkCardProcentTitle
          howWorkCardProcentRepeat {
            howWorkCardProcentRepeatLogos {
              node {
                mediaItemUrl
              }
            }
          }
          howWorkCardRepeat {
            howWorkCardRepeatTitle
            howWorkCardRepeatDesc
            howworkcardrepeatimg {
              node {
                mediaItemUrl
              }
            }
          }
          nextProjectCostOpisanie
        }
      }
      services(first: 100) {
        nodes {
          title
          slug
          servicesContent {
            kratkoeOpisanieNaGlavnoj
          }
          serviceCategories {
            nodes {
              databaseId
            }
          }
        }
      }
      serviceCategories {
        nodes {
          name
        }
      }
    }
    `,
  },
  transform(data) {
    const d = data as TypeHome;

    // Добавление в объект 'uslugi' свойство 'selected'
    for (const item of d.data.pageBy.contentHomePage.nextProjectCostVarianty) {
      for (const service of item.uslugi) {
        service['selected'] = false;
      }
    }

    //
    return {
      metaTitle: d.data.pageBy.metaTags.metaTitle,
      metaDescription: d.data.pageBy.metaTags.metaDescription,
      title: d.data.pageBy.contentHomePage.zagoovok,
      podzagolook: d.data.pageBy.contentHomePage.podzagolook,
      services: d.data.services.nodes,
      serviceCategories: d.data.serviceCategories.nodes,
      sphere: d.data.pageBy.contentHomePage.sphereVarianty,

      howWork: {
        howWorkCards: d.data.pageBy.contentHomePage.howWorkCardRepeat,
        howWorkProcent: d.data.pageBy.contentHomePage.howWorkCardProcent,
        howWorkProcentTitle: d.data.pageBy.contentHomePage.howWorkCardProcentTitle,
        howWorkLogos: d.data.pageBy.contentHomePage.howWorkCardProcentRepeat,
      },

      nextProjectCostZagolovok: d.data.pageBy.contentHomePage.nextProjectCostZagolovok,
      nextProjectCostOpisanie: d.data.pageBy.contentHomePage.nextProjectCostOpisanie,
      nextProjectCostVarianty: d.data.pageBy.contentHomePage.nextProjectCostVarianty,
    };
  },
});

// console.log(data.value);

//
useSeoMeta({
  title: () => data.value!.metaTitle,
  description: () => data.value!.metaDescription,
});
</script>

<template>
  <div>
    <PageHomeParticle :title="data?.title" :desc="data?.podzagolook" />
    <PageHomeServices :service-categories="data!.serviceCategories" :services="data!.services" />
    <PageHomeWorks />
    <PageHomeSphere v-if="data?.sphere" :sphere="data.sphere" />

    <!-- Раздел: Рассчитаем стоимость вашего будущего проекта -->
    <!-- <PageHomeCostProject
      v-if="data?.nextProjectCostVarianty"
      :title="data.nextProjectCostZagolovok"
      :desc="data.nextProjectCostOpisanie"
      :next-project-vars="data.nextProjectCostVarianty"
    /> -->

    <!-- Раздел: Как мы работаем? -->
    <PageHomeHowWork v-if="data?.howWork" :how-works="data.howWork" />
  </div>
</template>

<style lang="css" scoped></style>
