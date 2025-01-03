<script setup lang="ts">
defineProps<{
  idx: number;
  cartAll: number;
  title: string;
  desc: string;
}>();
</script>

<template>
  <div class="card">
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
  position: absolute;
  width: 500px;
  height: 550px;
  /* top: 50%; */
  top: 0;
  /* left: 50%; */
  left: 0;
  transform-origin: center center;
  margin-left: -250px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  will-change: transform;

  /*  */
  @media (max-width: 900px) {
    width: 375px;
    height: 500px;
  }
  /*  */
  /* position: relative; */
  width: 510px;
  height: 510px;
  border-radius: 42px;
  background-color: var(--colorDark3);

  background-image: url(/img/folder.svg);
  background-repeat: no-repeat;
  background-position: calc(100% - var(--padding)) calc(100% - var(--padding));

  padding: var(--padding);
  overflow: hidden;

  transition: background-color 0.3s;

  &.active {
    background-color: white;
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
}

.card__counter_line {
  width: 100%;
  height: 2px;
  background-color: var(--accentColor);
}

/*  */
.card__text {
  color: white;
  transition: color 0.3s;

  /*  */
  .active & {
    color: var(--colorDark3);
  }
}

.card__text_title {
  font-weight: 700;
  font-size: 46px;
  line-height: 100%;
  margin-bottom: 24px;
}

.card__text_desc {
  max-width: 308px;
  font-weight: 300;
  font-size: 20px;
  line-height: 130%;
  opacity: 0.8;
}
</style>
