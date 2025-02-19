<script setup lang="ts">
import type { TypeKakMyRabotaemVariantyItem } from '~/types/razrabotka.types';

//
defineProps<{
  idx: number;
  countCart: number;
  work: TypeKakMyRabotaemVariantyItem;
}>();
</script>

<template>
  <li class="how_do_we_work__list_item cart_hdw">
    <div class="how_do_we_work__list_item__count">
      <span>{{ idx + 1 }} / {{ countCart }}</span>
    </div>

    <div class="how_do_we_work__list_item__title">{{ work.kakMyRabotaemVariantyZagolovok }}</div>

    <div class="how_do_we_work__list_item__desc">{{ work.kakMyRabotaemVariantyOpisanie }}</div>

    <div class="how_do_we_work__list_item__img">
      <img :src="work.kakMyRabotaemVariantyIzobrazhenie.node.mediaItemUrl" alt="" />
    </div>
  </li>
</template>

<style lang="css" scoped>
.how_do_we_work__list_item {
  --padding: 52px;
  position: relative;
  width: 900px;
  height: 510px;
  border-radius: 42px;
  padding: var(--padding);
  overflow: hidden;

  /*  */
  &:nth-child(even) {
    color: #030810;
    background-color: var(--colorTextWhite);
  }

  &:nth-child(odd) {
    color: var(--colorTextWhite);
    background-color: #030810;
  }

  /*  */
  @media (max-width: 1900px) {
    width: 600px;
  }
}

/*  */
.how_do_we_work__list_item__count {
  position: relative;
  color: var(--accentColor);
  font-size: 20px;
  font-weight: 700;
  line-height: 100%;

  display: flex;
  align-items: center;
  column-gap: 26px;

  /*  */
  &::after {
    content: '';
    width: 100%;
    height: 2px;
    background-color: var(--accentColor);
    display: block;
  }

  /*  */
  span {
    flex-shrink: 0;
  }
}

/*  */
.how_do_we_work__list_item__title {
  max-width: 416px;
  font-size: 46px;
  font-weight: 700;
  line-height: 100%;
  margin: 52px 0 24px 0;
}

/*  */
.how_do_we_work__list_item__desc {
  max-width: 308px;
  font-size: 20px;
  font-weight: 300;
  line-height: 130%;
  opacity: 0.8;
}

/*  */
.how_do_we_work__list_item__img {
  position: absolute;
  bottom: var(--padding);
  right: var(--padding);

  /*  */
  &::before {
    content: '';
    position: absolute;
    top: -248px;
    right: -52px;
    width: 450px;
    height: 450px;
    background-image: url(/img/razrabotka/shadow3.png);
    background-repeat: no-repeat;
  }

  /*  */
  img {
    isolation: isolate;
  }
}
</style>
