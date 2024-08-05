<script setup lang="ts">
const likes = useCountLikes();
</script>

<template>
  <div class="article_full_view">
    <span><img src="/public/img/article/view.svg" alt="" /></span>
    <span>{{ likes }}</span>
  </div>
</template>

<style lang="css" scoped></style>
