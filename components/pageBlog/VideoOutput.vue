<script setup lang="ts">
import * as FancyboxAll from '@fancyapps/ui';

//
defineProps<{
  id: number;
  content: string;
  blogByloPolezno: number;
}>();

//
const { isOpenModal } = useOutsideModal();

//
const { Fancybox } = FancyboxAll;
const videoFancyboxBx = ref<HTMLDivElement | null>(null);

//
onMounted(() => {
  // Модальное окно видео
  if (videoFancyboxBx.value) {
    videoFancyboxBx.value.addEventListener('click', (evt) => {
      const target = evt.target as HTMLDivElement;
      const parent = target.closest('.video_fancybox_parent_js');

      if (parent) {
        const videoHart = parent.querySelector<HTMLDivElement>('.video_hart')!;

        const workFullArticleHartHtml = videoHart.querySelector<HTMLDivElement>(
          '.work_full_article__hart',
        )!;

        const cloneVideoHart = videoHart.cloneNode(true) as HTMLDivElement;

        const workFullArticleHart = cloneVideoHart.querySelector<HTMLDivElement>(
          '.work_full_article__hart',
        )!;

        Fancybox.bind('.video_fancybox_js', {
          mainClass: 'video_fancybox_modal',
          closeButton: false,
          on: {
            done() {
              // Клонируем и вставляем в модальное окно видео всё содержимое из компонента: LikeInModalVideo.vue
              const videoFancyboxModal =
                document.querySelector<HTMLDivElement>('.video_fancybox_modal')!;

              const fancyboxContent =
                videoFancyboxModal.querySelector<HTMLDivElement>('.fancybox__content')!;

              fancyboxContent.append(cloneVideoHart);

              // Кликаем по "Нравится" в модальном окне
              workFullArticleHart.addEventListener('click', () => {
                workFullArticleHart.classList.toggle('active');
                workFullArticleHartHtml.classList.toggle('active');

                // Кликаем по кнопке "Нравится". Она находится в компоненте: Polezno.vue
                document.querySelector<HTMLDivElement>('.rticle_full_useful__btn')?.click();
              });
            },
          },
        });
      }
    });
  }
});
</script>

<template>
  <div class="page_video article_full">
    <!-- Видео -->
    <div class="video_fancybox_bx" ref="videoFancyboxBx">
      <div class="video_fancybox_parent_js">
        <a
          class="video_fancybox video_fancybox_js"
          href="https://www.youtube.com/watch?v=z2X2HaTvkl8"
          data-fancybox
          data-width="1280"
          data-height="718"
        >
          <img class="video_img" src="/img/video/video.jpg" alt="" />
        </a>

        <p class="article_full_p desc_video">
          Повседневная практика показывает, что сложившаяся структура организации прекрасно подходит
          для реализации поэтапного и последовательного развития общества. В целом, конечно, базовый
          вектор развития предоставляет широкие возможности для инновационных методов управления
          процессами.
        </p>

        <!-- Нравится и поделиться (переносится в модальное окно видео) -->
        <PageBlogLikeInModalVideo :id="id" :count="blogByloPolezno" />
      </div>
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
    <div class="separate_project">
      <div class="separate_project__img">
        <img src="/img/video/2.jpg" alt="" />
      </div>

      <UiButton
        title="Смотреть проект"
        color-class="btn_transparent"
        border-radius="22px"
      ></UiButton>
    </div>
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

.video_img {
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

/*  */
.separate_project {
  position: absolute;
  top: 0px;
  right: -310px;
  width: 290px;

  @media (max-width: 1500px) {
    display: none;
  }

  @media (max-width: 830px) {
    position: static;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 31px;
    margin-bottom: 52px;
  }

  @media (max-width: 700px) {
    flex-direction: column;
  }

  @media (max-width: 576px) {
    margin-top: 82px;
  }
}

.separate_project__img {
  position: relative;
  width: 290px;
  height: 290px;

  @media (max-width: 830px) {
    flex: 1.05;
    width: 330px;
    height: 330px;
  }

  @media (max-width: 700px) {
    flex: none;
  }
}

.separate_project__img img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 18px;
}

.separate_project .blue_btn {
  width: 100%;
  height: 82px;
  font-size: 20px;
  margin-top: 18px;

  @media (max-width: 830px) {
    flex: 1;
    width: 330px;
    height: 330px;
    margin-top: 0;
  }

  @media (max-width: 700px) {
    flex: none;
    height: 82px;
    margin-top: 20px;
  }
}
</style>

<style>
.separate_project .blue_btn .btn__arrow .arrow {
  width: 13px;
  height: 13px;
}

/*  */
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
