<script setup lang="ts">
defineProps<{
  breadcrumbs: { title: string; link?: string }[];
  dark?: boolean;
}>();
</script>

<template>
  <div :class="['breadcrumbs_bx', { dark }]">
    <div class="container">
      <nav class="breadcrumbs">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="breadcrumbs_delimiter"></span>

        <template v-for="item in breadcrumbs" :key="item.title">
          <NuxtLink v-if="item.link" :to="item.link">{{ item.title }}</NuxtLink>
          <span v-if="item.link" class="breadcrumbs_delimiter"></span>
          <template v-else>{{ item.title }}</template>
        </template>
      </nav>
    </div>
  </div>
</template>

<style lang="css" scoped>
/* Хлебные крошки */
.breadcrumbs_bx {
  background-color: transparent;
  padding: 52px 0 100px 0;

  /*  */
  @media (max-width: 768px) {
    padding: 42px 0 62px 0;
  }

  @media (max-width: 567px) {
    padding: 32px 0 42px 0;
  }
}

.breadcrumbs {
  font-size: 14px;
  font-weight: 300;
  line-height: 100%;
  letter-spacing: 0.28px;
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  gap: 14px;

  /*  */
  @media (max-width: 576px) {
    font-size: 12px;
  }
}

.breadcrumbs a {
  color: inherit;
}

.breadcrumbs_delimiter {
  width: 10px;
  height: 9px;
  background-image: url(/img/arrow.svg);
  background-repeat: no-repeat;
  transform: translateY(1px);
  opacity: 0.6;
}

/* Хлебные крошки на белом фоне */
.dark {
  background-color: white;
  padding: 82px 0 100px 0;

  /*  */
  @media (max-width: 768px) {
    padding: 34px 0 42px 0;
  }
}

.dark .breadcrumbs {
  color: var(--colorDark3);
  margin: 0;
}

.dark .breadcrumbs_delimiter {
  background-image: url(/img/arrow-dark.svg);
}
</style>
