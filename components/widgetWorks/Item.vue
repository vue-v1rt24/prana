<script setup lang="ts">
import visibleHiddenText from '@/directives/visibleHiddenText';
import type { TypeWork } from '~/types/widgetWorks.types';

//
const props = defineProps<{
  item: TypeWork;
}>();

//
const emit = defineEmits<{
  routePath: [link: string];
}>();

// Директива для показа скрытого текста заголовка
const vTextAnimate = visibleHiddenText;

//
const video = ref<HTMLVideoElement | null>(null);

//
const isDirect = computed(() => props.item.homePreview.vyborText);

const direct = computed(() => (isDirect.value ? 'direct' : 'video'));

const classesFilter = computed(() => {
  let cl = '';

  for (const item of props.item.portfolioCategories.nodes) {
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

// Открытие модального окна с работой
const sendWork = (link: string) => {
  emit('routePath', link);
};
</script>

<template>
  <div :class="['works__item', 'mix', classesFilter, direct]">
    <div class="works__img">
      <NuxtImg
        :src="item.homePreview.izobrazhenie?.node.mediaItemUrl"
        loading="lazy"
        format="webp"
        width="450"
        height="450"
      />

      <!-- По наведению текст -->
      <div v-if="isDirect" class="works__item_more_detailed_bx">
        <a
          @click.prevent="sendWork(item.slug)"
          :href="item.slug"
          class="works__item_more_detailed__link"
        >
          <div class="works__item_more_detailed__title" v-if="item.homePreview.zagolovokHover">
            {{ item.homePreview.zagolovokHover }}
          </div>

          <ClientOnly>
            <p class="works__item_more_detailed__desc" v-if="item.homePreview.homePreviewTextTekst">
              {{ item.homePreview.homePreviewTextTekst }}
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
        </a>
      </div>

      <!-- По наведению видео -->
      <div class="works__item_more_detailed_bx" v-else @mouseover="videoHover">
        <a
          @click.prevent="sendWork(item.slug)"
          :href="item.slug"
          class="works__item_more_detailed__link_video"
        >
          <video
            :data-src="item.homePreview.video?.node.mediaItemUrl"
            src="#"
            loop
            muted
            class="works__item_more_detailed__video"
            ref="video"
          ></video>
        </a>
      </div>
    </div>

    <div class="works__text">
      <NuxtLink :to="item.slug" class="works__title" v-text-animate>
        {{ item.homePreview.zagolovok }}
      </NuxtLink>

      <!-- Теги -->
      <div class="works__tags">
        <span v-for="cat in item.portfolioCategories?.nodes" :key="cat.name" class="works__tag">
          <NuxtLink
            :to="{ path: '/portfolio', query: { cat: encodeURI(cat.name) } }"
            class="works__tag_link"
          >
            <span class="works__tag_hash">#</span>
            <span class="works__tag__title">{{ cat.name }}</span>
          </NuxtLink>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
