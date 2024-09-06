<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    borderRadius?: string;
  }>(),
  {
    width: '0',
    height: '0',
    borderRadius: '0',
  },
);
</script>

<template>
  <div class="skeleton"></div>
</template>

<style lang="css" scoped>
.skeleton {
  position: relative;
  width: v-bind(width);
  height: v-bind(height);
  border-radius: v-bind(borderRadius);
  pointer-events: none;
}

.skeleton img {
  opacity: 0;
}

.skeleton::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--colorBirch), #ffffff, var(--colorBirch));
  background-size: 200%;
  z-index: 10;
  animation: skeleton 1s infinite reverse;
}

@keyframes skeleton {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}
</style>
