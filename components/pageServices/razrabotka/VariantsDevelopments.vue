<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { TypeRazrabotkaVarianty } from '~/types/razrabotka.types';

//
gsap.registerPlugin(ScrollTrigger);

//
const props = defineProps<{
  variantsDev: TypeRazrabotkaVarianty;
}>();

// console.log(props.variantsDev);

//
const mm = gsap.matchMedia();

//
onMounted(() => {
  mm.add('(min-width: 993px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.variants_dev_sec',
        start: 'top center-=200',
        end: 'center center-=150',
        scrub: 1,
        // markers: true,
      },
    });

    tl.to('.variants_dev__item:first-child', {
      y: 0,
    });

    tl.to(
      '.variants_dev__item:nth-child(2)',
      {
        y: 0,
      },
      '<',
    );

    tl.to(
      '.first_section__line_text_wrap',
      {
        y: 536,
      },
      '<',
    );

    tl.to(
      '.variants_dev__shadow',
      {
        opacity: 1,
      },
      '<',
    );

    return () => {};
  });
});
</script>

<template>
  <section class="variants_dev_sec">
    <div class="container">
      <div class="variants_dev__shadow"></div>

      <!--  -->
      <div class="variants_dev_wrap">
        <PageServicesRazrabotkaVariantsDevelopmentsItem
          v-for="variant in variantsDev.variants"
          :key="variant.razrabotkaVariantyZagolovok"
          :variant
        />
      </div>
    </div>

    <!--  -->
    <div class="variants_dev__line_text">
      <PageServicesRazrabotkaLineText v-if="variantsDev.runText" :text="variantsDev.runText" />
    </div>
  </section>
</template>

<style lang="css" scoped>
.variants_dev_sec {
  position: relative;
  padding-top: 710px;
  overflow: hidden;

  /*  */
  @media (max-width: 992px) {
    padding-top: 120px;
  }

  @media (max-width: 576px) {
    padding-top: 80px;
  }
}

/*  */
.variants_dev_wrap {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;

  /*  */
  @media (max-width: 992px) {
    display: flex;
    flex-wrap: wrap;
    row-gap: 30px;
  }

  @media (max-width: 576px) {
    row-gap: 20px;
  }
}

/*  */
.variants_dev__shadow {
  content: '';
  opacity: 0;
  position: absolute;
  bottom: 23%;
  left: 50%;
  transform: translateX(-50%);
  width: 1151px;
  height: 1147px;
  background-image: url(/img/razrabotka/shadow2.svg);
  background-repeat: no-repeat;
  z-index: -1;

  /*  */
  @media (max-width: 992px) {
    display: none;
  }
}

/*  */

.variants_dev__line_text {
  margin-top: 160px;

  /*  */
  @media (max-width: 768px) {
    margin-top: 120px;
  }

  @media (max-width: 576px) {
    margin-top: 80px;
  }
}
</style>
