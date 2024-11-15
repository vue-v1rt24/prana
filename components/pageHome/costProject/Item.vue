<script setup lang="ts">
import { type TypeNextProjectCostVarianty } from '@/types/home-page/nextProjectCostVarianty.types';
import { gsap } from 'gsap';

//
const props = defineProps<{
  service: TypeNextProjectCostVarianty;
  reset?: boolean;
}>();

const emit = defineEmits<{
  selectVariant: [val: boolean];
}>();

//
const isChecked = ref(false);
const resetSelectVariant = ref(false); // для сброса вариантов
const hiddenBlock = ref<HTMLDivElement | null>(null); // для показа и скрытия блока с вариантами

// Показ скрытой части (варианты)
const changeCheckBox = () => {
  if (isChecked.value) {
    gsap.to(hiddenBlock.value, {
      duration: 0.6,
      height: 'auto',
      onComplete() {
        resetSelectVariant.value = false;
        emit('selectVariant', true);
      },
    });
  } else {
    gsap.to(hiddenBlock.value, {
      duration: 0.6,
      height: 0,
      onComplete() {
        resetSelectVariant.value = true;
        emit('selectVariant', false);
      },
    });
  }
};

//
watch(
  () => isChecked.value,
  () => {
    changeCheckBox();
  },
);

watch(
  () => props.reset,
  () => {
    isChecked.value = false;
    changeCheckBox();
  },
);
</script>

<template>
  <fieldset class="calculation__field">
    <div class="calculation__service">
      <h3 class="title_h3">
        <span class="service__title_img">
          <img :src="service.nextProjectCostUslugiRepeatIzbrazhenie?.node.mediaItemUrl" alt="" />
        </span>
        {{ service.nextProjectCostUslugiRepeatNazvanie }}
      </h3>

      <div class="description calculation__service__description">
        {{ service.nextProjectCostVariantyRepeatOpisanie }}
      </div>

      <label class="checkbox">
        <input
          :class="['checkbox__inp', { checked: isChecked }]"
          type="checkbox"
          :value="service.nextProjectCostUslugiRepeatNazvanie"
        />
        <span class="checkbox__check" @click="isChecked = !isChecked"></span>
      </label>
    </div>

    <div class="calculation__variants_wrap" ref="hiddenBlock">
      <div class="calculation__variants">
        <PageHomeCostProjectVariant
          v-for="item in service.uslugi"
          :key="item.nextProjectCostUslugaRepeatNazvanie"
          :usluga="item"
          :reset="resetSelectVariant"
        />
      </div>
    </div>
  </fieldset>
</template>

<style lang="css" scoped>
.calculation__field {
  border-bottom: var(--border);
}

.calculation__service {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 54px 0;
}

.calculation__service .title_h3 {
  width: 370px;
  font-size: 42px;
  column-gap: 16px;
}

.calculation__service .service__title_img {
  width: 50px;
  flex-shrink: 0;
}

.description.calculation__service__description {
  max-width: 680px;
  font-size: 18px;
  margin: 0 100px;
}

/*  */
.checkbox {
  margin-right: 364px;
}

/* Чекбокс */
.checkbox__inp {
  appearance: none;
  visibility: hidden;
  display: none;
}

.checkbox__check {
  position: relative;
  width: 86px;
  height: 46px;
  background-color: var(--colorDark3);
  border-radius: 23px;
  /* cursor: pointer; */
  display: block;
  overflow: hidden;
  transition: 0.5s ease-in;
}

.checkbox__inp.checked ~ .checkbox__check {
  background-color: var(--accentColor);
}

.checkbox__check::before {
  content: '';
  position: absolute;
  top: 6px;
  left: 6px;
  width: 34px;
  height: 34px;
  background-color: var(--accentColor);
  border-radius: 50%;
  transition: 0.5s ease-in;
}

.checkbox__inp.checked ~ .checkbox__check::before {
  background-color: white;
  transform: translateX(40px);
}
/* /Чекбокс */

/*  */
.calculation__variants_wrap {
  height: 0;
  overflow: hidden;
}

.calculation__variants {
  display: grid;
  grid-template-columns: repeat(auto-fill, 445px);
  gap: 20px;
  padding-bottom: 54px;
}

/* ==================== Медиа запросы */
@media (max-width: 1800px) {
  .checkbox {
    margin-right: 0;
  }
}

@media (max-width: 1350px) {
  .description.calculation__service__description {
    max-width: 499px;
  }
}

@media (max-width: 1199px) {
  .calculation__service {
    flex-wrap: wrap;
  }

  .calculation__service .title_h3 {
    width: auto;
  }

  .description.calculation__service__description {
    width: 100%;
    max-width: none;
    order: 1;
    margin: 0;
  }

  .calculation__service {
    padding: 62px 0 62px 0;
  }

  .calculation__service .title_h3 {
    margin-bottom: 30px;
  }

  .calculation__service__description br {
    display: none;
  }
}

@media (max-width: 1024px) {
  .calculation__variants[data-v-803daf82] {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 992px) {
  .calculation__variants {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .calculation__service {
    padding: 38px 0 38px 0;
  }

  .calculation__variants {
    padding-bottom: 38px;
  }
}

@media (max-width: 767px) {
  .calculation__variants {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .calculation__service {
    padding: 24px 0 24px 0;
  }

  .calculation__service .title_h3 {
    font-size: 22px;
    column-gap: 10px;
    margin-bottom: 20px;
  }

  .calculation__service .service__title_img {
    width: 29px;
  }

  .description.calculation__service__description {
    font-size: 14px;
  }

  .checkbox__check {
    width: 65px;
    height: 35px;
  }

  .checkbox__check::before {
    top: 5px;
    left: 5px;
    width: 25px;
    height: 25px;
  }

  .checkbox__inp.checked ~ .checkbox__check::before {
    transform: translateX(30px);
  }
}
</style>
