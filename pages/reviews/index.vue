<script setup lang="ts">
import { useReviewAll } from '~/composables/review/useReviewAll';

const { dataReviews } = await useReviewAll();

console.log(dataReviews);
</script>

<template>
  <div>
    <section class="reviews_bx">
      <!-- Хлебные крошки -->
      <Breadcrumbs :breadcrumbs="[{ title: 'Отзывы' }]" dark />

      <!--  -->
      <div class="container">
        <h2 class="title_52">
          Отзывы наших <br />
          клиентов
        </h2>

        <div class="video_fancybox_bx">
          <div class="reviews_open_bx">
            <PageReviewsFavorite />
            <PageReviewsFavorite />
          </div>

          <!--  -->
          <div class="reviews_close_bx">
            <PageReviews />
            <PageReviews />
            <PageReviews />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="css">
.reviews_bx {
  background-color: white;
  padding-bottom: 118px;
}

.reviews_bx .title_52 {
  font-size: 62px;
  color: var(--colorDark3);
  margin-bottom: 82px;
}

/*  */
.reviews_open_bx {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px 20px;
}

.reviews__data_img {
  max-width: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 24px;
}

.reviews__data_img img {
  width: 70px;
  height: 70px;
}

.reviews__data_text_title {
  font-family: var(--fontFamily-RFDewi);
  font-weight: 700;
  font-size: 22px;
  line-height: 100%;
  letter-spacing: 0.02em;
  color: var(--colorDark3);
  margin-bottom: 18px;
}

.reviews__data_text_desc {
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
  color: var(--colorGray);
}

/*  */
.works__tag {
  font-size: 18px;
  line-height: 130%;
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 14px;
}

.works__tag_link {
  color: var(--colorDark3);
  display: flex;
  align-items: center;
}

.works__tag_hash {
  color: var(--accentColor);
}

/*  */
.reviews_close_bx {
  margin-top: 118px;
}
</style>
