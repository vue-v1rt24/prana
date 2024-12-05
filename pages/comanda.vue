<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

//
import * as FancyboxAll from '@fancyapps/ui';
const { Fancybox } = FancyboxAll;

//
import Swiper from 'swiper';
import { Scrollbar, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

import 'assets/css/swiper-global.css';

// Получение данных из админки
const { dataCompany } = await useCompanyQuery();

//
useSeoMeta({
  title: dataCompany.value?.mateTags.metaTitle,
  description: dataCompany.value?.mateTags.metaDescription,
});

//
const peopleSwiper = ref<Swiper | null>(null);

//
const mm = gsap.matchMedia();

// Видео в модальном окне
const videoPlayModal = (link: string) => {
  Fancybox.show(
    [
      {
        src: `data:text/html,${link}`,
        width: 'auto',
        height: 'auto',
        type: 'iframe',
      },
    ],
    {
      mainClass: 'vk_video',
    },
  );
};

// Анимация текста
let peopleLudiY = 400;
let peopleTitleY = 280;
let peopleTitleFontSize = '181px';
let delayTime = '-=0.84';

const animateText = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.people_sec',
      start: '300px bottom',
      end: '-250px 0',
      scrub: true,
      // markers: true,
    },
  });

  //
  mm.add('(max-width: 1360px)', () => {
    peopleTitleFontSize = '120px';
  });

  mm.add('(max-width: 992px)', () => {
    peopleTitleFontSize = '90px';
    delayTime = '-=0.98';
  });

  mm.add('(max-width: 768px)', () => {
    peopleLudiY = 350;
    peopleTitleY = 230;
    delayTime = '-=0.95';
  });

  mm.add('(max-width: 760px)', () => {
    peopleTitleFontSize = '60px';
    delayTime = '-=0.97';
  });

  mm.add('(max-width: 576px)', () => {
    peopleLudiY = 165;
    peopleTitleY = 218;
    peopleTitleFontSize = '40px';
  });

  //
  tl.to('.people_ludi', {
    duration: 1,
    y: peopleLudiY,
  });

  tl.to(
    '.people_title',
    {
      duration: 1,
      y: peopleTitleY,
      fontSize: peopleTitleFontSize,
    },
    delayTime,
  );
};

//
onMounted(() => {
  animateText();

  //
  const swiperPeopleBx = document.querySelector<HTMLDivElement>('.swiper_people')!;

  if (swiperPeopleBx) {
    peopleSwiper.value = new Swiper(swiperPeopleBx, {
      init: false,
      slidesPerView: 'auto',
      spaceBetween: 20,
      freeMode: true,
      modules: [Scrollbar, FreeMode],
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
        hide: false,
      },
    });

    mm.add('(max-width: 768px)', () => {
      peopleSwiper.value?.init();

      return () => {};
    });
  }
});

onUnmounted(() => {
  Fancybox.destroy();

  //
  mm.kill(true);
});
</script>

