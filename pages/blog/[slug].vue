<script setup lang="ts">
import { useQueryOne } from '~/composables/blog/useQueryOne';
import { useQueryNotIn } from '~/composables/blog/useQueryNotIn';

import Swiper from 'swiper';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

import 'assets/css/swiper-global.css';

import { dateFormat } from '@/utils/utils';

//
const route = useRoute();

//
const { isOpenModal } = useOutsideModal();

// Запрос на получение записи
const { article } = await useQueryOne(route.params.slug);
// console.log(article);

if (!article) {
  console.log('Такой статьи нет');
}

//
useSeoMeta({
  title: article?.metaTitle,
  description: article?.metaDesc,
});

// Запрос на получение всех записей, кроме текущей (для вывода в слайдере)
const { blogsAllNotIn } = await useQueryNotIn(article!.id);

//
onMounted(() => {
  // Вывод других статей
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
          <!-- Метка категории -->
          <div class="article_full_tag">
            <div v-for="cat in article?.categories" :key="cat.name">
              <span class="works__tag_hash">#</span>
              <span>{{ cat.name }}</span>
            </div>
          </div>

          <!-- Дата записи -->
          <div v-if="article?.date" class="article_full_data">{{ dateFormat(article.date) }}</div>

          <!-- Счётчик просмотров записи -->
          <PageBlogView v-if="article?.id" :id="article.id" :count="article?.countView || 0" />
        </div>

        <!-- Заголовок -->
        <h1 class="article_full_h1">{{ article?.title }}</h1>

        <!-- Поделиться -->
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

        <!-- Виджет "Содержание" -->
        <PageBlogWidgetContent />

        <!-- Содержание из админки -->
        <div class="article_full_content" v-html="article?.content"></div>

        <!-- Полоса -->
        <hr class="article_full__hr" />

        <!-- Виджеты -->
        <div class="rticle_full_useful">
          <!-- Виджет "Было полезно" -->
          <PageBlogPolezno
            v-if="article?.id"
            :id="article.id"
            :count="article.blogByloPolezno || 0"
          />

          <!-- Виджет "Поделиться" -->
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

        <!-- Виджет "Еженедельный дайджест" -->
        <div class="article_full__ditask">
          <div class="article_full__digest">
            <div class="article_full__digest__title">Еженедельный дайджест</div>

            <div class="article_full__digest__desc">
              Читайте свежие статьи и смотрите видео первыми
            </div>

            <form id="digest__form" class="article_full__digest__form">
              <input type="email" name="digest_email" placeholder="Введите email" />
              <UiButton title="Отправить" type="submit"></UiButton>
            </form>
          </div>

          <!--  -->
          <div class="article_full__task">
            <div class="article_full__task__title">
              Есть задача? <br />
              Давайте обсудим!
            </div>

            <UiButton title="Обсудить проект" @click-btn="isOpenModal().value = true"></UiButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Другие статьи -->
    <section class="article_interesting">
      <div class="container container_blog">
        <h2 class="article_interesting__title">Ещё много интересного</h2>
      </div>

      <div class="swiper swiper_article_full">
        <div class="swiper-wrapper">
          <PageBlogOtherArticles v-for="blog in blogsAllNotIn" :key="blog.id" :blog="blog" />
        </div>

        <div class="swiper-scrollbar"></div>
      </div>
    </section>
  </section>
</template>

<style lang="css">
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
  column-gap: 10px;
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
.article_full_content {
  margin-bottom: 42px;
}

/*  */
.article_full_content h2 {
  font-weight: 500;
  font-size: 24px;
  line-height: 130%;
  margin-bottom: 32px;
  scroll-margin-top: 10px;
}

/*  */
.article_full_content p {
  font-weight: 300;
  font-size: 20px;
  line-height: 140%;
}

.article_full_content p:has(+ p) {
  margin-bottom: 32px;
}

/*  */
.wp-block-media-text {
  margin: 42px 0;
}

.wp-block-media-text img {
  border-radius: 24px;
  margin-bottom: 18px;
}

.wp-block-media-text__content p {
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

.article_full_author__img_bx img {
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

.article_full__task .blue_btn .btn__arrow .arrow {
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

.article_full__digest__form .blue_btn__title {
  display: none;
}

.article_full__digest__form .blue_btn .btn__arrow .arrow {
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
