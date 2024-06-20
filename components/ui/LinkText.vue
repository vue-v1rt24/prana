<script setup lang="ts">
defineProps<{
  link: string;
  title: string;
  underline?: boolean;
}>();
</script>

<template>
  <NuxtLink :to="link" class="job__link wrap_arrow">
    <span :class="underline && 'job__link__border'">{{ title }}</span>

    <span class="btn__arrow">
      <svg class="arrow">
        <use xlink:href="/img/sprite.svg#arrow"></use>
      </svg>
    </span>
  </NuxtLink>
</template>

<style lang="css" scoped>
.job__link {
  font-size: 18px;
  color: var(--accentColor);
  border-top: var(--border);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 14px;
  padding-top: 32px;
}

.wrap_arrow {
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  gap: 12px;
}

.btn__arrow {
  display: inherit;
  transform: translateY(0);
  transition: transform 0.3s;
}

.wrap_arrow:hover .btn__arrow {
  animation: swing 0.8s ease;
}

.job__link .arrow {
  width: 12px;
  height: 12px;
  fill: var(--accentColor);
}

.job__link__border {
  border-bottom: 1px solid var(--accentColor);
}

@keyframes swing {
  15% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-9px);
  }
  40% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  65% {
    transform: translateY(0);
  }
}

@media (max-width: 576px) {
  .job__link .arrow {
    width: 11px;
    height: 11px;
  }
}
</style>