<template>
  <div :class="['page_company', { image_people_company: dataCompany?.imagePeopleCompany }]">
    <!-- Хлебные крошки -->
    <Breadcrumbs :breadcrumbs="[{ title: 'Команда' }]" />

    <!--  -->
    <div class="about_particles"></div>

    <!-- Команда -->
    <section class="about_sec">
      <div class="container">
        <div class="about_download">
          <div class="about_download__left">
            <div class="about_download__left_title">Команда</div>
            <h1 class="about_download__left_h1">PRANA IT</h1>
          </div>

          <div class="about__download__right">
            <div v-if="dataCompany?.file" class="about__download__right_load">
              <img class="about__download__right_load_img" src="/img/team/download.svg" alt="" />

              <a class="about__download__right_load_link" :href="dataCompany.file" target="_blank">
                Скачать презентацию компании
              </a>
            </div>

            <p
              v-if="dataCompany?.descCompany"
              v-html="dataCompany.descCompany"
              class="about__download__right_desc"
            ></p>
          </div>
        </div>

        <!--  -->
        <div v-if="dataCompany?.imagePeopleCompany" class="about_image_people_company">
          <NuxtImg :src="dataCompany.imagePeopleCompany" densities="x1" alt="" />
        </div>

        <div v-else-if="dataCompany?.file" class="about_video">
          <div class="about_video__link" @click.prevent="videoPlayModal(dataCompany.videoCompany)">
            <picture>
              <source :srcset="dataCompany.image360" media="(max-width: 360px)" />
              <source :srcset="dataCompany.image768" media="(max-width: 768px)" />
              <img class="about_video__img" :src="dataCompany.image1920" alt="" />
            </picture>

            <div class="about_video__promo">
              <div class="about_video__promo_billet">
                <span class="about_video__promo_billet_vide">Смотрите промо ролик</span>
                <span class="about_video__promo_billet_duration">Длительность 2 минуты</span>
              </div>

              <button class="about_video__promo_billet_btn">
                <svg class="about_video__promo_billet_btn_play">
                  <use xlink:href="/img/sprite.svg#play"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Тексты -->
    <section class="about_desc_bx">
      <div class="container">
        <!--  -->
        <div class="about_desc">
          <div class="about_desc_1">
            Мы придерживаемся ключевого принципа в нашей работе: найти решение, которое
            <span>поможет Вашей компании расти и развиваться</span>
          </div>

          <div class="about_desc_2">
            Опираясь на многолетний опыт взаимодействия наших специалистов с различными сферами и
            моделями бизнеса, мы готовы прийти на помощь и реализовать проект любой сложности и
            масштаба.
          </div>

          <div class="about_desc_3">
            Наша цель – создать <span>функциональный инструмент</span>, фокусируясь именно на
            <span>потребностях и ожиданиях бизнеса</span>
          </div>

          <div class="about_desc_4">
            Наше преимущество в возможности
            <span>оказать клиенту весь спектр digital-услуг:</span> от профессиональной фотосъемки
            продукта и полноценного брендинга до запуска сайта и дальнейшего продвижения.
          </div>

          <div class="about_desc_4">
            Для этого в нашей команде реализуют свой потенциал front- и backend-разработчики,
            web-дизайнеры, копирайтеры, графические дизайнеры, фотографы и специалисты по
            продвижению в Интернете. 
          </div>
        </div>

        <!--  -->
        <div class="not_joke">
          <div class="not_joke__title">
            Вы сможете убедится в нашей экспертности только увидев
            <NuxtLink to="/portfolio" class="not_joke__link">
              <span>наши работы</span>

              <svg viewBox="0 0 34 34" fill="transparent">
                <circle cx="17" cy="17" r="15.8913" stroke="#40B6B7" stroke-width="2.21741" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.9988 16.1661L17.0403 11.2076L18.3476 9.90035L25.5377 17.0905L18.0208 24.6074L16.7135 23.3001L21.9988 18.0149L8.54291 18.0149L8.54291 16.1661L21.9988 16.1661Z"
                  fill="#40B6B7"
                />
              </svg>
            </NuxtLink>
            и
            <NuxtLink to="/reviews" class="not_joke__link">
              <span>отзывы клиентов</span>
              <svg viewBox="0 0 34 34" fill="transparent">
                <circle cx="17" cy="17" r="15.8913" stroke="#40B6B7" stroke-width="2.21741" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.9988 16.1661L17.0403 11.2076L18.3476 9.90035L25.5377 17.0905L18.0208 24.6074L16.7135 23.3001L21.9988 18.0149L8.54291 18.0149L8.54291 16.1661L21.9988 16.1661Z"
                  fill="#40B6B7"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Команда -->
    <section class="people_sec">
      <div class="people_ludi">Люди</div>

      <div class="container">
        <h2 class="people_title">Команда</h2>

        <div class="swiper swiper_people">
          <div class="swiper-wrapper">
            <div v-for="(item, idx) in dataCompany?.comands" :key="idx" class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img">
                  <NuxtImg
                    :src="item.fotoPoNavedeniyuCompanyKomanda?.node.mediaItemUrl"
                    class="people_item__img_face_hover"
                    loading="lazy"
                    format="webp"
                  />

                  <NuxtImg
                    :src="item.companyKomandaFoto?.node.mediaItemUrl"
                    class="people_item__img_face"
                    loading="lazy"
                    format="webp"
                  />
                </div>

                <div
                  class="people_item__name"
                  v-html="item.companyKomandaImyaIFamiliya.replace(' ', '<br />')"
                ></div>

                <div class="people_item__post">{{ item.companyKomandaDolzhnost }}</div>
              </div>
            </div>
          </div>

          <div class="swiper-scrollbar"></div>
        </div>
      </div>
    </section>

    <!-- Блог -->
    <section class="team_page blog_bx">
      <div class="container">
        <h2 class="title_52">
          Следите за новостями <br />
          компании
        </h2>
      </div>

      <!-- Галерея -->
      <div class="container">
        <BlogSlider dark />
      </div>
    </section>
  </div>
