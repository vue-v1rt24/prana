<script setup lang="ts">
// Виджеты Сохранить и Поделиться

defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="article_full_share">
    <!-- Сохранить -->
    <WidgetShareAddBookmark />

    <!-- Поделиться -->
    <WidgetShareSoc :title />
  </div>
</template>

<style lang="css" scoped></style>
