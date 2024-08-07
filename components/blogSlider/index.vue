<script setup lang="ts">
/* 
Компонент выводит все статьи блога в слайдере.
Если передать id, то эта запись будет исключена из выборки.
Пример можно посмотреть на странице полной записи блога.
*/

import { useQueryNotIn } from '~/composables/blog/useQueryNotIn';

import Swiper from 'swiper';
import { Scrollbar, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

import 'assets/css/swiper-global.css';

//
const props = withDefaults(
  defineProps<{
    id?: number;
    dark?: boolean;
  }>(),
  {
    id: 0,
  },
);

// Запрос на получение всех записей, кроме текущей (для вывода в слайдере)
const { blogsAllNotIn } = await useQueryNotIn(props.id);

//
onMounted(() => {
  // Вывод других статей
  const swiperArticleFull = document.querySelector<HTMLDivElement>('.swiper_article_full')!;

  if (swiperArticleFull) {
    new Swiper('.swiper_article_full', {
      slidesPerView: 'auto',
      freeMode: true,
      modules: [Scrollbar, FreeMode],
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
  <div :class="['swiper swiper_article_full', { swiper__dark: dark }]">
    <div class="swiper-wrapper">
      <BlogSliderItem v-for="blog in blogsAllNotIn" :key="blog.id" :blog="blog" />
    </div>

    <div class="swiper-scrollbar"></div>
  </div>
</template>

<style lang="css" scoped>
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

/*  */
.swiper__dark .swiper-scrollbar {
  max-width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
}

/* ============= Медиа запросы */

@media (max-width: 1365px) {
  .swiper_article_full {
    padding: 0 39px;
    margin: 0 0 0 0;
  }
}

@media (max-width: 768px) {
  .swiper_article_full .swiper-slide {
    width: 330px;
  }

  .swiper_article_full .swiper-scrollbar {
    margin-top: 30px;
  }
}

@media (max-width: 576px) {
  .swiper_article_full {
    padding: 0 20px;
  }

  .swiper_article_full .swiper-slide {
    width: 320px;
  }
}
</style>
