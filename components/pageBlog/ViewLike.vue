<script setup lang="ts">
const likes = useCountLikes();
</script>

<template>
  <div class="article_full_view">
    <svg width="16px" height="14px">
      <use xlink:href="/public/img/sprite.svg#love"></use>
    </svg>

    <ClientOnly>
      <span>{{ likes }}</span>
    </ClientOnly>
  </div>
</template>

<style lang="css" scoped></style>
