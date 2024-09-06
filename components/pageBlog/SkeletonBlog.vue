<script setup lang="ts"></script>

<template>
  <div class="works__item">
    <div class="works__img">
      <UiSkeleton width="449px" height="253px" class="works__img_sk" />
    </div>

    <div class="works__text">
      <UiSkeleton width="80%" height="25px" class="works__title" />

      <div class="works__desc">
        <UiSkeleton width="100%" height="100%" />
      </div>

      <div class="works__tags">
        <div class="works__tag">
          <UiSkeleton width="100px" height="20px" class="works__tag_link" />
          <UiSkeleton width="100px" height="20px" class="works__tag_link" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.works__img {
  aspect-ratio: 1 / 0.56;
}

.works__img_sk {
  width: 100%;
  height: 100%;
}

.works__tag:not(:last-child) {
  margin-bottom: 5px;
}
</style>
