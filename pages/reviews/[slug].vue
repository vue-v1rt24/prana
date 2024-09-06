<script setup lang="ts">
import * as FancyboxAll from '@fancyapps/ui';
import { useReviewSingle } from '~/composables/review/useReviewSingle';

import '@/assets/css/video.css';
import 'assets/css/video-fancybox.css'; // ещё используется в: components\pageBlog\VideoOutput.vue

//
const route = useRoute();

const { dataReview } = await useReviewSingle(route.params.slug);
// console.log(dataReview);

//
if (!dataReview) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Отзыв не найден',
  });
}

//
useSeoMeta({
  title: dataReview?.metaTags.metaTitle,
  description: dataReview?.metaTags.metaDescription,
});

//
const { isOpenModal } = useOutsideModal();

//
const { Fancybox } = FancyboxAll;
const videoFancyboxBx = ref<HTMLDivElement | null>(null);

//
const condition = ref({
  count: dataReview!.fullOutputOfTheWork.kolichestvoPonravivshimsyaStatya,
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
  <section class="article_full_bx">
    <div class="container container_blog">
      <div class="article_full">
        <NuxtLink to="/reviews" class="parent_page">
          <svg width="14px" height="14px" class="arrow_back">
            <use xlink:href="/public/img/sprite.svg#arrow_back"></use>
          </svg>

          <span>Вернуться назад</span>
        </NuxtLink>

        <!--  -->
        <div class="article_full_top">
          <!-- Метка категории -->
          <div class="article_full_tag">
            <div>
              <span class="works__tag_hash">#</span>
              <span>Видео</span>
            </div>
          </div>

          <!-- Дата записи -->
          <div v-if="dataReview?.date" class="article_full_data">
            {{ dateFormat(dataReview.date) }}
          </div>

          <!-- Счётчик просмотров записи -->
          <View
            v-if="dataReview?.databaseId"
            :id="dataReview.databaseId"
            :count="dataReview.fullOutputOfTheWork.fullWorkKolichestvoProsmotrov || 0"
            name-field="full_work_kolichestvo_prosmotrov"
            keyStorage="view_review"
          />

          <!-- Счётчик количества понравившимся отзыв -->
          <PageBlogViewLike />
        </div>

        <!-- Заголовок -->
        <h1 class="article_full_h1">{{ dataReview?.title }}</h1>

        <!-- Видео -->
        <div class="page_video article_full">
          <div class="video_fancybox_bx" ref="videoFancyboxBx">
            <div class="video_fancybox_parent_js">
              <a
                class="video_fancybox video_fancybox_js"
                :href="`data:text/html,${dataReview?.reviewClient.reviewSsylkaNaVideo}`"
                data-fancybox
                data-type="iframe"
              >
                <img
                  class="video_img"
                  :src="dataReview?.reviewClient.reviewIzobrazhenieDlyaVideo.node.mediaItemUrl"
                  alt=""
                />
              </a>

              <div
                v-if="dataReview?.reviewClient.reviewTekst"
                v-html="dataReview.reviewClient.reviewTekst"
                class="article_full_p desc_video wp_content"
              ></div>

              <!-- Нравится и поделиться (переносится в модальное окно видео) -->
              <PageBlogLikeInModalVideo
                :id="dataReview!.databaseId"
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
            <PageReviewsPolezno
              :id="dataReview!.databaseId"
              :count="condition.count ?? 0"
              title="Нравится"
              @current-count="condition.count = $event"
              @current-checked="condition.isChecked = $event"
            />

            <!-- Виджет "Поделиться" -->
            <WidgetShare v-if="dataReview?.title" :title="dataReview.title" />
          </div>

          <!-- Ссылка на проект -->
          <PageBlogProject
            v-if="dataReview?.fullOutputOfTheWork.zagolovok"
            :content="{ homePreview: dataReview!.homePreview, slug: dataReview!.slug }"
          />
        </div>

        <!-- Виджеты -->
        <div class="page_video article_full__ditask">
          <!-- Виджет "Еженедельный дайджест" -->
          <div class="article_full__digest">
            <div class="article_full__digest__title">Еженедельный дайджест</div>

            <div class="article_full__digest__desc">
              Читайте свежие статьи и смотрите видео первыми
            </div>

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
      </div>
    </div>
  </section>
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
