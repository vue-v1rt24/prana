<script setup lang="ts">
import { type TypeService } from '@/types/home-page/services.types';

const props = defineProps<{
  itemClass: string;
  img: string;
  title: string;
  service: TypeService[];
}>();

// console.log(props.service);
</script>

<template>
  <div class="swiper-slide">
    <div :class="['services__card__item', itemClass]">
      <h3 class="title_h3">
        <span class="service__title_img">
          <img :src="`/img/services/${img}`" alt="" />
        </span>
        {{ title }}
      </h3>

      <div
        v-for="(item, key) in service"
        :key="key"
        :class="['services__cards__vars', key > 0 && 'services__cards__vars_animate']"
      >
        <h4 v-html="item.title" :class="['title_h4', key === 0 && 'title_h4_animate']"></h4>

        <p
          v-html="item.servicesContent.kratkoeOpisanieNaGlavnoj"
          :class="['description', key === 0 && 'description_animate']"
        ></p>

        <!-- <div class="services__cards__link">
          <UiLinkText :link="`/services/${item.slug}`" title="Перейти" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.swiper_services .swiper-slide {
  width: 446px;
  height: auto;
}

/*  */
.services__card__item {
  opacity: 0.1;
  width: 100%;
  height: 100%;
  border-radius: 42px;
  background-color: rgba(6, 14, 27, 0.5);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  padding: 30px;
}

.services__card__item .title_h3 {
  font-size: 28px;
  border-bottom: var(--border);
  padding-bottom: 36px;
  margin-bottom: 32px;
}

.services__cards__vars {
  border-bottom: var(--border);
  padding-bottom: 32px;
}

.services__cards__vars:not(:last-child) {
  margin-bottom: 32px;
}

.services__card__item .title_h4 {
  font-size: 20px;
  margin-bottom: 18px;
}

/*  */
.service__item_1,
.service__item_4 {
  transform: translateY(-380px);
}

.title_h4_animate,
.description_animate {
  opacity: 0.6;
}

.services__cards__vars_animate {
  opacity: 0;
}

/*  */
.service__item_2 {
  transform: translateY(-286px);
}

/*  */
.service__item_3 {
  transform: translateY(-348px);
}

/*  */
.service__title_img {
  flex-shrink: 0;
  width: 38px;
}

/*  */
.services__cards__link .job__link {
  font-family: var(--fontFamily-Unbounded);
  font-size: 14px;
  line-height: 100%;
  border-top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
}

/* ==================== Медиа запросы */
@media (hover: none) and (pointer: coarse) {
  .services__card__item {
    opacity: 1;
  }

  .service__item_1,
  .service__item_2,
  .service__item_3,
  .service__item_4 {
    transform: translateY(0);
  }

  .title_h4_animate,
  .description_animate,
  .services__cards__vars_animate {
    opacity: 1;
  }
}

@media (max-width: 1918px) {
  .service__item_1,
  .service__item_2,
  .service__item_3,
  .service__item_4 {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .swiper_services .swiper-slide {
    width: 350px;
  }

  .services__card__item {
    background-color: #060e1b;
    border-radius: 32px;
    padding: 24px;
  }

  .services__card__item .title_h3 {
    padding-bottom: 24px;
    margin-bottom: 24px;
  }

  .service__title_img {
    width: 40px;
  }

  .services__card__item .title_h4 {
    margin-bottom: 12px;
  }

  .services__cards__vars:not(:last-child) {
    padding-bottom: 24px;
    margin-bottom: 24px;
  }
}

@media (max-width: 576px) {
  .swiper_services .swiper-wrapper {
    row-gap: 30px;
  }

  .swiper_services .swiper-slide {
    width: 320px;
  }

  .services__card__item {
    border-radius: 26px;
    padding: 20px;
  }

  .service__title_img {
    width: 33px;
  }
}
</style>
