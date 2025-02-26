<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import type { TypeKakMyRabotaemVarianty } from '~/types/razrabotka.types';

//
const props = defineProps<{
  works: TypeKakMyRabotaemVarianty;
}>();

// console.log(props.works);

//
const viewport = useViewport();

//
let mm = gsap.matchMedia();

//
const countCart = computed(() => props.works.variants.length);

// Управление модальным окно формы
const { isOpenModal } = useOutsideModal();

//
onMounted(() => {
  mm.add('(min-width: 1300px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.how_do_we_work_sec',
        scrub: 0.5,
        pin: true,
        // markers: true,
      },
    });

    //
    let countCart = 0;

    const renderCartAnimation = () => {
      let c = 0;

      for (let index = 0; index < 6; index++) {
        tl.to(`.cart_hdw:nth-child(${index + 1})`, {
          x: c,
        });

        c += countCart;
      }
    };

    mm.add(
      {
        isDesktop: '(min-width: 1601px)',
        is1600: '(max-width: 1600px)',
        is1480: '(max-width: 1480px)',
        is1360: '(max-width: 1360px)',
      },
      (context) => {
        const { isDesktop, is1600, is1480, is1360 } = context.conditions as {
          isDesktop: boolean;
          is1600: boolean;
          is1480: boolean;
          is1360: boolean;
        };

        countCart = isDesktop ? 188 : is1360 ? 125 : is1480 ? 140 : is1600 ? 160 : 0;
        renderCartAnimation();

        return () => {};
      },
    );

    return () => {};
  });
});
</script>

<template>
  <section class="how_do_we_work_sec">
    <div class="container">
      <h2 class="title_52">Как мы работаем?</h2>

      <!--  -->
      <ul v-if="viewport.isGreaterOrEquals('screen1300')" class="how_do_we_work__list">
        <PageServicesRazrabotkaHowDoWeWorkItem
          v-for="(work, idx) in works.variants"
          :key="work.kakMyRabotaemVariantyZagolovok"
          :idx
          :count-cart="countCart"
          :work
        />

        <!--  -->
        <li class="how_do_we_work__list_item__last cart_hdw">
          <div class="how_do_we_work__list_item__last_top">
            <span>Время становится лучшими</span>
          </div>

          <div class="how_do_we_work__list_item__last_title">Готовы начинать?</div>

          <div class="how_do_we_work__list_item__last_desc">
            Расскажите нам о своем проекте, мы предложим не только лучшие, но и удобные для Вас
            варианты
          </div>

          <UiButton
            title="Связаться с нами"
            color-class="btn_white"
            @click-btn="isOpenModal().value = true"
          />
        </li>
      </ul>

      <!--  -->
      <PageServicesRazrabotkaSliderHorizontal v-else :how-work-cards="works.variants" />
    </div>

    <!--  -->
    <div v-if="viewport.isGreaterOrEquals('screen1300')" class="how_do_we_work_line_text_wrap">
      <div class="how_do_we_work_line_text">
        <PageServicesRazrabotkaLineText
          v-if="works?.runText"
          :text="works.runText"
          bg="var(--colorTextWhite)"
        />
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.how_do_we_work_sec {
  position: relative;
  background-color: var(--colorDark4);
  padding: 160px 0 209px 0;
  overflow: hidden;

  /*  */
  @media (max-height: 788px) {
    padding-top: 25px;
  }

  @media (max-width: 768px) {
    padding: 120px 0;
  }

  @media (max-width: 576px) {
    padding: 80px 0;
  }
}

/*  */

.title_52 {
  font-weight: 500;
  margin-bottom: 62px;

  /*  */
  @media (max-width: 576px) {
    margin-bottom: 42px;
  }
}

/*  */

.how_do_we_work__list {
  position: relative;
  height: 510px;
  overflow: hidden;
}

/*  */
.how_do_we_work__list_item__last {
  width: 900px;
  height: 510px;
  background-color: #40b6b7;
  border-radius: 42px;
  display: flex;
  flex-direction: column;
  padding: 52px;

  /*  */
  @media (max-width: 1900px) {
    width: 600px;
  }
}

/*  */
.cart_hdw {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(210%);

  /*  */
  @media (max-width: 1900px) {
    transform: translateX(310%);
  }
}

/*  */
.how_do_we_work__list_item__last_top {
  position: relative;
  font-size: 20px;
  font-weight: 400;
  line-height: 100%;
  display: flex;
  align-items: center;
  column-gap: 26px;

  /*  */
  &::after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: var(--colorTextWhite);
    display: block;
  }

  /*  */
  span {
    flex-shrink: 0;
  }
}

/*  */
.how_do_we_work__list_item__last_title {
  font-size: 46px;
  font-weight: 700;
  line-height: 100%;
  margin: 52px 0 18px 0;
}

/*  */
.how_do_we_work__list_item__last_desc {
  max-width: 538px;
  font-size: 20px;
  font-weight: 300;
  line-height: 130%;
  opacity: 0.8;
}

/*  */
.how_do_we_work__list_item__last .btn_white {
  width: 388px;
  height: 103px;
  font-family: var(--fontFamily-RoadRadio);
  font-size: 24px;
  font-weight: 700;
  line-height: 130%;
  margin-top: auto;
}

/*  */

.how_do_we_work_line_text_wrap {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  left: 50%;
  pointer-events: none;
  /* outline: 1px solid red; */
}

.how_do_we_work_line_text {
  color: var(--accentColor2);
  transform: translate(3.6%, 620%) rotate(-35deg);

  /*  */
  @media (max-height: 768px) {
    transform: translate(2.5%, 620%) rotate(-35deg);
  }
}
</style>
