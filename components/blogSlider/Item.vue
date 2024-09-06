<script setup lang="ts">
import visibleHiddenText from '@/directives/visibleHiddenText';

defineProps<{
  blog: any;
}>();

// Директива для показа скрытого текста заголовка
const vTextAnimate = visibleHiddenText;
</script>

<template>
  <div class="swiper-slide">
    <div class="works__item">
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
          <span v-for="tag in blog.categories" :key="tag.name" class="works__tag">
            <NuxtLink
              :to="{
                path: '/blog',
                query: { cat: encodeURI(tag.name) },
              }"
              class="works__tag_link"
            >
              <span class="works__tag_hash">#</span>
              <span class="works__tag__title">{{ tag.name }}</span>
            </NuxtLink>

            <span class="works__date">{{ dateFormat(blog.date) }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.works__img {
  aspect-ratio: 1 / 0.57;
}

/*  */

@media (max-width: 768px) {
  .works__desc {
    height: 72px;
  }
}
</style>
