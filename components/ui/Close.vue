<script setup lang="ts">
const props = defineProps<{
  backColor?: string;
}>();

const emit = defineEmits<{
  closeClick: [];
}>();

const bg = computed(() => {
  return props.backColor ? props.backColor : 'var(--colorBirch)';
});
</script>

<template>
  <div class="close_btn react" @click="emit('closeClick')">
    <img src="/img/close-blue.svg" alt="" />
  </div>
</template>

<style lang="css" scoped>
.close_btn {
  width: 52px;
  height: 52px;
  background-color: v-bind(bg);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
}

@media (max-width: 576px) {
  .close_btn {
    width: 34px;
    height: 34px;
  }

  .close_btn img {
    width: 13px;
  }
}
</style>
