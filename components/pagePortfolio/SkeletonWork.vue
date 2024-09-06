<script setup lang="ts"></script>

<template>
  <div class="works__item">
    <div class="works__img">
      <UiSkeleton width="100%" height="100%" class="works__img_sk" />
    </div>

    <div class="works__text">
      <UiSkeleton width="90%" height="20px" class="works__title" />

      <div class="works__tags">
        <UiSkeleton width="200px" height="15px" class="works__tag" />
        <UiSkeleton width="150px" height="15px" class="works__tag" />
        <UiSkeleton width="130px" height="15px" class="works__tag" />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.works__tag:not(:last-child) {
  margin-bottom: 5px;
}
</style>
