<script setup lang="ts">
import * as FancyboxAll from '@fancyapps/ui';
const { Fancybox } = FancyboxAll;

Fancybox.bind('[data-fancybox="team"]', {
  on: {
    close() {
      // cursor.classList.remove('active');
      // aura.classList.remove('active');
    },
  },
});
</script>

<template>
  <div class="page_company">
    <!-- Хлебные крошки -->
    <Breadcrumbs :breadcrumbs="[{ title: 'О компании' }]" />

    <!--  -->
    <div class="about_particles"></div>

    <!-- О компании -->
    <section class="about_sec">
      <div class="container">
        <div class="about_download">
          <div class="about_download__left">
            <div class="about_download__left_title">О компании</div>
            <h1 class="about_download__left_h1">PRANA IT</h1>
          </div>

          <div class="about__download__right">
            <div class="about__download__right_load">
              <img class="about__download__right_load_img" src="/img/team/download.svg" alt="" />
              <a class="about__download__right_load_link" href="#" download>
                Скачать презентацию компании
              </a>
            </div>

            <p class="about__download__right_desc">
              Команда профессионалов в различных <br />
              областях, таких как дизайн, веб-разработка, <br />
              продвижение, motion и фотография
            </p>
          </div>
        </div>

        <!--  -->
        <div class="about_video">
          <a
            class="about_video__link"
            href="https://www.youtube.com/watch?v=z2X2HaTvkl8"
            data-fancybox="team"
          >
            <picture>
              <source srcset="/img/team/poster_360.jpg" media="(max-width: 360px)" />
              <source srcset="/img/team/poster_768.jpg" media="(max-width: 768px)" />
              <img class="about_video__img" src="/img/team/poster_1920.jpg" alt="" />
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
          </a>
        </div>
      </div>
    </section>

    <!--  -->
    <section class="about_desc_bx">
      <div class="container">
        <!--  -->
        <div class="about_desc">
          <div class="about_desc_1">
            Имея многолетний опыт работы с самыми разными клиентами,
            <span>мы не смогли помочь абсолютно всем</span>. Берясь за амбициозные и слишком
            масштабные проекты, мы иногда
            <span>срывали оговоренные сроки и подводили</span> крупнейшие организации и предприятия
          </div>

          <div class="about_desc_2">
            У нас нет особых преимуществ в сравнении с конкурентами, которые обещают Вам
            гарантированный результат
          </div>

          <div class="about_desc_3">
            Однако, мы искренне удивимся, что Вы выберете именно нас и сделаем все возможное,
            <span>чтобы выполнить работу хотя бы на половину</span>
          </div>

          <div class="about_desc_4">
            Наша команда состоит из людей,
            <span>мало понимающих что и зачем они делают:</span> front- и beckend-разработчиков,
            копирайтеров, дизайнеров, фотографов и специалистов по продвижению в Интернете.
          </div>

          <div class="about_desc_4">
            Вы можете рассчитывать на нашу экспертность в вопросах, абсолютно не связанных с вашей
            идеей. Мы не просто, вероятнее всего,
            <span>
              не выполним свою работу, но и сможем дать ненужные и бесполезные рекомендации
            </span>
            для воплощения ваших бизнес-концепций.
          </div>
        </div>

        <!--  -->
        <div class="not_joke">
          <div class="not_joke__title">
            Отбросив шутки, вы сможете убедится в нашей экспертности только увидев
            <a class="not_joke__link" href="portfolio.html">
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
            </a>
            <br class="hide992" />
            и
            <a class="not_joke__link" href="reviews.html">
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
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Люди - наша гордость -->
    <section class="people_sec">
      <div class="container">
        <!-- <h2 class="title_52">Люди - наша гордость</h2> -->

        <div class="swiper swiper_people">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Александр Стопчев</div>
                <div class="people_item__post">Генеральный директор</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Александр Гуминский</div>
                <div class="people_item__post">Арт-директор</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Владислав Белецкий</div>
                <div class="people_item__post">Руководитель отдела разработки</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Анастасия Верёвкина</div>
                <div class="people_item__post">Графический дизайнер</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Роман Иванов</div>
                <div class="people_item__post">Разработчик</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Александра Иванова</div>
                <div class="people_item__post">Менеджмент</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Анатолий Дейкун</div>
                <div class="people_item__post">Разработчик</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Семён Иванов</div>
                <div class="people_item__post">Веб-дизайнер</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Никита Найденов</div>
                <div class="people_item__post">Веб-дизайнер</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Серафима Гордей</div>
                <div class="people_item__post">Фотограф</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Владислав Воробьёв</div>
                <div class="people_item__post">Видео-оператор</div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="people_item">
                <div class="people_item__img"></div>
                <div class="people_item__name">Ещё кто нибудь...</div>
                <div class="people_item__post">Кто то - олог</div>
              </div>
            </div>
          </div>

          <div class="swiper-scrollbar"></div>
        </div>
      </div>
    </section>

    <!-- Блог -->
    <section class="team_page blog_bx blog_blue">
      <div class="container">
        <h2 class="title_52">
          Как проходят наши <br />
          мероприятия
        </h2>
      </div>

      <!-- Галерея -->
      <div class="swiper swiper_article_full swiper__dark">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="works__item">
              <div class="works__img">
                <a href="article.html">
                  <!-- <img src="img/blog/blog_1.jpg" alt="" /> -->
                </a>
              </div>

              <div class="works__text">
                <a href="article.html" class="works__title">Как мы путешествовали по горам</a>

                <p class="works__desc">
                  Мы, как коллектив, очень ценим нашу сплоченность и всегда открыты для новых
                  впечатлений
                </p>

                <div class="works__tags">
                  <span class="works__tag">
                    <a class="works__tag_link" href="#">
                      <span class="works__tag_hash">#</span>
                      <span>Событие</span>
                    </a>

                    <span class="works__date">15.9.2023</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="works__item">
              <div class="works__img">
                <a href="#">
                  <!-- <img src="img/blog/blog_2.jpg" alt="" /> -->
                </a>
              </div>

              <div class="works__text">
                <a href="#" class="works__title">Главный инструмент для малого</a>

                <p class="works__desc">
                  Мы, как коллектив, очень ценим нашу сплоченность и всегда открыты для новых
                  впечатлений
                </p>

                <div class="works__tags">
                  <span class="works__tag">
                    <a class="works__tag_link" href="#">
                      <span class="works__tag_hash">#</span>
                      <span>Статья</span>
                    </a>

                    <span class="works__date">15.9.2023</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="works__item">
              <div class="works__img">
                <a href="#">
                  <!-- <img src="img/blog/blog_3.jpg" alt="" /> -->
                </a>
              </div>

              <div class="works__text">
                <a href="#" class="works__title">
                  Команда разработчиков PRANA IT посетила крупнейшее мероприятие по it технология
                </a>

                <p class="works__desc">
                  Мы, как коллектив, очень ценим нашу сплоченность и всегда открыты для новых
                  впечатлений, поэтому часто устраиваем совместные поездки.
                </p>

                <div class="works__tags">
                  <span class="works__tag">
                    <a class="works__tag_link" href="#">
                      <span class="works__tag_hash">#</span>
                      <span>Событие</span>
                    </a>

                    <span class="works__date">15.9.2023</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="works__item">
              <div class="works__img">
                <a href="#">
                  <!-- <img src="img/blog/blog_4.jpg" alt="" /> -->
                </a>
              </div>

              <div class="works__text">
                <a href="#" class="works__title">Отзыв от компании СтройСфера</a>

                <p class="works__desc">
                  Мы, как коллектив, очень ценим нашу сплоченность и всегда открыты
                </p>

                <div class="works__tags">
                  <span class="works__tag">
                    <a class="works__tag_link" href="#">
                      <span class="works__tag_hash">#</span>
                      <span>Видео</span>
                    </a>

                    <span class="works__date">15.9.2023</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="works__item">
              <div class="works__img">
                <a href="#">
                  <!-- <img src="img/blog/blog_2.jpg" alt="" /> -->
                </a>
              </div>

              <div class="works__text">
                <a href="#" class="works__title">Главный инструмент для малого</a>

                <p class="works__desc">
                  Мы, как коллектив, очень ценим нашу сплоченность и всегда открыты для новых
                  впечатлений
                </p>

                <div class="works__tags">
                  <span class="works__tag">
                    <a class="works__tag_link" href="#">
                      <span class="works__tag_hash">#</span>
                      <span>Статья</span>
                    </a>

                    <span class="works__date">15.9.2023</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="works__item">
              <div class="works__img">
                <a href="#">
                  <!-- <img src="img/blog/blog_4.jpg" alt="" /> -->
                </a>
              </div>

              <div class="works__text">
                <a href="#" class="works__title">Отзыв от компании СтройСфера</a>

                <p class="works__desc">
                  Мы, как коллектив, очень ценим нашу сплоченность и всегда открыты
                </p>

                <div class="works__tags">
                  <span class="works__tag">
                    <a class="works__tag_link" href="#">
                      <span class="works__tag_hash">#</span>
                      <span>Статья</span>
                    </a>

                    <span class="works__date">15.9.2023</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="swiper-scrollbar"></div>
      </div>
    </section>
  </div>
