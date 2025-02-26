<script setup lang="ts">
defineProps<{
  img: string;
  alt: string;
  title: string;
  desc: string;
  link: string;
}>();
</script>

<template>
  <li class="service__right_item">
    <NuxtLink :to="link" class="service__right_link"> </NuxtLink>

    <div class="service__right_img">
      <img :src="img" :alt />
    </div>

    <div class="service__right_text">
      <div class="service__right_text__title">{{ title }}</div>
      <p class="service__right_text__desc">{{ desc }}</p>
    </div>

    <div class="service__right_arrow">
      <span>Перейти</span>

      <div>
        <ImagesArrowCircle class="service_arrow" />
      </div>
    </div>
  </li>
</template>

<style lang="css" scoped>
.service__right_item {
  --padding: 42px;

  position: relative;
  height: 218px;
  background: #fff;
  border: 2px solid #ededed;
  border-radius: 24px;
  padding: var(--padding);
  display: flex;
  align-items: flex-start;
  gap: 27px 32px;

  /*  */
  @media (max-width: 700px) {
    height: auto;
    flex-direction: column;
  }

  @media (max-width: 576px) {
    --padding: 24px;
    row-gap: 24px;
  }
}

/*  */

.service__right_link {
  position: absolute;
  inset: 0;
  z-index: 1;
}

/*  */

.service__right_img {
  flex-shrink: 0;

  /*  */
  @media (max-width: 576px) {
    width: 34px;
  }
}

.service__right_text {
  flex-shrink: 0;
}

.service__right_text__title {
  font-family: var(--fontFamily-Unbounded);
  font-size: 28px;
  font-weight: 500;
  line-height: 110%;
  letter-spacing: 0.56px;
  color: var(--colorDark3);
  margin-bottom: 16px;
  transition: color 0.3s;

  /*  */
  .service__right_item:hover & {
    color: var(--accentColor);
  }

  /*  */
  @media (max-width: 1500px) {
    max-width: 235px;
  }

  @media (max-width: 700px) {
    max-width: 100%;
  }

  @media (max-width: 576px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
}

.service__right_text__desc {
  max-width: 360px;
  color: var(--colorDark3);
  font-size: 18px;
  font-weight: 300;
  line-height: 140%;

  /*  */
  @media (max-width: 576px) {
    font-size: 15px;
  }
}

.service__right_arrow {
  position: absolute;
  top: var(--padding);
  right: var(--padding);
  color: var(--colorDark3);
  font-family: var(--fontFamily-Unbounded);
  font-size: 15px;
  font-weight: 500;
  line-height: 130%;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  column-gap: 18px;
  flex-shrink: 0;

  /*  */
  @media (max-width: 700px) {
    position: static;
    width: 100%;
    justify-content: space-between;
  }

  /*  */
  @media (max-width: 576px) {
    font-size: 14px;
  }
}
</style>

<style>
.service_arrow {
  @media (max-width: 576px) {
    width: 24px;
    height: 24px;
  }

  /*  */
  .circle_path {
    transition: fill 0.3s;

    /*  */
    .service__right_item:hover & {
      fill: var(--accentColor);
    }
  }

  .arrow_path {
    transition: fill 0.3s;

    /*  */
    .service__right_item:hover & {
      fill: white;
    }
  }
}
</style>
