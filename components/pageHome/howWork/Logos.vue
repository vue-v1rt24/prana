<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Swiper from 'swiper';
import { Grid, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

//
defineProps<{
  logos: {
    howWorkCardProcentRepeatLogos: {
      node: {
        mediaItemUrl: string;
      };
    };
  }[];
}>();

//
gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();

//
const logosSwiper = ref<Swiper | null>(null);
const swiperLogos = ref<HTMLDivElement | null>(null);

//
onMounted(() => {
  // Блок с логотипами компаний
  gsap.set('.how_work_clients__logos_item', { clearProps: 'all' });

  gsap.to('.how_work_clients__logos_item', {
    x: 0,
    opacity: 1,
    stagger: 0.1,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: '.how_work_clients',
      start: 'top top+=200',
      // markers: true,
    },
  });

  //
  if (swiperLogos.value) {
    logosSwiper.value = new Swiper(swiperLogos.value, {
      init: false,
      modules: [Grid, Pagination],
      slidesPerView: 2,
      spaceBetween: 0,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
      grid: {
        rows: 3,
        fill: 'row',
      },
    });

    mm.add('(max-width: 576px', () => {
      logosSwiper.value?.init();

      return () => {};
    });
  }
});

//
onUnmounted(() => {
  mm.add('(max-width: 576px', () => {
    if (logosSwiper.value?.destroy) {
      logosSwiper.value.destroy();
    }
  });

  mm.kill(true);
});
</script>

<template>
  <div class="swiper" ref="swiperLogos">
    <div class="swiper-wrapper how_work_clients__logos">
      <div v-for="(logo, idx) in logos" :key="idx" class="swiper-slide">
        <div class="how_work_clients__logos_item">
          <NuxtImg
            :src="logo.howWorkCardProcentRepeatLogos.node.mediaItemUrl"
            densities="x1"
            loading="lazy"
            format="webp"
            alt=""
          />
        </div>
      </div>
    </div>

    <!--  -->
    <div class="swiper-pagination swiper_pagination_custom"></div>
  </div>
</template>

<style lang="css" scoped>
.swiper {
  @media (max-width: 576px) {
    padding-bottom: 50px;
  }
}

/*  */
.how_work_clients__logos {
  max-width: 1280px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin: 0 auto;

  /*  */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  @media (max-width: 576px) {
    max-width: none;
    display: flex;
    gap: 0;
    margin: auto;
  }
}

.how_work_clients__logos_item {
  filter: brightness(0.5);
  opacity: 0;
  transform: translateX(-50px);
}
</style>

<style>
.swiper_pagination_custom {
  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
  }

  .swiper-pagination-bullet-active {
    background: var(--accentColor) !important;
  }
}
</style>
