<script setup lang="ts">
import { useActiveBtnCategoryPortfolio } from '~/composables/useLocalStorages';
import type { TypePortfolio } from '~/types/razrabotka.types';

import '@/assets/css/works.css';

//
const props = defineProps<{
  portfolio: TypePortfolio[];
}>();

console.log(props.portfolio);

// Подключение файла для фильтрации сортировки
useHead({
  script: [
    {
      defer: true,
      src: '/libs/mixitup.min.js',
    },
  ],
});

//
const changeTitleBtmSub = (title: string) => {
  useActiveBtnCategoryPortfolio().value.child = title;
};

//
setTimeout(() => {
  useActiveBtnCategoryPortfolio().value.child = 'Сайт на CMS Tilda';
}, 1000);
</script>

<template>
  <section class="portfolio_wrap">
    <div class="container">
      <h2 class="title_52">Смотрите примеры наших сайтов</h2>

      <!--  -->
      <div class="portfolio_btns">
        <template v-for="cat in portfolio" :key="cat.node.databaseId">
          <ButtonsTabSubPortfolio
            v-if="cat.node.count"
            :cat-name="cat.node.name"
            @change-tag-sub="changeTitleBtmSub"
          />
        </template>
      </div>

      <!--  -->
    </div>
  </section>
</template>

<style lang="css" scoped>
.portfolio_wrap {
  position: relative;
  background-color: white;
  border-radius: 80px 80px 0 0;
  padding: 160px 0;

  /*  */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 647px;
    background-color: rgb(199, 88, 88);
    /* background-color: black; */
    border-radius: 72px 72px 0 0;
  }
}

/*  */

.portfolio_wrap .container {
  position: relative;
}

/*  */

.title_52 {
  max-width: 785px;
  text-align: center;
  margin: 0 auto;
}

/*  */

.portfolio_btns {
  max-width: 1110px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  margin: 42px auto 62px auto;
}
</style>
