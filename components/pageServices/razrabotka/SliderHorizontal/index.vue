<script setup lang="ts">
import Swiper from 'swiper';
import 'swiper/css';

import type { TypeKakMyRabotaemVariantyItem } from '~/types/razrabotka.types';

//
const props = defineProps<{
  howWorkCards: TypeKakMyRabotaemVariantyItem[];
}>();

// console.log(props.howWorkCards);

// Количество карточек
const countCard = computed(() => props.howWorkCards.length);

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

<template>
  <div class="swiper swiper_how_work" ref="swiperHowWork">
    <div class="swiper-wrapper">
      <div
        v-for="(card, idx) in howWorkCards"
        :key="card.kakMyRabotaemVariantyZagolovok"
        class="swiper-slide"
      >
        <PageServicesRazrabotkaSliderHorizontalCard
          :idx="idx + 1"
          :cart-all="countCard"
          :title="card.kakMyRabotaemVariantyZagolovok"
          :desc="card.kakMyRabotaemVariantyOpisanie"
          :img-folder="card.kakMyRabotaemVariantyIzobrazhenie.node.mediaItemUrl"
        />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.swiper_how_work {
  padding: 0 30px;
  margin: 0 -30px;
}

/*  */
.swiper-slide {
  width: 510px;

  /*  */
  @media (max-width: 576px) {
    width: 320px;
  }
}
</style>
