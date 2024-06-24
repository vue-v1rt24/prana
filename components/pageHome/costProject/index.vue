<script setup lang="ts">
import { gsap } from 'gsap';
import type { TypeNextProjectCostVarianty } from '@/types/home-page/nextProjectCostVarianty.types';

const props = defineProps<{
  title: string;
  desc: string;
  nextProjectVars: TypeNextProjectCostVarianty[];
}>();

// Управление модальным окном
const { isOpenModal, dopDate, isVisibleBtnProject, isSendFormSuccess } = useOutsideModal();

//
const dataCheckedVariant = ref<boolean[]>([]);
const isCheckedParentVariant = ref(false);

// Сброс данных расчёта
const resetDopData = () => {
  dopDate().value = {};
};

//
const selectVariants = (idx: number, val: boolean) => {
  // Помещаем выбранные варианты с их значениями в массив.
  // Если такой вариант уже добавлен, то будет изменено его значение
  dataCheckedVariant.value[idx] = val;

  // Проверяем значения вариантов
  const isSelect = dataCheckedVariant.value.some((item) => item);

  if (!isSelect) {
    resetDopData();
  }

  if (isSelect !== isCheckedParentVariant.value) {
    isCheckedParentVariant.value = isSelect;
  } else {
    return;
  }

  // Запускаем анимацию для изменения текста кнопки формы
  if (isCheckedParentVariant.value) {
    gsap.to('.calculation__btn .blue_btn__title', {
      keyframes: [
        { duration: 0.3, x: -100, opacity: 0 },
        { duration: 0.3, textContent: 'Рассчитать стоимость', x: 0, opacity: 1 },
      ],
    });
  } else {
    gsap.to('.calculation__btn .blue_btn__title', {
      keyframes: [
        { duration: 0.3, x: -100, opacity: 0 },
        { duration: 0.3, textContent: 'Нужна консультация', x: 0, opacity: 1 },
      ],
    });
  }
};

// Формирование данных для отправки на почту
const setFormData = (data: TypeNextProjectCostVarianty[]) => {
  resetDopData();

  for (const item of data) {
    const isSelect = item.uslugi.some((v) => v.selected);

    if (isSelect) {
      dopDate().value[item.nextProjectCostUslugiRepeatNazvanie] = item.uslugi
        .filter((f) => f.selected)
        .map((m) => m.nextProjectCostUslugaRepeatNazvanie);
    }
  }
};

// Открытие модального окна и отправка в него данных расчёта
const openModal = () => {
  // Отправка данных в форму модального окна
  if (isCheckedParentVariant.value) {
    const isCheckedChildVariant = props.nextProjectVars.some((item) =>
      item.uslugi.some((us) => us.selected),
    );

    if (isCheckedChildVariant) {
      setFormData(props.nextProjectVars);
    } else {
      resetDopData();
    }
  }

  // Скрытие/Показ кнопок в модальном окне
  if (isCheckedParentVariant.value) {
    isVisibleBtnProject().value = true;
  } else {
    isVisibleBtnProject().value = false;
  }

  // Открытие модального окна
  isOpenModal().value = true;
};
</script>

<template>
  <section class="calculation_bx">
    <div class="container">
      <div class="calculation">
        <div class="calculation__header">
          <h2 class="title_52" v-html="title"></h2>
          <p class="description calculation__description" v-html="desc"></p>
        </div>

        <form class="calculation__form">
          <PageHomeCostProjectItem
            v-for="(service, idx) in nextProjectVars"
            :key="service.nextProjectCostUslugiRepeatNazvanie"
            :service
            @select-variant="selectVariants(idx, $event)"
            :reset="isSendFormSuccess().value"
          />

          <!--  -->
          <UiButton class="calculation__btn" title="Нужна консультация" @click-btn="openModal" />
        </form>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.calculation_bx {
  background-color: var(--colorDark4);
  border-radius: 72px 72px 0px 0px;
  padding: 160px 0;
}

/*  */
.calculation__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calculation__header .title_52 {
  margin-bottom: 0;
}

.description.calculation__description {
  max-width: 470px;
  font-size: 20px;
  padding-right: 50px;
}

/*  */
.calculation__form {
  border-top: var(--border);
  margin-top: 150px;
}

/*  */
.calculation__btn {
  width: 458px;
  height: 103px;
  margin: 54px auto 0 auto;
}

.calculation__btn :deep(.blue_btn__title) {
  width: 307px;
}

/* ==================== Медиа запросы */
@media (max-width: 1600px) {
  .calculation__header {
    flex-direction: column;
    align-items: flex-start;
    row-gap: 36px;
  }

  .description.calculation__description {
    max-width: 900px;
  }
}

@media (max-width: 768px) {
  .calculation_bx {
    padding: 140px 0;
  }

  .calculation__form {
    margin-top: 58px;
  }

  .calculation__btn {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .calculation_bx {
    border-radius: 32px 32px 0px 0px;
    padding: 80px 0 80px 0;
  }

  .description.calculation__description {
    font-size: 15px;
  }

  .calculation__form {
    margin-top: 42px;
  }

  .calculation__btn {
    height: 80px;
  }

  .calculation__btn :deep(.blue_btn__title) {
    width: 230px;
  }
}
</style>
