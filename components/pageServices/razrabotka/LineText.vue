<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string;
    width?: string;
    bg?: string;
  }>(),
  {
    width: '100%',
    bg: 'var(--accentColor2)',
  },
);
</script>

<template>
  <div class="text_line_wrap">
    <div class="text_line_item">
      <div class="text_line">{{ text }}</div>
    </div>

    <div class="text_line_item">
      <div class="text_line">{{ text }}</div>
    </div>

    <div class="text_line_item">
      <div class="text_line">{{ text }}</div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.text_line_wrap {
  width: v-bind(width);
  background-color: v-bind(bg);
  display: flex;
  gap: 20px;
  padding: 30px 0;
  overflow: hidden;
}

/*  */
.text_line_item {
  display: flex;
  gap: 20px;
  animation: scroll 60s linear infinite;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - 20px));
  }
}

/*  */
.text_line {
  font-family: var(--fontFamily-RFDewi);
  font-weight: 700;
  line-height: 100%;
  letter-spacing: 0.56px;
  font-size: 28px;
  text-transform: uppercase;
  white-space: nowrap;
}
</style>
