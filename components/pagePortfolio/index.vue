<script setup lang="ts">
import { replaceSpace } from '@/utils/utils';
import type { TypePortfolio } from '~/types/portfolios.types';

const props = defineProps<{
  article: TypePortfolio;
}>();

//
const emit = defineEmits<{
  changeTag: [title: string];
}>();

//
const video = ref<HTMLVideoElement | null>(null);

//
const isDirect = computed(() => props.article.homePreview.vyborText);
const direct = computed(() => (isDirect.value ? 'direct' : 'video'));

const classesFilter = computed(() => {
  let cl = '';

  for (const item of props.article.portfolioCategories.nodes) {
    cl += replaceSpace(item.name) + ' ';
  }

  return cl;
});

// Запуск видео
let isLoad: any = null;

const loadVideo = () => {
  clearTimeout(isLoad);

  if (video.value!.src.includes('#')) {
    const url = video.value?.dataset.src;
    video.value!.src = url!;
    video.value!.play();
  } else {
    video.value!.play();
  }
};

const removeVideo = () => {
  isLoad = setTimeout(() => {
    video.value!.pause();
    video.value!.currentTime = 0;
    video.value!.removeEventListener('mouseover', loadVideo);
    video.value!.removeEventListener('mouseleave', removeVideo);
  }, 300);
};

const videoHover = () => {
  if (video.value) {
    video.value.addEventListener('mouseover', loadVideo);
    video.value.addEventListener('mouseleave', removeVideo);
  }
};
</script>

<template>
  <div :class="['works__item mix', classesFilter, { direct }]">
    <div class="works__img">
      <NuxtImg
        :src="article.homePreview.izobrazhenie.node.mediaItemUrl"
        loading="lazy"
        format="webp"
        width="450"
        height="450"
      />

      <!-- По наведению текст -->
      <div v-if="isDirect" class="works__item_more_detailed_bx">
        <NuxtLink :to="`/portfolio/${props.article.slug}`" class="works__item_more_detailed__link">
          <div class="works__item_more_detailed__title" v-if="article.homePreview.zagolovokHover">
            {{ article.homePreview.zagolovokHover }}
          </div>

          <ClientOnly>
            <p
              class="works__item_more_detailed__desc"
              v-if="article.homePreview.homePreviewTextTekst"
            >
              {{ article.homePreview.homePreviewTextTekst }}
            </p>
          </ClientOnly>

          <div class="works__item_more_detailed__preview">
            <span>Смотреть проект</span>

            <div class="works__item_more_detailed__preview_svg">
              <svg width="22px" height="18px" class="straight_arrow">
                <use xlink:href="/img/sprite.svg#straight_arrow"></use>
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- По наведению видео -->
      <div v-else class="works__item_more_detailed_bx" @mouseover="videoHover">
        <NuxtLink
          :to="`/portfolio/${props.article.slug}`"
          class="works__item_more_detailed__link_video"
        >
          <video
            :data-src="article.homePreview.video?.node.mediaItemUrl"
            src="#"
            loop
            muted
            class="works__item_more_detailed__video"
            ref="video"
          ></video>
        </NuxtLink>
      </div>
    </div>

    <div class="works__text">
      <NuxtLink :to="`/portfolio/${props.article.slug}`" class="works__title">
        {{ article.homePreview.zagolovok }}
      </NuxtLink>

      <div class="works__tags">
        <span
          v-for="cat in article.portfolioCategories.nodes"
          :key="cat.name"
          class="works__tag"
          @click="emit('changeTag', cat.name)"
        >
          <!-- <NuxtLink :to="{ query: { cat: encodeURI(cat.name) } }" class="works__tag_link">
            <span class="works__tag_hash">#</span>
            <span class="works__tag__title">{{ cat.name }}</span>
          </NuxtLink> -->

          <span class="works__tag_link">
            <span class="works__tag_hash">#</span>
            <span class="works__tag__title">{{ cat.name }}</span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