</template>

<style lang="css" scoped>
.about_sec {
  position: relative;
}

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
  background-image: url(/img/team/decoration_1_1920.svg);
  background-repeat: no-repeat;
  z-index: -1;
}

/*  */
.about_download {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 82px;
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

/*  */
.about_download__left {
  font-family: var(--fontFamily-RFDewi);
}

.about_download__left_title {
  font-size: 26px;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: 0.52px;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 52px;
}

.about_download__left_h1 {
  font-size: 72px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: 1.44px;
  color: var(--colorTextWhite);
}

/*  */
.about__download__right {
  display: flex;
  flex-direction: column;
  row-gap: 60px;
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
}

.about__download__right_desc {
  font-size: 24px;
  font-weight: 300;
  line-height: 130%;
  color: var(--colorTextOpacity08);
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
}

/*  */
.about_video__img {
  border-radius: 52px;
}

/*  */
.about_video__promo {
  position: absolute;
  top: 42px;
  left: 42px;
  display: flex;
  column-gap: 24px;
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
}

.about_video__promo_billet_vide {
  font-size: 18px;
  font-weight: 500;
}

.about_video__promo_billet_duration {
  font-size: 16px;
  font-weight: 300;
  color: var(--colorTextOpacity06);
  transform: translateX(-13px);
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
  padding: 86px 0 150px 0;
}

.about_desc_bx::after {
  content: '';
  pointer-events: none;
  position: absolute;
  bottom: 390px;
  right: 0;
  width: 630px;
  height: 1514px;
  background-image: url(/img/team/decoration_2_1920.svg);
  background-repeat: no-repeat;
  z-index: 1;
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
  font-family: var(--fontFamily-RFDewi);
  margin-bottom: 160px;
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
}

.about_desc_2 {
  max-width: 620px;
  font-size: 22px;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: 0.44px;
  margin-bottom: 42px;
}

.about_desc_3 {
  max-width: 950px;
  font-size: 28px;
  font-weight: 700;
  line-height: 120%;
  letter-spacing: 0.56px;
  margin-bottom: 72px;
}

.about_desc_4 {
  max-width: 780px;
  font-family: var(--fontFamily-NeueMachina);
  font-size: 20px;
  font-weight: 300;
  line-height: 140%;
}

.about_desc_4:not(:last-child) {
  margin-bottom: 42px;
}

.about_desc_4 span {
  font-weight: 700;
  color: var(--colorDark3);
}

/*  */
.team_page.blog_bx {
  overflow: hidden;
}

.team_page.blog_blue::before,
.team_page.blog_blue::after {
  background-color: var(--colorDark3);
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

.team_page .swiper_article_full .swiper-scrollbar {
  background-color: rgba(255, 255, 255, 0.2);
}

/*  */
.not_joke {
  max-width: 1170px;
  font-family: var(--fontFamily-RFDewi);
}

.not_joke__title {
  font-size: 52px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: 1.04px;
}

.not_joke__title span {
  color: var(--accentColor2);
}

.not_joke__title img {
  width: 46px;
}

/*  */
.people_sec {
  margin-bottom: 160px;
}

.people_sec .container {
  max-width: 1860px;
  padding: 0;
}

.people_sec .title_52 {
  margin-bottom: 72px;
}

.swiper_people {
  padding-bottom: 30px;
}

.swiper_people .swiper-wrapper {
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px 20px;
}

.swiper_people .swiper-slide {
  width: 450px;
}

.people_item__img {
  width: 100%;
  height: 450px;
  background-color: #060e1b;
  border-radius: 26px;
  margin-bottom: 24px;
}

.people_item__name {
  font-family: var(--fontFamily-RFDewi);
  font-size: 22px;
  font-weight: 600;
  line-height: 120%;
  letter-spacing: 0.36px;
  margin-bottom: 12px;
}

.people_item__post {
  font-family: var(--fontFamily-NeueMachina);
  font-size: 18px;
  font-weight: 300;
  line-height: 130%;
  color: var(--accentColor);
}

/*  */
.page_company .data_company__ellipse {
  position: absolute;
  top: -380px;
  left: 600px;
}

/*  */
.swiper.scrollbar {
  padding: 0 39px 40px 39px;
  margin: 0 -39px;
}

/* Полоса скроллбара */
.swiper-horizontal > .swiper-scrollbar,
.swiper-scrollbar.swiper-scrollbar-horizontal {
  left: 39px;
  right: 39px;
  width: auto;
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0;
}

.swiper-scrollbar-drag {
  background-color: var(--accentColor);
  border-radius: 0;
}
</style>
