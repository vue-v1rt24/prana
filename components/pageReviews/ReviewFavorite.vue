<script setup lang="ts">
import type { TypeReview } from '@/types/reviews.types';

const props = defineProps<{
  review: TypeReview;
}>();
</script>

<template>
  <div class="reviews_open">
    <NuxtLink :to="`/reviews/${review.slug}`" class="video_fancybox">
      <img
        class="video_img"
        :src="review.reviewClient.reviewIzobrazhenieDlyaVideo.node.mediaItemUrl"
        alt=""
      />
    </NuxtLink>

    <div class="reviews__data">
      <div class="reviews__data_img">
        <img :src="review.reviewClient.reviewLogoKompanii.node.mediaItemUrl" alt="" />

        <div class="reviews__data_text">
          <div class="reviews__data_text_title">
            <NuxtLink :to="`/reviews/${review.slug}`">
              {{ review.reviewClient.reviewNazvanieKompanii }}
            </NuxtLink>
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
    </div>
  </div>
</template>

<style lang="css" scoped>
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

/*  */
.reviews_open .reviews__data {
  margin-top: 32px;

  /*  */
  @media (max-width: 576px) {
    margin-top: 20px;
  }
}

.reviews_open .reviews__data_img {
  margin-bottom: 26px;

  /*  */
  @media (max-width: 576px) {
    margin-bottom: 18px;
  }
}

.reviews_open .works__tags {
  max-width: 100%;
}

.video_img {
  border-radius: 18px;
}
</style>
