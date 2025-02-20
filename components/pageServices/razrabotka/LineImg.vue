<script setup lang="ts">
defineProps<{
  img: string;
}>();
</script>

<template>
  <div class="img_line_wrap">
    <div v-for="num in 100" :key="num" class="img_line_item">
      <img :src="img" alt="" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.img_line_wrap {
  width: 100%;
  display: flex;
  overflow: hidden;
}

/*  */
.img_line_item {
  flex-shrink: 0;
  display: flex;
  gap: 20px;
  animation: scroll 6s linear infinite;
}

@keyframes scroll {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
