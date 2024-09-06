<script setup lang="ts">
const addBookmark = () => {
  alert('Нажмите Ctrl + D, чтобы добавить страницу в закладки');
};
</script>

<template>
  <div class="article_full_save react" @click="addBookmark">
    <svg width="15px" height="20px" class="bookmark">
      <use xlink:href="/public/img/sprite.svg#bookmark"></use>
    </svg>

    <span>Сохранить</span>
  </div>
</template>

<style lang="css" scoped>
.article_full_save {
  transition: color 0.3s;
}

.article_full_save:hover {
  color: var(--colorDark3);
}

/*  */
.bookmark {
  stroke: #a9aeb9;
  transition: stroke 0.3s;
}

.article_full_save:hover .bookmark {
  stroke: var(--accentColor);
}
</style>
