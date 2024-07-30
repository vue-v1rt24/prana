<script setup lang="ts">
type TypePrivacyPolicy = {
  data: {
    pageBy: {
      content: string;
    };
  };
};

// Получение ссылки на API
const { graphqlUrl } = useRuntimeConfig().public;

// Получение данных
const { data: privacyPolicy } = await useFetch<TypePrivacyPolicy>(graphqlUrl, {
  query: {
    query: `
      {
        pageBy(pageId: 3) {
          content
        }
      }
    `,
  },
});
</script>

<template>
  <div class="privacy_policy">
    <!-- Хлебные крошки -->
    <Breadcrumbs :breadcrumbs="[{ title: 'Портфолио' }]" />

    <!--  -->
    <div class="container">
      <div class="wp_content" v-html="privacyPolicy?.data.pageBy.content"></div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
