<script setup lang="ts">
import type { TypeVideo } from '@/types/blog-page/blogHome.types';

//
const props = defineProps<{
  id: number;
  content: TypeVideo;
  blogByloPolezno: number;
}>();

// Для модального окна с формой
const { isOpenModal } = useOutsideModal();

//
const pageVideoBx = ref<HTMLDivElement | null>(null);
const videoIframe = ref<HTMLIFrameElement | null>(null);

// https://youtu.be/Wjt6yyNDWmc?si=nO60zK5na0xhNXpr   -стандартное видео
// https://www.youtube.com/embed/Wjt6yyNDWmc?si=WLc8FTVSQpY0-oai   -видео для iframe
const loadIframeVideo = () => {
  /* videoIframe.value && (videoIframe.value.src = props.content.ssylkaNaVideo);
  videoIframe.value && videoIframe.value.click(); */

  const iframe = document.createElement('iframe');
  iframe.src = props.content.ssylkaNaVideo;
  iframe.setAttribute('width', '560');
  iframe.setAttribute('height', '315');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute(
    'allow',
    'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
  );

  pageVideoBx.value!.querySelector('.video_fancybox')?.append(iframe);

  //
  pageVideoBx.value?.classList.add('load_iframe');
};
</script>

<template>
  <div class="page_video article_full" ref="pageVideoBx">
    <!-- Видео -->
    <div class="video_bx">
      <!-- <a
        class="video_fancybox"
        :href="content.ssylkaNaVideo"
        data-fancybox
        data-width="1280"
        data-height="718"
      >
        <img class="video_img" :src="content.izobrazhenieVideo.node.mediaItemUrl" alt="" />
      </a> -->

      <div class="video_fancybox" @click="loadIframeVideo">
        <!-- <iframe
          title="Видео отзыв"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          class="video_fancybox__iframe"
          ref="videoIframe"
        ></iframe> -->

        <img class="video_img" :src="content.izobrazhenieVideo.node.mediaItemUrl" alt="" />
      </div>

      <p class="article_full_p desc_video">{{ content.opisanieVideo }}</p>
    </div>

    <!-- Полоса -->
    <hr class="article_full__hr" />

    <!--  -->
    <!-- Виджеты -->
    <div class="rticle_full_useful">
      <!-- Виджет "Было полезно" -->
      <PageBlogPolezno :id="id" :count="blogByloPolezno" title="Нравится" />

      <!-- Виджет "Поделиться" -->
      <PageBlogWidgetShare />
    </div>

    <!-- Случайный проект -->
    <PageBlogRandomProject />
  </div>

  <!-- Виджеты -->
  <div class="page_video article_full__ditask">
    <!-- Виджет "Еженедельный дайджест" -->
    <div class="article_full__digest">
      <div class="article_full__digest__title">Еженедельный дайджест</div>

      <div class="article_full__digest__desc">Читайте свежие статьи и смотрите видео первыми</div>

      <form id="digest__form" class="article_full__digest__form">
        <input type="email" name="digest_email" placeholder="Введите email" />

        <UiButton title="Отправить" type="submit"></UiButton>
      </form>
    </div>

    <!-- Виджет "Обсудить проект" -->
    <div class="article_full__task">
      <div class="article_full__task__title">
        Есть задача? <br />
        Давайте обсудим!
      </div>

      <UiButton title="Обсудить проект" @click-btn="isOpenModal().value = true"></UiButton>
    </div>
  </div>
</template>

<style lang="css" scoped>
.page_video .rticle_full_useful__btn {
  width: 183px;
}

.page_video.article_full__ditask {
  width: 154%;
  display: flex;
  gap: 52px 40px;

  @media (max-width: 1500px) {
    width: 100%;
  }
}

.page_video .article_full__digest {
  width: 920px;

  @media (max-width: 830px) {
    width: 100%;
  }
}

.page_video .article_full__task {
  position: static;
}

/*  */
.video_fancybox {
  position: relative;
  width: 920px;
  height: 516px;
  aspect-ratio: 16 / 9;
  cursor: pointer;
}

.video_fancybox::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 92px;
  height: 92px;
  background-image: url(/img/video/videoBtn.svg);
  background-size: cover;
  z-index: 3;
}

.load_iframe .video_fancybox::before,
.load_iframe .video_img {
  display: none;
}

@media (max-width: 830px) {
  .video_fancybox::before {
    width: 75px;
    height: 75px;
  }
}

@media (max-width: 576px) {
  .video_fancybox::before {
    width: 35px;
    height: 35px;
  }
}

.video_fancybox__iframe {
  position: absolute;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 18px;
  z-index: 1;
}

.video_img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
  border-radius: 18px;
}

.desc_video {
  margin: 41px 0 52px 0;

  @media (max-width: 576px) {
    margin: 24px 0 32px 0;
  }
}

.article_full_p {
  font-weight: 300;
  font-size: 20px;
  line-height: 140%;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 576px) {
    font-size: 14px;
  }
}
</style>

<style>
.video_fancybox_modal {
  margin: 0 20px;
}

.video_fancybox_modal .fancybox__content {
  background: transparent;
}

.video_fancybox_modal .fancybox__backdrop {
  backdrop-filter: blur(16px);
  background: rgba(6, 14, 27, 0.8);
}

.video_fancybox_modal .fancybox__iframe {
  border-radius: 18px;
}
</style>
