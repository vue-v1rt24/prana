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
const countCart = computed(() => props.works.variants.length);

// Управление модальным окно формы
const { isOpenModal } = useOutsideModal();

//
onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.how_do_we_work_sec',
      scrub: 0.5,
      pin: true,
      // markers: true,
    },
  });

  tl.to('.cart_hdw:nth-child(1)', {
    x: 0,
  });

  tl.to('.cart_hdw:nth-child(2)', {
    x: 188,
  });

  tl.to('.cart_hdw:nth-child(3)', {
    x: 376,
  });

  tl.to('.cart_hdw:nth-child(4)', {
    x: 564,
  });

  tl.to('.cart_hdw:nth-child(5)', {
    x: 752,
  });

  tl.to('.cart_hdw:nth-child(6)', {
    x: 940,
  });
});
</script>

<template>
  <section class="how_do_we_work_sec">
    <div class="container">
      <h2 class="title_52">Как мы работаем?</h2>

      <ul class="how_do_we_work__list">
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
    </div>

    <!--  -->
    <div class="how_do_we_work_line_text_wrap">
      <PageServicesRazrabotkaLineText
        v-if="works?.runText"
        :text="works.runText"
        bg="var(--colorTextWhite)"
      />
    </div>
  </section>
</template>

<style lang="css" scoped>
.how_do_we_work_sec {
  position: relative;
  /* height: 100vh; */
  background-color: var(--colorDark4);
  padding: 160px 0 209px 0;
}

/*  */

.title_52 {
  margin-bottom: 62px;
}

/*  */

.title_52 {
  font-weight: 500;
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
}

/*  */
.cart_hdw {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(210%);
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
  top: 274px;
  transform: translateX(-50%);
  left: 50%;

  width: 1920px;
  height: 720px;
  overflow: hidden;
  pointer-events: none;
  /* outline: 1px solid red; */

  /*  */
  @media (max-width: 1919px) {
    width: 100%;
  }
}

.how_do_we_work_line_text_wrap .text_line_wrap {
  color: var(--accentColor2);
  transform: translate(20%, 620%) rotate(-35deg);
}
</style>
