<script setup lang="ts">
defineProps<{
  idx: number;
  cartAll: number;
  title: string;
  desc: string;
  imgFolder: string;
}>();
</script>

<template>
  <div class="card" :style="`--folderUrl: url(${imgFolder})`">
    <div class="card__counter">
      <span>{{ idx }}/{{ cartAll }}</span>
      <span class="card__counter_line"></span>
    </div>

    <div class="card__text">
      <div class="card__text_title">{{ title }}</div>
      <p class="card__text_desc">{{ desc }}</p>
    </div>
  </div>
</template>

<style lang="css" scoped>
.card {
  --padding: 52px;

  /*  */
  width: 510px;
  height: 510px;
  background-color: white;
  background-image: var(--folderUrl);
  background-repeat: no-repeat;
  background-position: calc(100% - var(--padding)) calc(100% - var(--padding));
  will-change: transform;
  border-radius: 42px;
  padding: var(--padding);
  overflow: hidden;
  transition: background-color 0.3s;

  /*  */
  @media (max-width: 576px) {
    --padding: 24px;
    width: 320px;
    height: 320px;
    background-size: 100px;
    border-radius: 24px;
  }

  /*  */
  &::before {
    content: '';
    position: absolute;
    bottom: var(--padding);
    right: var(--padding);
    width: 160px;
    height: 160px;
    border-radius: 100%;
    filter: blur(100px);
    box-shadow: 0 0 155px 0 #09c4c3;
    z-index: 1;
  }
}

/*  */
.card__counter {
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  color: var(--accentColor);
  display: flex;
  align-items: center;
  column-gap: 26px;
  margin-bottom: 52px;

  /*  */
  @media (max-width: 1200px) {
    margin-bottom: 24px;
  }

  @media (max-width: 800px) {
    margin-bottom: 16px;
  }
}

.card__counter_line {
  width: 100%;
  height: 2px;
  background-color: var(--accentColor);
}

/*  */
.card__text {
  color: var(--colorDark3);
  transition: color 0.3s;
}

.card__text_title {
  font-weight: 700;
  font-size: 46px;
  line-height: 100%;
  margin-bottom: 24px;

  /*  */
  @media (max-width: 1200px) {
    font-size: 34px;
    margin-bottom: 14px;
  }

  @media (max-width: 800px) {
    font-size: 28px;
  }
}

.card__text_desc {
  max-width: 308px;
  font-weight: 300;
  font-size: 20px;
  line-height: 130%;
  opacity: 0.8;

  /*  */
  @media (max-width: 1200px) {
    font-size: 18px;
  }

  @media (max-width: 800px) {
    font-size: 15px;
  }
}
</style>
