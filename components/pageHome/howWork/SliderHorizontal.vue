<script setup lang="ts">
import Swiper from 'swiper';
import 'swiper/css';

//
const howWorkSwiper = ref<Swiper | null>(null);
const swiperHowWork = ref<HTMLDivElement | null>(null);

//
onMounted(() => {
  if (swiperHowWork.value) {
    howWorkSwiper.value = new Swiper(swiperHowWork.value, {
      slidesPerView: 'auto',
      spaceBetween: 20,
      breakpoints: {
        320: {
          spaceBetween: 14,
        },
        577: {
          spaceBetween: 20,
        },
      },
    });
  }
});

//
onUnmounted(() => {
  if (howWorkSwiper.value?.destroy) {
    howWorkSwiper.value.destroy();
  }
});
</script>

<!-- 
<NuxtImg
  :src="item.fotoPoNavedeniyuCompanyKomanda?.node.mediaItemUrl"
  class="people_item__img_face_hover"
  loading="lazy"
  format="webp"
/>
-->

<template>
  <div class="swiper swiper_how_work" ref="swiperHowWork">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <PageHomeHowWorkCard
          :idx="1"
          :cart-all="5"
          title="Брифинг"
          desc="Собираем информацию и определяем цель проекта"
        />
      </div>

      <div class="swiper-slide">
        <PageHomeHowWorkCard
          :idx="2"
          :cart-all="5"
          title="Коммерческое предложение"
          desc="На основе брифа обозначаем основные этапы, определяем сроки и производим расчет стоимости проекта"
        />
      </div>

      <div class="swiper-slide">
        <PageHomeHowWorkCard
          :idx="3"
          :cart-all="5"
          title="Договор и ТЗ"
          desc="Заключаем договор, составляем техническое задание"
        />
      </div>

      <div class="swiper-slide">
        <PageHomeHowWorkCard
          :idx="4"
          :cart-all="5"
          title="Разработка проекта"
          desc="Создаем продукт, согласовывая ключевые этапы и решения"
        />
      </div>

      <div class="swiper-slide">
        <PageHomeHowWorkCard
          :idx="5"
          :cart-all="5"
          title="Сдача проекта"
          desc="Формируем и передаем все разработанные материалы"
          class="card_last"
        />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.swiper_how_work {
  padding: 0 20px;
}

/*  */
.swiper-slide {
  width: 510px;

  /*  */
  @media (max-width: 1024px) {
    width: 410px;
  }

  @media (max-width: 800px) {
    width: 320px;
  }
}
</style>
