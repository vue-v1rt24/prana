<script setup lang="ts">
import * as FancyboxAll from '@fancyapps/ui';
import type { TypeReview } from '@/types/reviews.types';

//
const router = useRouter();

//
const props = defineProps<{
  review: TypeReview;
}>();

//
const { Fancybox } = FancyboxAll;

//
const openFilePDF = () => {
  Fancybox.show([
    {
      src: props.review.reviewClient.reviewZagruziteFajl.node.mediaItemUrl,
      type: 'iframe',
      preload: false,
    },
  ]);
};

//
const openLink = (evt: Event) => {
  const target = evt.target as HTMLDivElement;

  if (target.closest('.works__tags')) {
    return;
  } else if (props.review.reviewClient.reviewZagruziteFajl) {
    openFilePDF();
  } else {
    router.push(`/reviews/${props.review.slug}`);
  }
};
</script>

<template>
  <div class="reviews_close video_fancybox_parent_js react" @click="openLink">
    <div class="reviews__data_img">
      <img :src="review.reviewClient.reviewLogoKompanii?.node.mediaItemUrl" alt="" />

      <div class="reviews__data_text">
        <div class="reviews__data_text_title">
          {{ review.reviewClient.reviewNazvanieKompanii }}
        </div>

        <div class="reviews__data_text_desc">
          {{ review.reviewClient.reviewOpisanieKompanii }}
        </div>
      </div>
    </div>

    <div class="works__tags">
      <span v-for="tag in review.portfolioCategories.nodes" class="works__tag">
        <NuxtLink
          :to="{ path: '/portfolio', query: { cat: encodeURI(tag.name) } }"
          class="works__tag_link"
        >
          <span class="works__tag_hash">#</span>
          <span class="works__tag__title">{{ tag.name }}</span>
        </NuxtLink>
      </span>
    </div>

    <!--  -->
    <div class="reviews_arrow react">
      <span>Смотреть</span>
      <img src="/public/img/arrow-border.svg" alt="" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.reviews_close {
  max-width: 1567px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 42px 0;

  @media (max-width: 992px) {
    flex-wrap: wrap;
  }
}

.reviews_close:not(:last-child) {
  border-bottom: 1px solid #ededed;
}

.reviews_close .works__tags {
  max-width: 400px;
  width: 100%;

  /*  */
  @media (max-width: 1199px) {
    max-width: 250px;
  }

  @media (max-width: 992px) {
    max-width: 580px;
    order: 2;
    margin-top: 32px;
  }

  @media (max-width: 700px) {
    order: 0;
  }

  @media (max-width: 576px) {
    margin-top: 20px;
  }
}

.reviews_arrow {
  font-family: var(--fontFamily-Unbounded);
  font-size: 15px;
  line-height: 130%;
  letter-spacing: 0.02em;
  color: var(--colorDark3);
  display: flex;
  align-items: center;
  column-gap: 24px;

  /*  */
  @media (max-width: 700px) {
    margin-top: 32px;
  }
}
</style>
