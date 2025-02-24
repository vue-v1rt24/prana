<script setup lang="ts">
const { data } = await useFetch('/api/pages/services');
// console.log(data.value);

//
useSeoMeta({
  title: data.value?.metaTags.metaTitle,
  description: data.value?.metaTags.metaDescription,
});
</script>

<template>
  <section class="service">
    <!-- Хлебные крошки -->
    <Breadcrumbs :breadcrumbs="[{ title: 'Услуги' }]" dark />

    <!--  -->
    <div class="container">
      <h1 class="service__h1">Услуги</h1>

      <!--  -->
      <div class="service__content">
        <div class="service__left">
          <NuxtImg
            :src="data?.pageServices.pageServicesIzobrazhenie.node.mediaItemUrl"
            :alt="data?.pageServices.pageServicesIzobrazhenie.node.altText"
          />
        </div>

        <ul class="service__right">
          <PageServicesServiceItem
            v-for="service in data?.pageServices.pageServicesRepeatUslugi"
            :img="service.izobrazhenie.node.mediaItemUrl"
            :alt="service.izobrazhenie.node.altText"
            :title="service.zagolovok"
            :desc="service.opisanie"
            :link="service.pageServicesRepeatUslugiSsylkaNaStraniczu"
          />
        </ul>
      </div>

      <!-- Виджет Яндекса -->
      <div
        class="service_reviews"
        v-html="data?.pageServices.pageServicesVidzhetRejtingaYandeksa"
      ></div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.service {
  background-color: white;
  padding-bottom: 160px;

  /*  */
  @media (max-width: 768px) {
    padding-bottom: 120px;
  }

  @media (max-width: 576px) {
    padding-bottom: 80px;
  }
}

/*  */
.service__h1 {
  font-family: var(--fontFamily-Unbounded);
  font-size: 62px;
  line-height: 100%;
  letter-spacing: 0.02em;
  color: var(--colorDark3);
  margin-bottom: 62px;

  @media (max-width: 768px) {
    font-size: 42px;
  }

  @media (max-width: 576px) {
    font-size: 26px;
    margin-bottom: 42px;
  }
}

/*  */

.service__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 632px;
  column-gap: 20px;

  /*  */
  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
}

/*  */

.service__left {
  border-radius: 42px;
  overflow: hidden;

  /*  */
  @media (max-width: 1300px) {
    order: 1;
    margin-top: 40px;
  }

  @media (max-width: 576px) {
    aspect-ratio: 1;
    height: auto;
    border-radius: 24px;
    margin-top: 32px;
  }

  /*  */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

/*  */

.service__right {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

/*  */

.service_reviews {
  margin-top: 100px;

  /*  */
  @media (max-width: 768px) {
    margin-top: 80px;
  }

  @media (max-width: 576px) {
    display: none;
  }
}
</style>
