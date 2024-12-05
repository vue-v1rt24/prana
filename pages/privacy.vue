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

//
useSeoMeta({
  title: 'Политика конфиденциальности',
});
</script>

<template>
  <div class="privacy_policy">
    <!-- Хлебные крошки -->
    <Breadcrumbs :breadcrumbs="[{ title: 'Политика конфиденциальности' }]" />

    <!--  -->
    <div class="container">
      <div v-html="privacyPolicy?.data.pageBy.content"></div>
    </div>
  </div>
</template>

<style lang="css">
.privacy_policy {
  padding-bottom: 100px;
}

.privacy_policy h1 {
  max-width: 80%;
  color: var(--colorTextWhite);
  font-family: var(--fontFamily-Unbounded);
  font-size: 52px;
  line-height: 100%;
  letter-spacing: 1.04px;
  margin-bottom: 50px;

  /*  */
  @media (max-width: 576px) {
    font-size: 30px;
  }
}

.privacy_policy h2 {
  max-width: 60%;
  font-family: var(--fontFamily-Unbounded);
  font-size: 32px;
  line-height: 120%;
  letter-spacing: 0.02em;
  color: var(--colorTextWhite);
  margin: 30px 0;

  /*  */
  @media (max-width: 576px) {
    font-size: 20px;
  }
}

.privacy_policy ul {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  line-height: 1.5;
}

.privacy_policy ul li {
  list-style: none;
}
</style>
