<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { type TypeHowWork } from '~/types/home-page/howWork.types';

//
const props = defineProps<{
  howWorks: TypeHowWork;
}>();

// console.log(props.howWorks);

//
gsap.registerPlugin(ScrollTrigger);

//
const viewport = useViewport();

// Для счётчика
const clientsPercent = reactive({ count: 0 });

//
onMounted(() => {
  // Для блока со счётчиком
  const tlPercent = gsap.timeline({
    scrollTrigger: {
      trigger: '.how_work_clients__percent',
      start: 'center center+=300',
      // markers: true,
    },
  });

  tlPercent.to(clientsPercent, {
    duration: 1,
    count: props.howWorks.howWorkProcent,
  });

  // Заголовок
  gsap.to('.how_work_clients__title span', {
    y: 0,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: '.how_work_clients',
      start: 'top top+=200',
      // markers: true,
    },
  });
});
</script>

<template>
  <section class="how_work_section">
    <div class="how_work_bx">
      <div class="container">
        <h2 class="title_52">Как мы работаем?</h2>
      </div>

      <!--  -->
      <template v-if="howWorks.howWorkCards">
        <PageHomeHowWorkSliderDuga
          v-if="viewport.isGreaterThan('screen1200')"
          :how-work-cards="howWorks.howWorkCards"
        />

        <!--  -->
        <PageHomeHowWorkSliderHorizontal v-else :how-work-cards="howWorks.howWorkCards" />
      </template>
    </div>

    <!--  -->
    <div class="how_work_clients">
      <div class="container">
        <div class="how_work_clients__percent">{{ Math.floor(clientsPercent.count) }}%</div>
        <div class="how_work_clients__title">
          <span>{{ howWorks.howWorkProcentTitle }}</span>
        </div>

        <!--  -->
        <PageHomeHowWorkLogos v-if="howWorks.howWorkLogos" :logos="howWorks.howWorkLogos" />
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.how_work_section {
  background-color: var(--colorDark4);
  border-radius: 72px 72px 0px 0px;
  overflow: hidden;

  /*  */
  @media (max-width: 576px) {
    border-radius: 32px 32px 0 0;
  }
}

/*  */
.how_work_bx {
  position: relative;
  height: 100vh;
  padding-top: 60px;

  /*  */
  @media (max-width: 1200px) {
    height: auto;
    padding: 160px 0;
  }

  @media (max-width: 800px) {
    padding: 120px 0;
  }

  @media (max-width: 576px) {
    padding: 80px 0;
  }

  /*  */
  .title_52 {
    text-align: center;

    /*  */
    @media (max-width: 1200px) {
      margin-bottom: 80px;
    }

    @media (max-width: 800px) {
      font-size: 42px;
    }

    @media (max-width: 576px) {
      font-size: 26px;
      margin-bottom: 42px;
    }
  }
}

/*  */

.how_work_clients {
  background-color: white;
  border-radius: 72px 72px 0 0;
  padding: 160px 0;
  margin-top: 160px;

  /*  */
  @media (max-width: 1200px) {
    margin-top: 0;
  }

  @media (max-width: 1024px) {
    padding: 140px 0;
  }

  @media (max-width: 576px) {
    border-radius: 32px 32px 0 0;
    padding: 80px 0;
  }
}

/*  */
.how_work_clients__percent {
  position: relative;
  z-index: 1;
  width: fit-content;
  font-family: var(--fontFamily-Unbounded);
  font-weight: 700;
  font-size: 100px;
  line-height: 100%;
  letter-spacing: 0.02em;
  text-align: center;
  color: #40b6b7;
  border: 2px solid #40b6b7;
  border-radius: 42px;
  padding: 15px 25px;
  margin: 0 auto;

  /*  */
  @media (max-width: 1024px) {
    font-size: 80px;
  }

  @media (max-width: 576px) {
    font-size: 54px;
    border-radius: 24px;
  }
}

/*  */
.how_work_clients__title {
  max-width: 1088px;
  height: 113px;
  font-weight: 700;
  font-size: 52px;
  line-height: 100%;
  letter-spacing: 0.02em;
  text-align: center;
  color: var(--colorDark3);
  margin: 42px auto 62px auto;
  overflow: hidden;

  /*  */
  @media (max-width: 1024px) {
    height: 90px;
    font-size: 42px;
    margin-top: 32px;
  }

  @media (max-width: 576px) {
    height: 82px;
    font-size: 26px;
    margin: 24px 0 42px 0;
  }

  /*  */
  span {
    display: block;
    transform: translateY(100%);
  }
}
</style>
