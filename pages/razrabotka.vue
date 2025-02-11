<script setup lang="ts">
import type { TypeRazrabotka } from '~/types/razrabotka.types';

//
const { data } = await useFetch('/api/razrabotkaPage');
console.log(data.value);

//
useSeoMeta({
  title: data.value?.metaTags.metaTitle,
  description: data.value?.metaTags.metaDescription,
});
</script>

<template>
  <section class="service_item">
    <!-- Хлебные крошки -->
    <Breadcrumbs :breadcrumbs="[{ title: 'Услуги', link: '/services' }, { title: 'Разработка' }]" />

    <!--  -->
    <div class="container about_particles_container">
      <div class="about_particles">
        <img src="/img/razrabotka/sphera.svg" alt="" />
      </div>
    </div>

    <!--  -->
    <div class="container">
      <h1 class="service_item__h1 decisions__title">
        <span>Разрабатываем</span>, создаём, обслуживаем и улучшаем сайты
      </h1>

      <p class="service_item__desc">
        от проработки архитектурных концепций до плавных и систематических релизов. Специализируемся
        на воплощении идей в жизнь
      </p>
    </div>
  </section>
</template>

<style lang="css" scoped>
.service_item {
  padding-bottom: 180px;

  @media (max-width: 576px) {
    padding-bottom: 80px;
  }
}

/*  */
.about_particles_container {
  position: relative;
}

.about_particles {
  position: absolute;
  top: -238px;
  right: 0;
  width: 920px;
  z-index: -1;
}

/*  */
.service_item__h1 {
  position: relative;
  max-width: 970px;
  font-family: var(--fontFamily-Unbounded);
  font-size: 62px;
  line-height: 100%;
  letter-spacing: 0.02em;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 42px;
  }

  @media (max-width: 576px) {
    font-size: 32px;
  }

  /*  */
  &::before {
    content: '';
    position: absolute;
    top: -317%;
    left: -55%;
    width: 1151px;
    height: 1147px;
    background-image: url(/public/img/razrabotka/shadow.png);
    background-repeat: no-repeat;
  }
}

.service_item__desc {
  max-width: 600px;
  color: #fff;
  font-size: 22px;
  font-style: normal;
  font-weight: 300;
  line-height: 130%;
  opacity: 0.8;
  margin: 31px 0 62px 0;
}

.service_item__btn {
  width: 430px;
  height: 103px;
  margin-bottom: 20px;

  @media (max-width: 576px) {
    width: 100%;
    height: 80px;
  }
}
</style>
