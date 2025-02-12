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
        <img src="/img/razrabotka/sphera.svg" alt="" />
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
      <PageServicesLineText
        v-if="data.runText"
        :text="data.runText"
        width="2500px"
        class="first_section__line_text"
      />
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
    background-image: url(/img/razrabotka/shadow.png);
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

/*  */

.instruments {
  display: flex;

  /*  */
  li {
    transform: translateX(calc(var(--offset) * -24px));
  }
}

/*  */

.first_section__line_text_wrap {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(146px);
  width: 1920px;
  height: 1530px;
  pointer-events: none;
  overflow: hidden;
  /* outline: 1px solid red; */
}

.first_section__line_text {
  transform: translate(-12%, 808%) rotate(-35deg);
}
</style>
