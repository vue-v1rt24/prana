<script setup lang="ts">
import visibleHiddenText from '@/directives/visibleHiddenText';
import type { TypeTransformBlog } from '@/types/blog-page/blogHome.types';
import { dateFormat, replaceSpace } from '@/utils/utils';

const props = defineProps<{
  blog: TypeTransformBlog;
}>();

const emit = defineEmits<{
  changeTag: [title: string];
}>();

// Директива для показа скрытого текста заголовка
const vTextAnimate = visibleHiddenText;

// Соединение классов (для фильтрации)
const classNameFilter = computed(() =>
  props.blog.categories.reduce((acc, item) => (acc += ` ${item.name}`), ''),
);
</script>

<template>
  <div :class="['works__item mix', classNameFilter]">
    <div class="works__img">
      <NuxtLink :to="`/blog/${blog.slug}`">
        <NuxtImg :src="blog.image" width="449" height="253" loading="lazy" format="webp" />
      </NuxtLink>
    </div>

    <div class="works__text">
      <NuxtLink :to="`/blog/${blog.slug}`" class="works__title" v-text-animate>
        {{ blog.title }}
      </NuxtLink>

      <p class="works__desc three_dots_line_3">
        {{ blog.desc }}
      </p>

      <!-- Теги -->
      <div class="works__tags">
        <span
          v-for="tag in blog.categories"
          :key="tag.name"
          class="works__tag"
          @click="emit('changeTag', tag.name)"
        >
          <span class="works__tag_link">
            <span class="works__tag_hash">#</span>
            <span class="works__tag_name">{{ tag.name }}</span>
          </span>

          <span class="works__date">{{ dateFormat(blog.date) }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.works__img {
  aspect-ratio: 1 / 0.56;
}
</style>
