<script setup lang="ts">
import type { TypeOneScreen } from '~/types/razrabotka.types';

//
defineProps<{
  data: TypeOneScreen;
}>();
</script>

<template>
  <section class="first_section">
    <div class="container about_particles_container">
      <div class="about_particles">
        <picture class="first_section__img">
          <source srcset="/img/razrabotka/sphera_1300.svg" media="(max-width: 1300px)" />
          <img src="/img/razrabotka/sphera.svg" alt="" />
        </picture>
      </div>
    </div>

    <!--  -->
    <div class="container">
      <h1 class="service_item__h1 decisions__title" v-html="data.title"></h1>
      <p class="service_item__desc">{{ data.desc }}</p>

      <!--  -->
      <ul class="instruments">
        <li
          v-for="(img, idx) in data.instruments"
          :key="img.mediaItemUrl"
          :style="{ '--offset': idx }"
        >
          <img :src="img.mediaItemUrl" alt="" />
        </li>
      </ul>
    </div>

    <!--  -->
    <div class="first_section__line_text_wrap">
      <div class="first_section__line_text">
        <PageServicesRazrabotkaLineImg v-if="data.runImg" :img="data.runImg" />
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.first_section {
  position: relative;
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
  overflow: hidden;

  /*  */
  @media (max-width: 768px) {
    top: -50px;
    width: 436px;
  }

  @media (max-width: 576px) {
    top: -35px;
    width: 282px;
  }
}

/*  */
.first_section__img img {
  @media (max-width: 1300px) {
    transform: translate(200px, 0);
  }

  /*  */
  @media (max-width: 768px) {
    transform: translate(80px, 0);
  }
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
    font-size: 26px;
  }

  /*  */
  &::before {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: -55%;
    transform: translateY(-50%);
    width: 1151px;
    height: 1147px;
    background-image: url(/img/razrabotka/shadow.png);
    background-repeat: no-repeat;
    background-size: 100%;
    margin-top: -65px;

    /*  */
    @media (max-width: 768px) {
      width: 800px;
      height: 800px;
      margin-left: -50px;
    }

    @media (max-width: 576px) {
      width: 600px;
      height: 600px;
      margin-left: -120px;
    }
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

  /*  */
  @media (max-width: 768px) {
    font-size: 20px;
    margin: 28px 0 42px 0;
  }

  @media (max-width: 576px) {
    font-size: 14px;
    margin: 22px 0 32px 0;
  }
}

/*  */

.instruments {
  display: flex;

  /*  */
  li {
    transform: translateX(calc(var(--offset) * -24px));

    /*  */
    @media (max-width: 768px) {
      width: 62px;
    }

    @media (max-width: 576px) {
      width: 50px;
    }
  }
}

/*  */

.first_section__line_text_wrap {
  position: absolute;
  top: 0;
  left: 50%;
  width: 200%;
  transform: translateX(-50%) translateY(146px);
  pointer-events: none;
  /* outline: 1px solid red; */

  /*  */
  @media (max-width: 1920px) {
    width: 100%;
    height: 1530px;
    overflow: hidden;
  }

  @media (max-width: 740px) {
    display: none;
  }
}

.first_section__line_text {
  transform: translate(0%, 980%) rotate(-35deg);

  /*  */
  @media (max-width: 1920px) {
    width: 130%;
    transform: translate(-11%, 930%) rotate(-35deg);
  }

  @media (max-width: 1600px) {
    transform: translate(-11%, 1000%) rotate(-35deg);
  }

  @media (max-width: 1300px) {
    transform: translate(-11%, 1040%) rotate(-35deg);
  }

  @media (max-width: 992px) {
    width: 160%;
    transform: translate(-11%, 1000%) rotate(-35deg);
  }

  @media (max-width: 768px) {
    transform: translate(-12%, 1030%) rotate(-35deg);
  }
}
</style>
