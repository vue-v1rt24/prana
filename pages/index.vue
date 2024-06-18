<script setup lang="ts">
import { type TypeHome } from '@/types/home-page/homepage.types';
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
    // console.log(d);

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

// console.log(data.value);

//
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
