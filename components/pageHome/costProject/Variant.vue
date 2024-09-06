<script setup lang="ts">
import { type TypeUslugi } from '@/types/home-page/nextProjectCostVarianty.types';

//
const props = defineProps<{
  usluga: TypeUslugi;
  reset: boolean; // для сброса вариантов
}>();

//
const inpVar = ref<HTMLInputElement | null>(null);

//
const selectVariant = () => {
  if (inpVar.value) {
    inpVar.value.checked = !inpVar.value.checked;
    props.usluga.selected = inpVar.value.checked;
  }
};

//
watch(
  () => props.reset,
  (val) => {
    if (val && inpVar.value) {
      inpVar.value.checked = false;
      props.usluga.selected = false;
    }
  },
);
</script>

<template>
  <div class="calculation__variants__item" @click="selectVariant">
    <div class="title_h4">{{ usluga.nextProjectCostUslugaRepeatNazvanie }}</div>

    <p
      class="description calculation__variants__description"
      v-html="usluga.nextProjectCostUslugaRepeatOpisanie"
    ></p>

    <label class="check">
      <input
        class="check__inp"
        type="checkbox"
        name="branding"
        :value="usluga.nextProjectCostUslugaRepeatNazvanie"
        ref="inpVar"
      />
      <span class="check__title check__title_n">Не выбрано</span>
      <span class="check__title check__title_y">Выбрано</span>
    </label>
  </div>
</template>

<style lang="css" scoped>
.calculation__variants__item {
  background-color: var(--colorDark3);
  border-radius: 42px;
  display: flex;
  flex-direction: column;
  border: 2px solid transparent;
  padding: 30px;
  transition: border 0.3s;
}

.calculation__variants__item .title_h4 {
  font-size: 26px;
  margin-bottom: 14px;
}

.description.calculation__variants__description {
  color: var(--colorTextOpacity06);
  line-height: 120%;
  margin-bottom: 32px;
}

.calculation__variants__item:has(.check__inp:checked) {
  border-color: var(--accentColor);
}

/* Чекбокс-галка */
.check {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  column-gap: 12px;
  margin-top: auto;
  pointer-events: none;
}

.check__inp {
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background-color: var(--colorDark4);
  /* cursor: pointer; */
  transition: background-color 0.3s, background-image 0.3s;
}

.check__inp:checked {
  background-color: var(--accentColor);
  background-image: url(/img/check.svg);
  background-repeat: no-repeat;
  background-position: center;
}

.check__title {
  font-size: 18px;
  font-weight: 400;
  line-height: 100%;
  user-select: none;
}

.check__title_n {
  color: var(--colorTextOpacity06);
}

.check__title_y {
  display: none;
  color: white;
}

.check__inp:checked ~ .check__title_n {
  display: none;
}

.check__inp:checked ~ .check__title_y {
  display: block;
}
/* /Чекбокс-галка */

/* ==================== Медиа запросы */
@media (max-width: 992px) {
  .calculation__variants__item {
    border-radius: 32px;
    padding: 24px;
  }

  .calculation__variants__item .title_h4 {
    font-size: 20px;
    margin-bottom: 12px;
  }

  .description.calculation__variants__description {
    font-size: 14px;
    margin-bottom: 18px;
  }

  .check__title {
    font-size: 16px;
  }
}

@media (max-width: 767px) {
  .calculation__variants__item {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .description.calculation__variants__description {
    width: 100%;
    order: 1;
  }

  .calculation__variants__item .check__title.check__title_n,
  .calculation__variants__item .check__title.check__title_y {
    display: none;
  }

  .check {
    margin-top: -4px;
  }
}

@media (max-width: 576px) {
  .calculation__variants__item {
    border-radius: 26px;
    padding: 20px;
  }

  .calculation__variants__item .title_h4 {
    font-size: 18px;
    margin-bottom: 14px;
  }

  .description.calculation__variants__description {
    font-size: 13px;
    margin-bottom: 0;
  }

  .check {
    width: 20px;
    height: 20px;
    display: block;
  }
}
</style>
