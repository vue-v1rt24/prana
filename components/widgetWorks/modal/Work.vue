<script setup lang="ts">
// Модальное окно полной статьи

import * as FancyboxAll from '@fancyapps/ui';
import type { TypeWork } from '~/types/widgetWorks.types';

const { Fancybox } = FancyboxAll;

//
const router = useRouter();
const viewport = useViewport();

// Управление модальным окно формы
const { isOpenModal } = useOutsideModal();

//
const lazyLoad = ref<HTMLImageElement[]>([]);

//
const props = defineProps<{
  open: boolean;
  dataWork: TypeWork;
}>();

//
const emit = defineEmits<{
  closeWork: [];
  closeModal: [];
}>();

//
const closeModal = () => {
  emit('closeModal');
};

//
onUnmounted(() => {
  Fancybox.destroy();
});

//
const loadImgScroll = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const callback = function (entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach((item) => {
      if (item.isIntersecting) {
        const target = item.target as HTMLImageElement;
        target.src = target.dataset.src!;
        observer.unobserve(item.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback);

  for (const img of lazyLoad.value) {
    observer.observe(img);
  }
};

watchEffect(() => {
  if (props.open && document) {
    Fancybox.show([{ src: '#work_full_article', type: 'inline' }], {
      closeButton: false,
      autoFocus: false,
      dragToClose: false,
      on: {
        done: () => {
          loadImgScroll();
        },
        close: () => {
          emit('closeWork');
        },
      },
    });
  }
});

// Клик по кнопке "Смотреть отзыв"
const viewReview = () => {
  if (props.dataWork.review.reviewZagruziteFajl) {
    Fancybox.show([
      {
        src: props.dataWork.review.reviewZagruziteFajl.node.mediaItemUrl,
        type: 'iframe',
        preload: false,
      },
    ]);
  } else if (props.dataWork.review.reviewSsylkaNaVideo) {
    router.push(`/reviews/${props.dataWork.slug}`);
  }
};
</script>

<template>
  <div id="work_full_article" class="work_full_article">
    <div class="work_full_article__top">
      <div class="work_full_article__left">
        <!-- Заголовок -->
        <div class="work_full_article__title">{{ dataWork.zagolovok }}</div>

        <!-- Описание -->
        <p class="work_full_article__desc">
          {{ dataWork.fullWorkOpisanieVypolnennojRaboty }}
        </p>

        <!-- Теги -->
        <div class="works__tags">
          <span
            v-for="hash in dataWork.categories"
            :key="hash.name"
            @click="closeModal"
            class="works__tag"
          >
            <NuxtLink
              :to="{ path: '/portfolio', query: { cat: encodeURI(hash.name) } }"
              class="works__tag_link"
            >
              <span class="works__tag_hash">#</span>
              <span class="works__tag_name">{{ hash.name }}</span>
            </NuxtLink>
          </span>
        </div>
      </div>

      <div class="work_full_article__right">
        <div class="work_full_article__year">{{ dataWork?.godSdachi }}</div>

        <a
          v-if="dataWork.fullWorkSajtVypolnennojRaboty"
          class="work_full_article__site"
          :href="dataWork.fullWorkSajtVypolnennojRaboty"
        >
          {{
            dataWork.fullWorkSajtVypolnennojRaboty.substring(
              dataWork.fullWorkSajtVypolnennojRaboty.indexOf('/') + 2,
            )
          }}
        </a>
      </div>
    </div>

    <!-- Содержание -->
    <div class="work_full_article__content">
      <!-- Картинки в ПК -->
      <div v-if="viewport.isGreaterOrEquals('screen768')" class="work_full_article__content_pc">
        <div
          v-for="(photo, idx) in dataWork.fullWorkFotoVypolnennojRabotyPc"
          :key="photo.fullWorkFotoVypolnennojRabotyPcIzobrazhenie.node.mediaItemUrl + idx"
          class="lazyLoad"
        >
          <img class="preloader" src="/img/preloader.gif" alt="" />

          <img
            ref="lazyLoad"
            :data-src="photo.fullWorkFotoVypolnennojRabotyPcIzobrazhenie.node.mediaItemUrl"
            src="#"
            alt=""
          />
        </div>
      </div>

      <!-- В моб. версии -->
      <div v-else class="work_full_article__content_mob">
        <p class="work_full_article__content_mob_desc">
          {{ dataWork.fullWorkDopDescMob }}
        </p>

        <!-- Картинки в МОБ -->
        <div class="work_full_article__content_mob_imgs">
          <div
            v-for="(photo, idx) in dataWork.fullWorkFotoVypolnennojRabotyVMob"
            :key="photo.fullWorkFotoVypolnennojRabotyVMobIzobrazhenie.node.mediaItemUrl + idx"
            class="lazyLoad"
          >
            <img class="preloader" src="/img/preloader.gif" alt="" />

            <img
              ref="lazyLoad"
              :data-src="photo.fullWorkFotoVypolnennojRabotyVMobIzobrazhenie.node.mediaItemUrl"
              src="#"
              alt=""
            />
          </div>
        </div>

        <p class="work_full_article__content_mob_desc">
          {{ dataWork?.dopolnitelnoeOpisanieVypolnennojRabotyDlyaMobilnogo }}
        </p>
      </div>
    </div>

    <!-- Команда проекта -->
    <div class="work_full_article__roject_team work_roject_team">
      <div class="work_roject_team___title">Команда проекта</div>

      <div class="work_roject_team__list">
        <div
          v-for="(item, idx) in dataWork.fullWorkKomandaProekta"
          :key="item.fullWorkKomandaProektaImyaFamiliya + idx"
          class="work_roject_team__list_data"
        >
          <div class="work_roject_team__person">
            <NuxtImg :src="item.fullWorkKomandaProektaFoto.node.mediaItemUrl" />
          </div>

          <div>
            <span class="work_roject_team__name">
              {{ item.fullWorkKomandaProektaImyaFamiliya }}
            </span>
            <span class="work_roject_team__post">
              {{ item.fullWorkKomandaProektaDolzhnost }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Кнопки -->
    <div class="work_full_article__btns">
      <UiButton
        v-if="dataWork.review.reviewNazvanieKompanii"
        class="work__btn"
        title="Смотреть отзыв"
        color-class="btn_transparent"
        @click-btn="viewReview"
      />

      <UiButton
        class="work__btn"
        title="Обсудить проект"
        color-class="btn_transparent"
        @click="isOpenModal().value = true"
      />
    </div>

    <!-- Нравится и поделиться -->
    <ClientOnly>
      <PageHomeWorksModalLiked
        :id="dataWork.id"
        :slug="dataWork.slug"
        :countLike="dataWork.kolichestvoPonravivshimsyaStatya || 0"
      />
    </ClientOnly>

    <!--  -->
    <button type="button" class="close_modal" data-fancybox-close>
      <img src="/img/close.svg" alt="" />
    </button>
  </div>
</template>

<style lang="css">
.work_full_article {
  display: none;
  max-width: 1280px;
  width: 100%;
  border-radius: 32px;
  padding: 0;
  margin: 160px 39px;
}

/*  */
.work_full_article__top {
  display: flex;
  justify-content: space-between;
  padding: 80px 54px;
}

.work_full_article__title {
  font-family: var(--fontFamily-Unbounded);
  font-size: 32px;
  line-height: 120%;
  letter-spacing: 0.02em;
  color: var(--colorDark3);
}

.work_full_article__desc {
  font-weight: 400;
  font-size: 26px;
  line-height: 130%;
  color: var(--colorGray);
  margin: 26px 0 42px 0;
}

.work_full_article__left .works__tags {
  max-width: 530px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
}

.work_full_article__right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.work_full_article__year {
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  color: var(--colorGray);
}

.work_full_article__site {
  font-weight: 400;
  font-size: 18px;
  line-height: 130%;
  text-decoration: underline;
  text-decoration-skip-ink: none;
  color: var(--colorDark3);
}

/*  */
.lazyLoad {
  position: relative;
}

.lazyLoad:after {
  content: '';
  display: block;
  height: 0;
  padding-bottom: 56.25%;
}

.lazyLoad img[src='#'] {
  opacity: 0;
}

.lazyLoad .preloader {
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 64px;
  height: 64px;
  z-index: 1;
}

.lazyLoad img {
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 2;
  object-fit: contain;
}

/*  */
.work_full_article__content_mob {
  display: none;
}

/*  */
.work_roject_team {
  color: var(--colorDark3);
  padding: 82px 54px 0 54px;
}

.work_roject_team___title {
  font-weight: 500;
  font-size: 24px;
  line-height: 100%;
}

.work_roject_team__list {
  display: flex;
  flex-wrap: wrap;
  gap: 36px 58px;
  margin: 42px 0 62px 0;
}

.work_roject_team__list_data {
  width: 352px;
  display: flex;
  align-items: center;
  column-gap: 16px;
}

.work_roject_team__person {
  width: 68px;
  flex-shrink: 0;
}

.work_roject_team__person img {
  width: 100%;
  border-radius: 10px;
}

.work_roject_team__name {
  font-family: var(--fontFamily-Unbounded);
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0.02em;

  display: block;
  margin-bottom: 16px;
}

.work_roject_team__post {
  font-weight: 400;
  font-size: 15px;
  line-height: 100%;
  color: var(--colorGray);
}

/*  */
.work_full_article__btns {
  display: flex;
  justify-content: center;
  gap: 24px 30px;
  padding: 0 54px 134px 54px;
}

.work_full_article__btns .blue_btn {
  width: 100%;
  margin: 0;
}

/*  */
.work_full_article .close_modal {
  top: -130px;
  right: -270px;
}

/*  */
.work__btn {
  height: 103px;
  border-radius: 28px;
}

/*  */
@media (max-width: 1900px) {
  .work_full_article .close_modal {
    top: -75px;
    right: 0;
  }
}

@media (max-width: 1199px) {
  .work_full_article {
    margin: 110px 39px 183px 39px;
  }

  .work_full_article__top {
    flex-direction: column-reverse;
    row-gap: 26px;
  }

  .work_full_article__left,
  .work_full_article__left .works__tags {
    max-width: 100%;
  }

  .work_full_article__right {
    flex-direction: row-reverse;
    align-items: center;
  }

  .work_full_article__btns {
    flex-direction: column;
    align-items: center;
    padding: 0 52px 52px 52px;
  }
}

@media (max-width: 768px) {
  .work_full_article__top {
    padding: 52px 52px 42px 52px;
  }

  .work_full_article {
    max-width: 100%;
  }

  .work_full_article__title {
    font-size: 24px;
  }

  .work_full_article__content_pc {
    display: none;
  }

  .work_full_article__content_mob {
    display: block;
    border-top: 1px solid #f8f8f8;
    border-bottom: 1px solid #f8f8f8;
    padding: 42px 0;
    margin: 0 52px;
  }

  .work_full_article__content_mob_desc {
    font-weight: 300;
    font-size: 16px;
    line-height: 140%;
    color: var(--colorDark3);
  }

  .work_full_article__content_mob_imgs {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    margin: 42px 0;
  }

  .work_full_article__content_mob_imgs img {
    border-radius: 24px;
  }

  .work_full_article__content_mob_imgs .lazyLoad:after {
    padding-bottom: 100.25%;
  }

  .work_full_article__desc {
    font-size: 20px;
    margin: 18px 0 32px 0;
  }

  .work_roject_team__list {
    gap: 24px 58px;
    margin: 42px 0 52px 0;
  }

  .work_roject_team {
    padding: 42px 52px 0 52px;
  }

  /*  */
  .lazyLoad .preloader {
    top: 40px;
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 576px) {
  .work_full_article {
    border-radius: 18px;
    margin: 80px 0 172px 0;
  }

  .work_full_article__top {
    row-gap: 24px;
    padding: 24px 24px 32px 24px;
  }

  .work_full_article__title {
    font-size: 18px;
  }

  .work_full_article__site,
  .work_full_article__year {
    font-size: 13px;
  }

  .work_full_article__desc {
    font-size: 15px;
    margin: 14px 0 24px 0;
  }

  .works__tag_link {
    font-size: 14px;
  }

  .work_full_article__content_mob {
    padding: 32px 0;
    margin: 0 24px;
  }

  .work_full_article__content_mob_desc {
    font-size: 14px;
  }

  .work_full_article__content_mob_imgs {
    row-gap: 14px;
    margin: 24px 0;
  }

  .work_full_article__btns {
    gap: 14px 30px;
    padding: 0 24px 24px 24px;
  }

  .work_full_article .close_modal {
    top: -64px;
  }

  .work_roject_team__list {
    margin: 24px 0 32px 0;
  }

  .work_roject_team__list_data {
    column-gap: 14px;
  }

  .work_roject_team__person {
    width: 52px;
  }

  .work_roject_team__name {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .work_roject_team___title {
    font-size: 18px;
  }

  .work_roject_team__post {
    font-size: 13px;
  }

  .work_roject_team {
    padding: 32px 24px 0 24px;
  }
}
</style>