</template>

<style lang="css" scoped>
.about_sec {
  position: relative;
}

/*  */
.about_sec::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 316px;
  background-color: white;
  border-radius: 58px 58px 0 0;
  z-index: -1;
}

.image_people_company .about_sec::after {
  height: 360px;
}

@media (max-width: 1200px) {
  .about_sec::after {
    height: 180px;
  }

  .image_people_company .about_sec::after {
    height: 220px;
  }
}

@media (max-width: 768px) {
  .image_people_company .about_sec::after {
    height: 130px;
  }
}

@media (max-width: 576px) {
  .about_sec::after {
    border-radius: 28px 28px 0 0;
  }

  .image_people_company .about_sec::after {
    height: 48px;
  }
}

/*  */
.about_particles {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 2318px;
  overflow: hidden;
  z-index: -1;
}

.about_particles::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 940px;
  height: 714px;
  background-image: url(/img/team/decoration_1_1920.png);
  background-repeat: no-repeat;
  z-index: -1;
}

@media (max-width: 1200px) {
  .about_particles::before {
    width: 564px;
    height: 604px;
    background-image: url(/img/team/decoration_1_768.png);
  }
}

@media (max-width: 700px) {
  .about_particles::before {
    right: -120px;
  }
}

@media (max-width: 576px) {
  .about_particles::before {
    right: -311px;
    width: 564px;
    height: 604px;
    background-image: url(/img/team/decoration_1_360.png);
  }
}

/*  */
.about_download {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 82px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    margin-bottom: 74px;
  }
}

.about_download::before {
  content: '';
  position: absolute;
  top: -315px;
  left: -560px;
  width: 1243px;
  height: 1240px;
  background-image: url(/img/ellipse-lighter-2.svg);
  background-repeat: no-repeat;
  z-index: -1;
}

@media (max-width: 768px) {
  .about_download::before {
    display: none;
  }
}

/*  */
.about_download__left {
  font-family: var(--fontFamily-Unbounded);
}

.about_download__left_title {
  font-size: 26px;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: 0.52px;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 52px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 42px;
  }

  @media (max-width: 576px) {
    font-size: 18px;
    letter-spacing: 0.36px;
    margin-bottom: 24px;
  }
}

.about_download__left_h1 {
  font-size: 72px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: 1.44px;
  color: var(--colorTextWhite);

  @media (max-width: 768px) {
    font-size: 52px;
  }

  @media (max-width: 576px) {
    font-size: 36px;
  }
}

/*  */
.about__download__right {
  display: flex;
  flex-direction: column;
  row-gap: 60px;

  @media (max-width: 1200px) {
    flex-direction: column-reverse;
    margin-top: 52px;
  }

  @media (max-width: 768px) {
    row-gap: 44px;
  }

  @media (max-width: 576px) {
    row-gap: 26px;
    margin-top: 34px;
  }
}

.about__download__right_load_img {
  @media (max-width: 576px) {
    width: 20px;
    height: 20px;
  }
}

