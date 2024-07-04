<script setup lang="ts">
defineProps<{
  id: number;
  content: string;
  blogByloPolezno: number;
}>();

//
const { isOpenModal } = useOutsideModal();
</script>

<template>
  <!-- Виджет "Поделиться" -->
  <PageBlogWidgetShare />

  <!-- Виджет "Содержание" -->
  <PageBlogWidgetContent />

  <!-- Содержание из админки -->
  <div class="article_full_content" v-html="content"></div>

  <!-- Полоса -->
  <hr class="article_full__hr" />

  <!-- Виджеты -->
  <div class="rticle_full_useful">
    <!-- Виджет "Было полезно" -->
    <PageBlogPolezno :id="id" :count="blogByloPolezno" title="Было полезно" />

    <!-- Виджет "Поделиться" -->
    <PageBlogWidgetShare />
  </div>

  <!-- Виджет "Еженедельный дайджест" -->
  <div class="article_full__ditask">
    <div class="article_full__digest">
      <div class="article_full__digest__title">Еженедельный дайджест</div>

      <div class="article_full__digest__desc">Читайте свежие статьи и смотрите видео первыми</div>

      <form id="digest__form" class="article_full__digest__form">
        <input type="email" name="digest_email" placeholder="Введите email" />
        <UiButton title="Отправить" type="submit"></UiButton>
      </form>
    </div>

    <!-- Виджет "Обсудить проект" -->
    <div class="article_full__task">
      <div class="article_full__task__title">
        Есть задача? <br />
        Давайте обсудим!
      </div>

      <UiButton title="Обсудить проект" @click-btn="isOpenModal().value = true"></UiButton>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
