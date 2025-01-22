<script setup lang="ts">
import Swiper from 'swiper';
import 'swiper/css';

//
const props = defineProps<{
  howWorkCards: {
    howWorkCardRepeatTitle: string;
    howWorkCardRepeatDesc: string;
    howworkcardrepeatimg: {
      node: {
        mediaItemUrl: string;
      };
    };
  }[];
}>();

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
        :key="card.howWorkCardRepeatTitle"
        class="swiper-slide"
      >
        <PageHomeHowWorkCard
          :idx="idx + 1"
          :cart-all="countCard"
          :title="card.howWorkCardRepeatTitle"
          :desc="card.howWorkCardRepeatDesc"
          :img-folder="card.howworkcardrepeatimg.node.mediaItemUrl"
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
