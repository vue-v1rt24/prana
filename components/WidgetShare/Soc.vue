<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="article_full_save">
    <svg width="21px" height="20px" class="share react">
      <use xlink:href="/public/img/sprite.svg#share2"></use>
    </svg>

    <span class="react share_title">Поделиться</span>

    <!--  -->
    <div class="article_full_share">
      <UiShare :title />
    </div>
  </div>
</template>

<style lang="css" scoped>
.article_full_share {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 60px;
  left: 0;
  width: 362px;
  z-index: 3;
  transition: 0.5s;

  /*  */
  @media (max-width: 576px) {
    width: 172px;
  }
}

.article_full_share::before {
  content: '';
  position: absolute;
  top: -40px;
  left: 0;
  width: 100%;
  height: 60px;
}

@media (max-width: 576px) {
  .article_full_share::before {
    display: none;
  }
}

.share {
  stroke: #a9aeb9;
  transition: stroke 0.3s;
}

.article_full_save:hover .share {
  stroke: var(--accentColor);
}

.share_title {
  transition: color 0.3s;
}

.article_full_save:hover .share_title {
  color: var(--colorDark3);
}

.share_title:hover + .article_full_share {
  opacity: 1;
  visibility: visible;
  top: 40px;
}

.article_full_share:hover {
  opacity: 1;
  visibility: visible;
  top: 40px;
}
</style>
