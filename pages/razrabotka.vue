<script setup lang="ts">
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
    <WidgetWorks name-page="razrabotka" />
  </main>
</template>

<style lang="css" scoped></style>
