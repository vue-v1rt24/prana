<script setup lang="ts">
const { isVisibleProjectVariants, dopDate, sendFormSuccess } = useOutsideModal();
</script>

<template>
  <div>
    <LazyOutsideModal
      :is-project="isVisibleProjectVariants().value"
      :dop-data="dopDate().value"
      @send-form-success="sendFormSuccess"
    />
  </div>
</template>

<style lang="css" scoped></style>