.about__download__right_load_link {
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  color: var(--accentColor2);
  border-bottom: 1px solid var(--accentColor2);
  display: inline-block;
  padding-bottom: 2px;
  margin-left: 6px;

  @media (max-width: 576px) {
    font-size: 14px;
  }
}

.about__download__right_desc {
  font-size: 24px;
  font-weight: 300;
  line-height: 130%;
  color: var(--colorTextOpacity08);

  @media (max-width: 576px) {
    font-size: 14px;
  }
}

/*  */
.about_image_people_company {
  text-align: center;

  /*  */
  img {
    border-radius: 52px;

    /*  */
    @media (max-width: 576px) {
      border-radius: 24px;
    }
  }
}

/*  */
.about_video {
  position: relative;
  overflow: hidden;
}

/*  */
.about_video__link {
  height: 100%;
  display: block;

  @media (max-width: 576px) {
    display: flex;
    flex-direction: column-reverse;
  }
}

/*  */
.about_video__img {
  border-radius: 52px;

  @media (max-width: 576px) {
    border-radius: 28px;
  }
}

/*  */
.about_video__promo {
  position: absolute;
  top: 42px;
  left: 42px;
  display: flex;
  column-gap: 24px;

  @media (max-width: 768px) {
    top: 26px;
    left: 26px;
    column-gap: 12px;
  }

  @media (max-width: 576px) {
    position: static;
    column-gap: 14px;
    margin-bottom: 14px;
  }
}

.about_video__promo_billet {
  width: 263px;
  height: 92px;
  line-height: 100%;
  opacity: 0.9;
  background: var(--colorDark4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;

  @media (max-width: 768px) {
    width: 235px;
    height: 84px;
    border-radius: 24px;
  }

  @media (max-width: 576px) {
    width: 203px;
    height: 72px;
    border-radius: 18px;
  }
}

.about_video__promo_billet_vide {
  font-size: 18px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 576px) {
    font-size: 14px;
  }
}

.about_video__promo_billet_duration {
  font-size: 16px;
  font-weight: 300;
  color: var(--colorTextOpacity06);
  transform: translateX(-13px);

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 576px) {
    font-size: 12px;
  }
}

.about_video__promo_billet_btn {
  width: 92px;
  height: 92px;
  background-color: var(--accentColor2);
  border: none;
  border-radius: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  @media (max-width: 768px) {
    width: 84px;
    height: 84px;
  }

  @media (max-width: 576px) {
    width: 72px;
    height: 72px;
    border-radius: 18px;
  }
}

.about_video__promo_billet_btn_play {
  width: 36px;
  height: 36px;
  fill: var(--colorTextWhite);
}

/*  */
.about_desc_bx {
  position: relative;
  color: var(--colorDark3);
  background-color: white;
  padding: 86px 0 400px 0;

  .image_people_company & {
    padding: 120px 0 400px 0;

    @media (max-width: 768px) {
      padding: 50px 0 150px 0;
    }
  }

  /*  */
  @media (max-width: 992px) {
    padding: 86px 0 260px 0;
  }

  @media (max-width: 768px) {
    padding: 100px 0 230px 0;
  }

  @media (max-width: 576px) {
    padding: 100px 0 150px 0;
  }
}

.about_desc_bx::after {
  content: '';
  pointer-events: none;
  position: absolute;
  bottom: 560px;
  right: 0;
  width: 630px;
  height: 1514px;
  background-image: url(/img/team/decoration_2_1920.svg);
  background-repeat: no-repeat;
  z-index: 1;
}

@media (max-width: 1200px) {
  .about_desc_bx::after {
    bottom: 400px;
    width: 571px;
    height: 1114px;
    background-image: url(/img/team/decoration_2_768.svg);
  }
}

@media (max-width: 576px) {
  .about_desc_bx::after {
    display: none;
  }
}

.about_desc_bx .container {
  position: relative;
  z-index: 2;
}

/*  */
.not_joke__link span {
  border-bottom: 2px solid var(--accentColor);
}

