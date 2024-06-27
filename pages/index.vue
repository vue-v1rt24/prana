<script setup lang="ts">
import { type TypeHome } from '@/types/home-page/homepage.types';
import Item from '~/components/pageHome/costProject/Item.vue';
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
          nextProjectCostOpisanie
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
        }
      }
      services {
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

      nextProjectCostZagolovok: d.data.pageBy.contentHomePage.nextProjectCostZagolovok,
      nextProjectCostOpisanie: d.data.pageBy.contentHomePage.nextProjectCostOpisanie,
      nextProjectCostVarianty: d.data.pageBy.contentHomePage.nextProjectCostVarianty,
    };
  },
});

//
useHead({
  link: [{ rel: 'stylesheet', href: '/css/works.css' }],
});

useSeoMeta({
  title: () => data.value!.metaTitle,
  description: () => data.value!.metaDescription,
});
</script>

<template>
  <div>
    <PageHomeParticle :title="data!.title" :desc="data!.podzagolook" />
    <PageHomeServices :service-categories="data!.serviceCategories" :services="data!.services" />
    <PageHomeWorks />
    <PageHomeSphere v-if="data?.sphere" :sphere="data.sphere" />

    <PageHomeCostProject
      v-if="data?.nextProjectCostVarianty"
      :title="data.nextProjectCostZagolovok"
      :desc="data.nextProjectCostOpisanie"
      :next-project-vars="data.nextProjectCostVarianty"
    />
  </div>
</template>

<style lang="css" scoped></style>
