<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Swiper from 'swiper';
import { Scrollbar, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'assets/css/swiper-global.css';

import { type TypeService, type TypeServiceCategories } from '@/types/home-page/services.types';

//
gsap.registerPlugin(ScrollTrigger);

//
let mm = gsap.matchMedia();

//
const props = defineProps<{
  serviceCategories: TypeServiceCategories[];
  services: TypeService[];
}>();

//
const razrabotka: TypeService[] = [];
const branding: TypeService[] = [];
const fv: TypeService[] = [];
const prodvizhenie: TypeService[] = [];

for (const service of props.services) {
  switch (service.serviceCategories.nodes[0].databaseId) {
    case 9:
      razrabotka.push(service);
      break;
    case 10:
      branding.push(service);
      break;
    case 13:
      prodvizhenie.push(service);
      break;
    case 11:
      fv.push(service);
      break;
  }
}

//
const servicesBx = ref<HTMLDivElement | null>(null);

//
onMounted(() => {
  if (matchMedia('(min-width: 769px)').matches) {
    if (servicesBx.value) {
      const tlServices = gsap.timeline({
        scrollTrigger: {
          trigger: '.services_bx',
          start: 'top bottom',
          end: 'center-=163 center',
          scrub: 1,
        },
        defaults: {
          duration: 3,
        },
      });

      tlServices.to(['.service__item_1', '.service__item_4'], {
        y: 0,
        opacity: 1,
      });

      tlServices.to(
        '.service__item_2',
        {
          y: 0,
          opacity: 1,
        },
        '-=3',
      );

      /* tlServices.to(
        '.service__item_3',
        {
          y: 0,
          opacity: 1,
        },
        '-=3',
      ); */

      tlServices.to(
        ['.title_h4_animate', '.description_animate', '.services__cards__vars_animate'],
        {
          opacity: 1,
        },
        '-=3',
      );

      tlServices.to(
        '.services__h2',
        {
          opacity: 1,
        },
        '-=1',
      );

      //
      mm.add('(min-width: 768px) and (max-width: 1918px)', () => {
        tlServices.to(
          '.services__cards',
          {
            y: 0,
          },
          '<',
        );

        return () => {};
      });
    }
  }

  // ================= Слайдер услуг на главной
  const swiperServicesBx = document.querySelector<HTMLDivElement>('.swiper_services')!;

  if (swiperServicesBx) {
    const swiperServices = new Swiper(swiperServicesBx, {
      init: false,
      slidesPerView: 'auto',
      freeMode: true,
      modules: [Scrollbar, FreeMode],
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
        hide: false,
      },
      breakpoints: {
        320: {
          spaceBetween: 10,
        },
        577: {
          spaceBetween: 20,
        },
        769: {
          spaceBetween: 20,
        },
      },
    });

    mm.add({ is1918: '(max-width: 1918px)' }, (context) => {
      const { is1918 } = context.conditions as any;

      if (is1918) {
        swiperServices.init();
        swiperServicesBx.classList.add('scrollbar');
      }

      return () => {};
    });
  }
});
</script>

<template>
  <section class="services_bx" ref="servicesBx">
    <div class="container">
      <h2 class="title_h2 services__h2">Услуги</h2>

      <div class="services__cards">
        <div class="swiper swiper_services">
          <div class="swiper-wrapper">
            <PageHomeServicesItem
              item-class="service__item_1"
              img="Code.svg"
              :title="serviceCategories[2].name"
              :service="razrabotka"
            />

            <PageHomeServicesItem
              item-class="service__item_2"
              img="BoundingBox.svg"
              :title="serviceCategories[0].name"
              :service="branding"
            />

            <!-- <PageHomeServicesItem
              item-class="service__item_3"
              img="prodvizhenie.svg"
              :title="serviceCategories[1].name"
              :service="prodvizhenie"
            /> -->

            <PageHomeServicesItem
              item-class="service__item_4"
              img="Video.svg"
              :title="serviceCategories[3].name"
              :service="fv"
            />
          </div>

          <div class="swiper-scrollbar"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.services_bx {
  padding-bottom: 160px;
}

/*  */
.services__h2 {
  opacity: 0;
  margin-bottom: -43px;
}

/*  */
.swiper.swiper_services {
  overflow: visible;
}

.swiper_services .swiper-wrapper {
  justify-content: center;
  column-gap: 20px;

  /*  */
  @media (max-width: 1400px) {
    justify-content: flex-start;
  }
}

/* ==================== Медиа запросы */
@media (max-width: 1918px) {
  .services__cards {
    transform: translateY(-100px);
  }

  .swiper.swiper_services {
    overflow: hidden;
  }

  .swiper_services .swiper-wrapper {
    column-gap: 0;
  }

  /*  */
  .service__item_1,
  .service__item_2,
  .service__item_3 {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 1199px) {
  .services__h2 {
    margin-bottom: 70px;
  }
}

@media (max-width: 576px) {
  .services_bx {
    padding-bottom: 30px;
  }

  .services__h2 {
    display: none;
  }
}
</style>
