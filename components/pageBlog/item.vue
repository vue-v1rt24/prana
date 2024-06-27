<script setup lang="ts">
import type { TypeTransformBlog } from '@/types/blog-page/blogHome.types';
import { dateFormat, replaceSpace } from '@/utils/utils';

const props = defineProps<{
  blog: TypeTransformBlog;
}>();

// console.log(props.blog);

const emit = defineEmits<{
  changeTag: [title: string];
}>();

// Соединение классов (для фильтрации)
const classNameFilter = computed(() =>
  props.blog.categories.reduce((acc, item) => (acc += ` ${item.name}`), ''),
);
</script>

<template>
  <div :class="['works__item mix', classNameFilter]">
    <div class="works__img">
      <NuxtLink :to="`/blog/${blog.slug}`">
        <NuxtImg :src="blog.image" loading="lazy" format="webp" />
      </NuxtLink>
    </div>

    <div class="works__text">
      <NuxtLink :to="`/blog/${blog.slug}`" class="works__title">
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
            <span>{{ tag.name }}</span>
          </span>

          <span class="works__date">{{ dateFormat(blog.date) }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
