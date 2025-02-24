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
      <div class="text_line" v-html="text"></div>
    </div>

    <div class="text_line_item">
      <div class="text_line" v-html="text"></div>
    </div>

    <div class="text_line_item">
      <div class="text_line" v-html="text"></div>
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

  /*  */
  @media (max-width: 768px) {
    padding: 20px 0;
  }
}

/*  */
.text_line_item {
  display: flex;
  gap: 20px;
  animation: scroll 60s linear infinite;
}

@keyframes scroll {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
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

  /*  */
  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 576px) {
    font-size: 16px;
  }
}
</style>
