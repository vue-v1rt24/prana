<script setup lang="ts">
const addBookmark = () => {
  alert('Нажмите Ctrl + D, чтобы добавить страницу в закладки');
};
</script>

<template>
  <div class="article_full_save react" @click="addBookmark">
    <span><img src="/img/article/bookmark.png" alt="" /></span>
    <span>Сохранить</span>
  </div>
</template>

<style lang="css" scoped></style>
