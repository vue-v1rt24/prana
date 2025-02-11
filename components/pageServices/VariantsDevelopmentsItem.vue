<script setup lang="ts">
import type { TypeRazrabotkaVariantyItem } from '~/types/razrabotka.types';

const props = defineProps<{
  variant: TypeRazrabotkaVariantyItem;
}>();

// console.log(props.variant);
</script>

<template>
  <div class="variants_dev__item">
    <div class="variants_dev__item_title">{{ variant.razrabotkaVariantyZagolovok }}</div>
    <p class="variants_dev__item_desc">{{ variant.razrabotkaVariantyOpisanie }}</p>

    <!--  -->
    <ul class="instruments">
      <li
        v-for="(img, idx) in variant.razrabotkaVariantyIzobrazheniyaInstrumentov"
        :key="img.razrabotkaVariantyIzobrazheniyaInstrumentovIzobrazhenie.node.mediaItemUrl"
        :style="{ '--offset': idx }"
      >
        <img
          :src="img.razrabotkaVariantyIzobrazheniyaInstrumentovIzobrazhenie.node.mediaItemUrl"
          alt=""
        />
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
.variants_dev__item {
  position: relative;
  z-index: 1;
  /* width: 920px; */
  background-color: #060e1b;
  border-radius: 42px;
  display: flex;
  flex-direction: column;
  padding: 42px;

  /*  */
  &:first-child {
    z-index: -1;
    /* grid-column: 1 / span 6; */
    /* grid-row: 1 / span 1; */

    grid-area: bx1;
  }

  &:nth-child(2) {
    /* grid-column: 7 / span 6; */
    /* grid-row: 1 / span 1; */

    grid-area: bx2;
  }

  &:nth-child(3) {
    /* grid-column: 1 / span 4; */
    /* grid-row: 2 / span 1; */

    grid-area: bx3;
  }

  &:nth-child(4) {
    /* grid-column: 5 / span 4; */
    /* grid-row: 2 / span 1; */

    grid-area: bx4;
  }

  &:nth-child(5) {
    /* grid-column: 9 / span 4; */
    /* grid-row: 2 / span 1; */

    grid-area: bx5;
  }

  &:nth-child(6) {
    /* grid-column: 1 / span 6; */
    /* grid-row: 3 / span 1; */

    grid-area: bx6;
  }

  &:nth-child(7) {
    /* grid-column: 7 / span 6; */
    /* grid-row: 3 / span 1; */

    grid-area: bx7;
  }
}

/*  */
.variants_dev__item_title {
  color: #fff;
  font-family: var(--fontFamily-Unbounded);
  font-size: 24px;
  line-height: 110%;
}

/*  */
.variants_dev__item_desc {
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  line-height: 130%;
  opacity: 0.8;
  margin: 24px 0 42px 0;
}

/*  */
.instruments {
  display: flex;
  margin-top: auto;

  /*  */
  li {
    transform: translateX(calc(var(--offset) * -24px));
  }
}
</style>
