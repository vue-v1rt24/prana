<script setup lang="ts">
import { useReviewAll } from '~/composables/review/useReviewAll';

const { dataReviews } = await useReviewAll();

//
useSeoMeta({
  title: 'Отзывы',
  description: 'Описание',
});
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
            <template v-for="item in dataReviews" :key="item.databaseId">
              <PageReviewsReviewFavorite
                v-if="item.reviewClient.reviewsVRazvernutomVide"
                :review="item"
              />
            </template>
          </div>

          <!--  -->
          <div class="reviews_close_bx">
            <template v-for="item in dataReviews" :key="item.databaseId">
              <PageReviews
                v-if="
                  !item.reviewClient.reviewsVRazvernutomVide &&
                  item.reviewClient.reviewNazvanieKompanii
                "
                :review="item"
              />
            </template>
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

  /*  */
  @media (max-width: 768px) {
    padding-bottom: 140px;
  }

  @media (max-width: 576px) {
    padding-bottom: 80px;
  }
}

/*  */
.reviews_bx .breadcrumbs_bx {
  @media (max-width: 768px) {
    padding: 42px 0 62px 0;
  }

  @media (max-width: 576px) {
    padding: 32px 0 42px 0;
  }
}

/*  */
.reviews_bx .title_52 {
  font-size: 62px;
  color: var(--colorDark3);
  margin-bottom: 82px;

  /*  */
  @media (max-width: 768px) {
    font-size: 42px;
    margin-bottom: 62px;
  }

  @media (max-width: 576px) {
    font-size: 32px;
    margin-bottom: 52px;
  }
}

/*  */
.reviews_open_bx {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px 20px;

  /*  */
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
  }

  @media (max-width: 576px) {
    gap: 32px 40px;
  }
}

.reviews__data_img {
  max-width: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 24px;

  /*  */
  @media (max-width: 576px) {
    column-gap: 18px;
  }
}

.reviews__data_img img {
  width: 70px;
  height: 70px;

  /*  */
  @media (max-width: 576px) {
    width: 48px;
    height: 48px;
  }
}

.reviews__data_text_title,
.reviews__data_text_title a {
  font-family: var(--fontFamily-Unbounded);
  font-size: 22px;
  line-height: 100%;
  letter-spacing: 0.02em;
  color: var(--colorDark3);
  display: block;
  margin-bottom: 18px;

  /*  */
  @media (max-width: 576px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
}

.reviews__data_text_desc {
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
  color: var(--colorGray);

  /*  */
  @media (max-width: 576px) {
    font-size: 14px;
  }
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

  /*  */
  @media (max-width: 768px) {
    margin-top: 140px;
  }

  @media (max-width: 576px) {
    margin-top: 80px;
  }
}
</style>
