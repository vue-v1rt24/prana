<script setup lang="ts">
useSeoMeta({
  title: 'Страница услуги',
  description: 'Описание',
});
</script>

<template>
  <section class="service_item">
    <!-- Хлебные крошки -->
    <Breadcrumbs :breadcrumbs="[{ title: 'Команда' }]" />

    <div class="container">
      <h1>Раздел находится в разработке</h1>
    </div>
  </section>
</template>

<style lang="css" scoped>
.service_item {
  height: 100vh;
  background-color: blueviolet;
}
</style>
