<script setup lang="ts">
// import type { TypeRazrabotka } from '~/types/razrabotka.types';

//
const { data } = await useFetch('/api/pages/razrabotka');
// console.log(data.value);

//
useSeoMeta({
  title: data.value?.metaTags.metaTitle,
  description: data.value?.metaTags.metaDescription,
});
</script>

<template>
  <main class="service_item">
    <!-- Хлебные крошки -->
    <Breadcrumbs :breadcrumbs="[{ title: 'Услуги', link: '/services' }, { title: 'Разработка' }]" />

    <!--  -->
    <PageServicesRazrabotkaFirstScreen v-if="data?.oneScreen" :data="data.oneScreen" />

    <!--  -->
    <PageServicesRazrabotkaVariantsDevelopments
      v-if="data?.razrabotkaVarianty"
      :variants-dev="data.razrabotkaVarianty"
    />

    <!--  -->
    <PageServicesRazrabotkaHowDoWeWork
      v-if="data?.kakMyRabotaemVarianty.variants.length"
      :works="data.kakMyRabotaemVarianty"
    />

    <!--  -->
  </main>
</template>

<style lang="css" scoped>
.service_item {
  padding-bottom: 180px;

  @media (max-width: 576px) {
    padding-bottom: 80px;
  }
}
</style>
