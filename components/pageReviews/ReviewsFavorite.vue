<script setup lang="ts"></script>

<template>
  <div class="reviews_open">
    <img class="video_img" src="/img/video/video.jpg" alt="" />

    <div class="reviews__data">
      <div class="reviews__data_img">
        <img src="/img/reviews/1.svg" alt="" />

        <div class="reviews__data_text">
          <div class="reviews__data_text_title">ООО "Строй Сфера"</div>
          <div class="reviews__data_text_desc">Строительная компания</div>
        </div>
      </div>

      <div class="works__tags">
        <span class="works__tag">
          <a class="works__tag_link" href="#">
            <span class="works__tag_hash">#</span>
            <span>Разработка сайта</span>
          </a>
        </span>

        <span class="works__tag">
          <a class="works__tag_link" href="#">
            <span class="works__tag_hash">#</span>
            <span>Фото</span>
          </a>
        </span>

        <span class="works__tag">
          <a class="works__tag_link" href="#">
            <span class="works__tag_hash">#</span>
            <span>Фирменный стиль</span>
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
/*  */
.reviews_open .reviews__data {
  margin-top: 32px;
}

.reviews_open .reviews__data_img {
  margin-bottom: 26px;
}

.reviews_open .works__tags {
  max-width: 100%;
}

.video_img {
  border-radius: 18px;
}
</style>
