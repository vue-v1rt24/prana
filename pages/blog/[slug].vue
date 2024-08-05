<script setup lang="ts">
import { useQueryOne } from '~/composables/blog/useQueryOne';
import { dateFormat } from '@/utils/utils';

import '@/assets/css/video.css';

//
const route = useRoute();

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

// Если статья категории "Видео"
const catVideo = computed(() => article?.categories[0].name === 'Видео');
</script>

<template>
  <section class="article_full_bx">
    <div class="container container_blog">
      <div class="article_full">
        <NuxtLink to="/blog" class="parent_page">Вернуться назад</NuxtLink>

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
          :content="article.contentVideo"
          :blog-bylo-polezno="article.blogByloPolezno || 0"
        />
      </div>
    </div>

    <!-- Другие статьи -->
    <section v-if="!catVideo" class="article_interesting">
      <div class="container container_blog">
        <h2 class="article_interesting__title">Ещё много интересного</h2>
      </div>

      <BlogSlider :id="article?.id" />
    </section>
  </section>
</template>
