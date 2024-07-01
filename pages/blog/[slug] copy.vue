<script setup lang="ts">
import Swiper from 'swiper';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'assets/css/swiper-global.css';

onMounted(() => {
  const swiperArticleFull = document.querySelector<HTMLDivElement>('.swiper_article_full')!;

  if (swiperArticleFull) {
    new Swiper('.swiper_article_full', {
      slidesPerView: 'auto',
      freeMode: true,
      modules: [Scrollbar],
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
        hide: false,
      },
      breakpoints: {
        320: {
          spaceBetween: 30,
        },
        577: {
          spaceBetween: 30,
        },
        769: {
          spaceBetween: 20,
        },
      },
    });
  }
});
</script>

<template>
  <section class="article_full_bx">
    <div class="container container_blog">
      <div class="article_full">
        <!--  -->
        <div class="article_full_top">
          <div class="article_full_tag">
            <span class="works__tag_hash">#</span>
            <span>Статья</span>
          </div>

          <div class="article_full_data">29.10.2023</div>

          <div class="article_full_view">
            <span><img src="/img/article/view.svg" alt="" /></span>
            <span>1 203</span>
          </div>
        </div>

        <!--  -->
        <h1 class="article_full_h1">
          Мастерская доспехов и центр генеалогии: 10 лучших историй про бизнес в 2023 году
        </h1>

        <!--  -->
        <div class="article_full_share">
          <div class="article_full_save">
            <span><img src="/img/article/bookmark.png" alt="" /></span>
            <span>Сохранить</span>
          </div>

          <div class="article_full_save">
            <span><img src="/img/article/share.png" alt="" /></span>
            <span>Поделиться</span>
          </div>
        </div>

        <!--  -->
        <div class="article_full_content_page">
          <div class="article_full_content_page__title">Содержание</div>

          <a href="#tilda">Создаем анимацию по скроллу на Тильде</a>

          <a href="#pdd">
            В Москве провели испытания светофора, который фиксирует нарушения ПДД пешеходам
          </a>

          <a href="#dos">
            Мастерская доспехов и центр генеалогии: 10 лучших историй про бизнес в 2023 году
          </a>
        </div>

        <!--  -->
        <div class="article_full_content">
          <h3 class="article_full_h3">
            Мастерская доспехов и центр генеалогии: 10 лучших историй про бизнес в 2023 году
          </h3>

          <!--  -->
          <p class="article_full_p">
            Неоднократно упомянуто, ключевые особенности структуры проекта освещают чрезвычайно
            интересные особенности картины в целом, однако конкретные выводы, разумеется, объявлены
            нарушающими общечеловеческие нормы этики и морали. Равным образом, реализация намеченных
            плановых заданий является качественно новой ступенью новых предложений.
          </p>

          <p class="article_full_p">
            Повседневная практика показывает, что сложившаяся структура организации прекрасно
            подходит для реализации поэтапного и последовательного развития общества. В целом,
            конечно, базовый вектор развития предоставляет широкие возможности для инновационных
            методов управления процессами.
          </p>

          <!--  -->
          <div class="article_full_img">
            <!-- <img src="img/article/article_1.jpg" alt="" /> -->
            <span>Пример стоимости лендинга в виде фиксированных пакетных предложений</span>
          </div>
        </div>

        <!--  -->
        <div class="article_full_content">
          <h3 id="tilda" class="article_full_h3">Создаем анимацию по скроллу на Тильде</h3>

          <!--  -->
          <p class="article_full_p">
            Неоднократно упомянуто, ключевые особенности структуры проекта освещают чрезвычайно
            интересные особенности картины в целом, однако конкретные выводы, разумеется, объявлены
            нарушающими общечеловеческие нормы этики и морали. Равным образом, реализация намеченных
            плановых заданий является качественно новой ступенью новых предложений.
          </p>

          <!--  -->
          <div class="article_full_img">
            <!-- <img src="img/article/article_2.jpg" alt="" /> -->
            <span>Источник: www.sitename.ru/subdomain</span>
          </div>
        </div>

        <!--  -->
        <div class="article_full_content">
          <h3 id="pdd" class="article_full_h3">
            В Москве провели испытания светофора, который фиксирует нарушения ПДД пешеходам
          </h3>

          <!--  -->
          <p class="article_full_p">
            Неоднократно упомянуто, ключевые особенности структуры проекта освещают чрезвычайно
            интересные особенности картины в целом, однако конкретные выводы, разумеется, объявлены
            нарушающими общечеловеческие нормы этики и морали. Равным образом, реализация намеченных
            плановых заданий является качественно новой ступенью новых предложений.
          </p>

          <!--  -->
          <div class="article_full_author">
            <div class="article_full_author__img_bx">
              <!-- <img class="article_full_author__img" src="img/portfolio/photo.jpg" alt="" /> -->

              <div class="article_full_author__desc">
                <div class="article_full_author__name">Владислав Белецкий</div>
                <div class="article_full_author__post">Руководитель отдела разработки</div>
              </div>
            </div>

            <p class="article_full_p">
              Предварительные выводы неутешительны: существующая теория играет важную роль в
              формировании прогресса профессионального сообщества. Вот вам яркий пример современных
              тенденций — укрепление и развитие внутренней структуры прекрасно подходит для
              реализации вывода текущих активов.
            </p>
          </div>
        </div>

        <!--  -->
        <div class="article_full_content">
          <h3 id="dos" class="article_full_h3">
            Мастерская доспехов и центр генеалогии: 10 лучших историй про бизнес в 2023 году
          </h3>

          <!--  -->
          <p class="article_full_p">
            Неоднократно упомянуто, ключевые особенности структуры проекта освещают чрезвычайно
            интересные особенности картины в целом, однако конкретные выводы, разумеется, объявлены
            нарушающими общечеловеческие нормы этики и морали. Равным образом, реализация намеченных
            плановых заданий является качественно новой ступенью новых предложений.
          </p>

          <p class="article_full_p">
            Повседневная практика показывает, что сложившаяся структура организации прекрасно
            подходит для реализации поэтапного и последовательного развития общества. В целом,
            конечно, базовый вектор развития предоставляет широкие возможности для инновационных
            методов управления процессами.
          </p>
        </div>

        <!--  -->
        <hr class="article_full__hr" />

        <!--  -->
        <div class="rticle_full_useful">
          <button class="rticle_full_useful__btn" type="button">
            <div>
              <svg class="rticle_full_useful__hart">
                <use xlink:href="/img/sprite.svg#hart_mini"></use>
              </svg>
            </div>

            <span class="rticle_full_useful__title">Было полезно</span>

            <span class="rticle_full_useful__count">152</span>
          </button>

          <div class="article_full_share">
            <div class="article_full_save">
              <span><img src="/img/article/bookmark.png" alt="" /></span>
              <span>Сохранить</span>
            </div>

            <div class="article_full_save">
              <span><img src="/img/article/share.png" alt="" /></span>
              <span>Поделиться</span>
            </div>
          </div>
        </div>

        <!--  -->
        <div class="article_full__ditask">
          <div class="article_full__digest">
            <div class="article_full__digest__title">Еженедельный дайджест</div>

            <div class="article_full__digest__desc">
              Читайте свежие статьи и смотрите видео первыми
            </div>

            <form id="digest__form" class="article_full__digest__form">
              <input type="email" name="digest_email" placeholder="Введите email" />

              <!-- <button type="submit" class="blue_btn wrap_arrow">
                <span class="blue_btn__title">Отправить</span>

                <span class="btn__arrow">
                  <svg class="arrow">
                    <use xlink:href="/img/sprite.svg#arrow"></use>
                  </svg>
                </span>
              </button> -->

              <UiButton title="Отправить" type="submit"></UiButton>
            </form>
          </div>

          <!--  -->
          <div class="article_full__task">
            <div class="article_full__task__title">
              Есть задача? <br />
              Давайте обсудим!
            </div>

            <UiButton title="Обсудить проект"></UiButton>
          </div>
        </div>
      </div>
    </div>

    <!--  -->
    <section class="article_interesting">
      <div class="container container_blog">
        <h2 class="article_interesting__title">Ещё много интересного</h2>
      </div>

      <div class="swiper swiper_article_full">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="works__item">
              <div class="works__img">
                <a href="article.html">
                  <!-- <img src="/img/blog/blog_1.jpg" alt="" /> -->
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
  </section>