.not_joke__link svg {
  width: 46px;
  height: 46px;
  transform: translateY(14px);
  transition: fill 0.3s, transform 0.3s;
  margin-left: 20px;

  @media (max-width: 992px) {
    display: none;
  }
}

.not_joke__link:hover svg {
  fill: var(--accentColor);
  transform: translateY(14px) rotate(-45deg);
  transition: fill 0.3s, transform 0.3s;
}

.not_joke__link:hover svg > path {
  fill: white;
  transition: fill 0.3s;
}

/*  */
.about_desc {
  max-width: 1229px;
  font-family: var(--fontFamily-Unbounded);
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 120px;
  }

  @media (max-width: 576px) {
    margin-bottom: 82px;
  }
}

.about_desc span {
  color: var(--accentColor2);
}

.about_desc_1 {
  font-size: 42px;
  font-weight: 700;
  line-height: 120%;
  letter-spacing: 0.84px;
  margin-bottom: 100px;

  @media (max-width: 768px) {
    font-size: 32px;
    letter-spacing: 0.64px;
    margin-bottom: 82px;
  }

  @media (max-width: 576px) {
    font-size: 19px;
    letter-spacing: 0.38px;
    margin-bottom: 42px;
  }
}

.about_desc_2 {
  font-size: 22px;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: 0.44px;
  margin-bottom: 42px;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 32px;
  }

  @media (max-width: 576px) {
    font-size: 14px;
    letter-spacing: 0.28px;
    margin-bottom: 22px;
  }
}

.about_desc_3 {
  max-width: 950px;
  font-size: 28px;
  font-weight: 700;
  line-height: 120%;
  letter-spacing: 0.56px;
  margin-bottom: 42px;

  @media (max-width: 768px) {
    max-width: 670px;
    font-size: 26px;
    letter-spacing: 0.52px;
    margin-bottom: 62px;
  }

  @media (max-width: 576px) {
    font-size: 16px;
    letter-spacing: 0.32px;
    margin-bottom: 42px;
  }
}

.about_desc_4 {
  max-width: 750px;
  font-family: var(--fontFamily-NeueMachina);
  font-size: 20px;
  font-weight: 300;
  line-height: 140%;

  @media (max-width: 768px) {
    max-width: 660px;
    font-size: 18px;
  }

  @media (max-width: 576px) {
    font-size: 14px;
  }
}

.about_desc_4:not(:last-child) {
  margin-bottom: 42px;

  @media (max-width: 768px) {
    margin-bottom: 32px;
  }

  @media (max-width: 576px) {
    margin-bottom: 28px;
  }
}

.about_desc_4 span {
  font-weight: 700;
  color: var(--colorDark3);
}

/*  */
.team_page.blog_bx {
  position: relative;
  background-color: #060e1b;
  border-radius: 58px 58px 0px 0px;
  padding: 160px 0 12px 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0px;
    width: 100px;
    height: 100px;
    background-color: black;
    z-index: -1;
  }

  &::before {
    left: 0px;
  }

  &::after {
    right: 0;
  }

  /*  */
  @media (max-width: 768px) {
    padding-top: 100px;
  }

  @media (max-width: 576px) {
    border-radius: 28px 28px 0 0;
    padding-top: 80px;
  }
}

.team_page .title_52 {
  margin-bottom: 62px;
}

/*  */
.team_page .blog_bx__title {
  margin-top: 160px;
}

.team_page .data_company {
  margin-top: 62px;
}

/*  */
.team_page .swiper_article_full {
  padding: 0;
  margin: 0;

  @media (max-width: 1200px) {
    padding: 0 30px;
    margin: 0 -30px;
  }

  @media (max-width: 576px) {
    padding: 0 20px;
    margin: 0 -20px;
  }
}

.team_page :global(.swiper_article_full .swiper-slide) {
  width: 445px;
}

/*  */
.not_joke {
  max-width: 1170px;
  font-family: var(--fontFamily-Unbounded);
}

