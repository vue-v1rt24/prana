<script setup lang="ts">
import type { TypeRazrabotkaVarianty } from '~/types/razrabotka.types';

//
const props = defineProps<{
  variantsDev: TypeRazrabotkaVarianty;
}>();

// console.log(props.variantsDev);
</script>

<template>
  <section class="variants_dev_sec">
    <div class="container">
      <div class="variants_dev_wrap">
        <PageServicesVariantsDevelopmentsItem
          v-for="variant in variantsDev.variants"
          :key="variant.razrabotkaVariantyZagolovok"
          :variant
        />
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.variants_dev_wrap {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
}
</style>
