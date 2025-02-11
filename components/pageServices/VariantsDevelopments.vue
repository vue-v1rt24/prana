<script setup lang="ts">
import type { TypeRazrabotkaVarianty } from '~/types/razrabotka.types';

//
const props = defineProps<{
  variantsDev: TypeRazrabotkaVarianty;
}>();

// console.log(props.variantsDev);
</script>

<template>
  <div class="container">
    <div class="variants_dev_wrap">
      <PageServicesVariantsDevelopmentsItem
        v-for="variant in variantsDev.variants"
        :key="variant.razrabotkaVariantyZagolovok"
        :variant
      />
    </div>
  </div>
</template>

<style lang="css" scoped>
.variants_dev_wrap {
  display: grid;
  /* grid-template-columns: repeat(12, 1fr); */
  grid-template-areas: 'bx1 bx2' 'bx3 bx4 bx5' 'bx6 bx7';
  gap: 20px;
}
</style>