</template>

<style lang="css" scoped>
.container_blog {
  max-width: 1390px;
}

/*  */
.article_full_bx {
  color: var(--colorDark3);
  background-color: white;
  padding: 82px 0 160px 0;
}

.article_full {
  position: relative;
  max-width: 920px;
}

/*  */
.article_full_top {
  display: flex;
  align-items: center;
  column-gap: 24px;
}

.article_full_tag {
  font-weight: 400;
  font-size: 18px;
  line-height: 130%;
  color: var(--colorDark3);
  display: flex;
  align-items: center;
}

.article_full_data,
.article_full_view {
  font-weight: 500;
  font-size: 15px;
  line-height: 100%;
  color: var(--colorGray);
}

.article_full_view {
  display: flex;
  align-items: center;
  column-gap: 8px;
}

/*  */
.article_full_h1 {
  font-family: var(--fontFamily-RFDewi);
  font-weight: 700;
  font-size: 36px;
  line-height: 120%;
  letter-spacing: 0.02em;
  margin: 24px 0 32px 0;
}

/*  */
.article_full_share {
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  color: var(--colorGray);
  display: flex;
  align-items: center;
  column-gap: 24px;
  margin-bottom: 62px;
}

.article_full_save {
  display: flex;
  align-items: center;
  column-gap: 12px;
}