.not_joke__title {
  font-size: 52px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: 1.04px;

  @media (max-width: 768px) {
    font-size: 48px;
    letter-spacing: 0.96px;
    margin-bottom: 62px;
  }

  @media (max-width: 576px) {
    font-size: 26px;
    letter-spacing: 0.52px;
    margin-bottom: 36px;
  }
}

.not_joke__title span {
  color: var(--accentColor2);
}

.not_joke__title img {
  width: 46px;
}

/*  */
.people_sec {
  position: relative;
  background-color: black;
  border-radius: 58px 58px 0 0;
  padding-bottom: 186px;

  @media (max-width: 768px) {
    padding-bottom: 100px;
  }

  @media (max-width: 576px) {
    border-radius: 28px 28px 0 0;
  }
}

.people_sec::before,
.people_sec::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background-color: white;
  z-index: -1;
}

.people_sec::after {
  left: auto;
  right: 0;
}

/*  */
.people_sec .container {
  position: relative;
  overflow: hidden;
}

/*  */
.people_ludi {
  position: absolute;
  top: -267px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--fontFamily-Unbounded);
  font-size: 120px;
  line-height: 100%;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: black;

  /*  */
  @media (max-width: 992px) {
    top: -160px;
    font-size: 60px;
  }

  @media (max-width: 768px) {
    top: -180px;
  }

  @media (max-width: 576px) {
    top: -110px;
    font-size: 32px;
  }
}

/*  */
.people_title {
  position: absolute;
  top: -130px;
  left: 0;
  right: 0;
  font-family: var(--fontFamily-Unbounded);
  font-size: 94px;
  line-height: 100%;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-align: center;
  color: white;

  /*  */
  @media (max-width: 992px) {
    font-size: 60px;
  }

  @media (max-width: 760px) {
    font-size: 48px;
  }

  @media (max-width: 576px) {
    font-size: 32px;
  }
}

.swiper_people {
  padding-top: 248px;

  @media (max-width: 1360px) {
    padding-top: 217px;
  }

  @media (max-width: 992px) {
    padding-top: 200px;
  }

  @media (max-width: 768px) {
    padding: 150px 30px 30px 30px;
    margin: 0 -30px;
  }

  @media (max-width: 760px) {
    font-size: 32px;
  }

  @media (max-width: 760px) {
    padding: 135px 30px 30px 30px;
  }

  @media (max-width: 576px) {
    padding: 110px 20px 30px 20px;
    margin: 0 -20px;
  }
}

.swiper_people .swiper-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 40px 20px;

  /*  */
  @media (max-width: 768px) {
    display: flex;
    gap: unset;
  }
}

.swiper_people .swiper-slide {
  @media (max-width: 768px) {
    width: 330px;
  }

  @media (max-width: 576px) {
    width: 260px;
  }
}

/*  */
.people_item {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/*  */
.people_item__img {
  position: relative;
  aspect-ratio: 1/1;
  margin-bottom: 24px;

  /*  */
  .people_item__img_face,
  .people_item__img_face_hover {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
    transition: opacity 0.5s;
  }
}

.people_item__img_face {
  border-radius: 18px;
}

.people_item__img_face_hover {
  border-radius: 20px;
}

.people_item__img:hover .people_item__img_face {
  opacity: 0;
}

/*  */
.people_item__name {
  font-family: var(--fontFamily-Unbounded);
  font-size: 22px;
  line-height: 120%;
  letter-spacing: 0.36px;
  margin-bottom: 18px;

  @media (max-width: 576px) {
    font-size: 16px;
  }
}

/*  */
.people_item__post {
  font-family: var(--fontFamily-NeueMachina);
  font-size: 18px;
  font-weight: 300;
  line-height: 130%;
  color: var(--accentColor);
  margin-top: auto;

  @media (max-width: 576px) {
    font-size: 14px;
  }
}

/*  */
.page_company .data_company__ellipse {
  position: absolute;
  top: -380px;
  left: 600px;
}

/*  */
:global(.page_company + .blog_bx.dark::before),
:global(.page_company + .blog_bx.dark::after) {
  background-color: var(--colorDark4);
}
</style>
