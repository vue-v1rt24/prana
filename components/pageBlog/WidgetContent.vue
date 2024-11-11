<script setup lang="ts">
const headings = ref<Element[]>([]);
const content = ref<HTMLDivElement | null>(null);

//
const travel = (title: string) => {
  for (const head of headings.value) {
    if (head.textContent === title) {
      head.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
};

//
onMounted(() => {
  content.value = document.querySelector<HTMLDivElement>('.article_full_content')!;

  if (!content.value) return;

  const headingsAll = content.value?.querySelectorAll('.wp-block-heading');

  for (const head of headingsAll) {
    headings.value.push(head);
  }
});
</script>

<template>
  <div v-if="content" class="article_full_content_page">
    <div class="article_full_content_page__title">Содержание</div>

    <div
      v-for="link in headings"
      :key="link.textContent!"
      class="article_full_content_page__link react"
      @click="travel(link.textContent!)"
    >
      {{ link.textContent }}
    </div>
  </div>
</template>

<style lang="css" scoped>
.article_full_content_page {
  /* position: absolute;
  top: 57px;
  right: -470px; */
  width: 450px;
  background-color: var(--colorBirch);
  padding: 32px;
  border-radius: 24px;
  margin-bottom: 52px;
}

.article_full_content_page__title {
  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
  margin-bottom: 20px;
}

.article_full_content_page__link {
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  color: var(--colorDark3);
  text-decoration: underline;
  display: block;
}

.article_full_content_page__link:not(:last-child) {
  margin-bottom: 18px;
}

/* ================= Медиа запросы */

@media (max-width: 1500px) {
  .article_full_content_page {
    /* position: static; */
    width: 100%;
  }
}

@media (max-width: 576px) {
  .article_full_content_page {
    padding: 20px;
    margin-bottom: 32px;
  }

  .article_full_content_page__title {
    font-size: 16px;
    margin-bottom: 18px;
  }

  .article_full_content_page__link {
    font-size: 14px;
  }

  .article_full_content_page__link:not(:last-child) {
    margin-bottom: 14px;
  }
}
</style>