/*  */
.article_full_content_page {
  position: absolute;
  top: 57px;
  right: -470px;
  width: 450px;
  background-color: var(--colorBirch);
  padding: 32px;
  border-radius: 24px;
  margin-bottom: 52px;
}

.article_full_content_page__title {
  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
  margin-bottom: 20px;
}

.article_full_content_page a {
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  color: var(--colorDark3);
  text-decoration: underline;
  display: block;
}

.article_full_content_page a:not(:last-child) {
  margin-bottom: 18px;
}

/*  */
.article_full_content {
  margin-bottom: 42px;
}

.article_full_h3 {
  font-weight: 500;
  font-size: 24px;
  line-height: 130%;
  margin-bottom: 32px;

  scroll-margin-top: 10px;
}

.article_full_p {
  font-weight: 300;
  font-size: 20px;
  line-height: 140%;
}

.article_full_content .article_full_p:not(:last-of-type) {
  margin-bottom: 32px;
}

.article_full_img {
  margin: 42px 0;
}

.article_full_img img {
  border-radius: 24px;
  margin-bottom: 18px;
}

.article_full_img span {
  font-weight: 300;
  font-size: 16px;
  line-height: 140%;
  display: block;
  opacity: 0.4;
}

/*  */
.article_full_author {
  background-color: var(--colorBirch);
  border-radius: 24px;
  padding: 42px;
  margin: 42px 0;
}

.article_full_author__img_bx {
  display: flex;
  align-items: center;
  column-gap: 16px;
  margin-bottom: 32px;
}

.article_full_author__img {
  flex-shrink: 0;
  width: 68px;
  height: 68px;
  border-radius: 10px;
}

.article_full_author__name {
  font-family: var(--fontFamily-RFDewi);
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0.02em;
  margin-bottom: 16px;
}

.article_full_author__post {
  font-weight: 400;
  font-size: 15px;
  line-height: 100%;
  opacity: 0.4;
}

/*  */
.article_full__hr {
  border: 2px solid var(--colorBirch2);
}

/*  */
.rticle_full_useful {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 52px 0 82px 0;
}

