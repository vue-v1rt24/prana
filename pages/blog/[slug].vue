<script setup lang="ts">
import { useQueryOne } from '~/composables/blog/useQueryOne';
import { dateFormat } from '@/utils/utils';

import '@/assets/css/video.css';

//
const route = useRoute();

// Управление модальным окно формы
const { isOpenModal } = useOutsideModal();

// Запрос на получение записи
const { article } = await useQueryOne(route.params.slug);
// console.log(article);

//
if (!article) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Статья не найдена',
  });
}

//
useSeoMeta({
  title: article?.metaTitle,
  description: article?.metaDesc,
});

// Если статья категории "Видео"
const catVideo = computed(() => article?.categories[0].name === 'Видео');
</script>

<template>
  <section class="article_full_bx">
    <div class="container container_blog">
      <div class="content_bx">
        <!-- Содержание -->
        <div class="article_full">
          <NuxtLink to="/blog" class="parent_page">
            <svg width="14px" height="14px" class="arrow_back">
              <use xlink:href="/public/img/sprite.svg#arrow_back"></use>
            </svg>

            <span>Вернуться назад</span>
          </NuxtLink>

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
            <View
              v-if="article?.id"
              :id="article.id"
              :count="article?.countView || 0"
              name-field="blog_kolichestvo_prosmotrov_stati"
              keyStorage="view"
            />

            <!-- Счётчик количества понравившимся статья -->
            <PageBlogViewLike />
          </div>

          <!-- Заголовок -->
          <h1 class="article_full_h1">{{ article?.title }}</h1>

          <!-- Вывод содержания если категория "Статьи" -->
          <PageBlogArticleOutput
            v-if="!catVideo && article?.id"
            :id="article.id"
            :title="article.title"
            :content="article.content"
            :blog-bylo-polezno="article.blogByloPolezno || 0"
          />

          <!-- Вывод содержания если категория "Видео" -->
          <PageBlogVideoOutput
            v-if="catVideo && article?.id"
            :id="article.id"
            :title="article.title"
            :content-redactor="article.content"
            :content="article.contentVideo"
            :blog-bylo-polezno="article.blogByloPolezno || 0"
          />
        </div>

        <!-- Виджеты -->
        <div class="content_article__widgets">
          <!-- Виджет "Содержание" в 1920px -->
          <div class="widgetContent1920">
            <PageBlogWidgetContent />
          </div>

          <!-- Виджет "Обсудить проект" -->
          <div class="discuss_roject_1920 article_full__task">
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
    <div class="article_interesting">
      <div class="container container_blog">
        <h2 class="article_interesting__title">Ещё много интересного</h2>
      </div>

      <BlogSlider :id="article?.id" />
    </div>
  </section>
</template>

<style lang="css" scoped>
.content_bx {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  /*  */
  @media (max-width: 1500px) {
    display: contents;
  }
}

/*  */
.content_article__widgets {
  position: sticky;
  top: 20px;
  margin-top: 100px;

  /*  */
  @media (max-width: 1500px) {
    display: none;
  }
}

/*  */
.discuss_roject_1920.article_full__task {
  position: static;
}
</style>
