<script setup lang="ts">
import * as FancyboxAll from '@fancyapps/ui';
import type { TypeVideo } from '@/types/blog-page/blogHome.types';

import 'assets/css/video-fancybox.css'; // ещё используется в: pages\reviews\[slug].vue

//
const props = defineProps<{
  id: number;
  title: string;
  contentRedactor: string;
  content: TypeVideo;
  blogByloPolezno: number;
}>();

//
const { isOpenModal } = useOutsideModal();

//
const { Fancybox } = FancyboxAll;
const videoFancyboxBx = ref<HTMLDivElement | null>(null);

//
const condition = ref({
  count: props.blogByloPolezno,
  isChecked: false,
});

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

        const count = workFullArticleHart.querySelector<HTMLSpanElement>(
          '.work_full_article__hart_count',
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

                // Изменение количества понравившимся в модальном окне
                if (workFullArticleHart.classList.contains('active')) {
                  count.textContent = String(+count.textContent! + 1);
                } else {
                  count.textContent = String(+count.textContent! - 1);
                }
              });
            },
            close() {
              // Записываем значение из модального окна
              condition.value.count = +count.textContent!;
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
          :href="`data:text/html,${content.ssylkaNaVideo}`"
          data-fancybox
          data-type="iframe"
        >
          <img class="video_img" :src="content.izobrazhenieVideo.node.mediaItemUrl" alt="" />
        </a>

        <!-- Содержание из админки -->
        <div class="article_full_p desc_video wp_content" v-html="contentRedactor"></div>

        <!-- Нравится и поделиться (переносится в модальное окно видео) -->
        <PageBlogLikeInModalVideo
          :id="id"
          :count="condition.count ?? 0"
          :is-checked="condition.isChecked"
        />
      </div>
    </div>

    <!-- Полоса -->
    <hr class="article_full__hr" />

    <!--  -->
    <!-- Виджеты -->
    <div class="rticle_full_useful">
      <!-- Виджет "Было полезно" -->
      <PageBlogPolezno
        :id="id"
        :count="condition.count ?? 0"
        title="Нравится"
        @current-count="condition.count = $event"
        @current-checked="condition.isChecked = $event"
      />

      <!-- Виджет "Поделиться" -->
      <WidgetShare class="article_full_bottom_share" :title />
    </div>

    <!-- Ссылка на проект -->
    <PageBlogProject
      v-if="content.blogVybereteOtzyv"
      :content="content.blogVybereteOtzyv.nodes[0]"
    />
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
</style>