.rticle_full_useful__btn {
  width: 223px;
  height: 51px;
  font-family: var(--fontFamily-NeueMachina);
  background-color: transparent;
  border: 2px solid #40b6b7;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
  padding: 0;
}

.rticle_full_useful__hart {
  width: 19px;
  height: 19px;
  margin-top: 4px;
}

.rticle_full_useful__hart {
  stroke: var(--accentColor);
  fill: transparent;
}

.rticle_full_useful__title {
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  color: var(--colorDark3);
}

.rticle_full_useful__count {
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  color: #b9b9b9;
  margin-top: 2px;
}

.rticle_full_useful .article_full_share {
  margin: 0;
}

.rticle_full_useful__btn.active {
  background-color: var(--accentColor);
}

.rticle_full_useful__btn.active .rticle_full_useful__hart {
  stroke: white;
  fill: white;
}

.rticle_full_useful__btn.active .rticle_full_useful__title {
  color: white;
}

.rticle_full_useful__btn.active .rticle_full_useful__count {
  color: white;
  opacity: 0.6;
}

/*  */
.article_full__digest {
  background-color: var(--colorBirch);
  border-radius: 24px;
  padding: 42px;
}

.article_full__digest__title {
  font-family: var(--fontFamily-RFDewi);
  font-weight: 700;
  line-height: 26px;
  font-size: 20px;
  margin-bottom: 14px;
}

.article_full__digest__desc {
  font-size: 18px;
  font-weight: 300;
  line-height: 25.2px;
  margin-bottom: 26px;
}

/*  */
.article_full__task {
  position: absolute;
  top: 396px;
  right: -470px;
  width: 450px;
  background-color: var(--colorBirch);
  background-image: url(/img/article/article_full__task_decor.svg);
  background-repeat: no-repeat;
  background-position: 100% center;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  padding: 32px;
}

.article_full__task__title {
  font-family: var(--fontFamily-RFDewi);
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
  letter-spacing: 0.02em;
  margin-bottom: 32px;
}

.article_full__task .blue_btn {
  width: 306px;
  height: 82px;
  font-size: 20px;
  border-radius: 22px;
  padding: 28px 46px;
  margin: 0;
}

.article_full__task :deep(.blue_btn .btn__arrow .arrow) {
  width: 13px;
  height: 13px;
}

/*  */
.article_full__digest__form {
  display: flex;
  align-items: center;
  gap: 20px 18px;
}

.article_full__digest__form input {
  width: 491px;
  height: 76px;
  font-family: var(--fontFamily-NeueMachina);
  border: none;
  border-radius: 14px;
  padding: 30px;
}

.article_full__digest__form input::placeholder {
  opacity: 0.4;
}
/*  */
.article_full__digest__form .blue_btn {
  flex-shrink: 0;
  width: 76px;
  height: 76px;
  border-radius: 14px;
  margin: 0;
}

.article_full__digest__form :deep(.blue_btn__title) {
  display: none;
}

.article_full__digest__form :deep(.blue_btn .btn__arrow .arrow) {
  width: 24px;
  height: 24px;
}

/*  */
.article_interesting {
  margin-top: 160px;
}

.article_interesting__title {
  font-family: var(--fontFamily-RFDewi);
  font-weight: 700;
  font-size: 42px;
  line-height: 120%;
  letter-spacing: 0.02em;
  margin-bottom: 62px;
}

/*  */
.swiper_article_full {
  padding: 0 30px 0 50%;
  margin: 0 0 0 -692px;
}

.swiper_article_full .swiper-slide {
  width: 450px;
}

.swiper_article_full .swiper-scrollbar {
  position: static;
  max-width: 1280px;
  background-color: #ededed;
  margin-top: 62px;
}

/* .swiper__dark .works__title,
.swiper__dark .works__tag_link,
.swiper__dark .works__date {
  color: white;
}

.swiper__dark .works__desc {
  color: white;
  opacity: 0.4;
} */
</style>
