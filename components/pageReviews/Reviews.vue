<script setup lang="ts"></script>

<template>
  <div class="reviews_close video_fancybox_parent_js">
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

    <div class="reviews_arrow">
      <span>Смотреть</span>
      <img src="/img/arrow-border.svg" alt="" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.reviews_close {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 42px 0;
}

.reviews_close:not(:last-child) {
  border-bottom: 1px solid #ededed;
}

.reviews_close .works__tags {
  max-width: 400px;
  width: 100%;
}

.reviews_arrow {
  font-family: var(--fontFamily-RFDewi);
  font-weight: 700;
  font-size: 15px;
  line-height: 130%;
  letter-spacing: 0.02em;
  color: var(--colorDark3);
  display: flex;
  align-items: center;
  column-gap: 24px;
}
</style>
