<script setup lang="ts">
import { localStorageUtil } from '~/utils/localStorage.utils';

//
const { domains } = useRuntimeConfig().public;

//
const props = defineProps<{
  id: number;
  count: number;
}>();

// Ключ хранилища
const nameStorage = 'useful';

//
const isCheckedCount = ref(false);
const countLocal = ref<number>(props.count);

// Получение данных из хранилища
const getLocaleStorage = () => {
  return (localStorageUtil.getStorage(nameStorage) as number[]) || [];
};

// При начальной загрузки страницы
const loadPage = () => {
  const res = getLocaleStorage();

  if (res && res[props.id]) {
    isCheckedCount.value = true;
  }
};

// Запрос на сервер
const sendChangeCount = async (link: string) => {
  try {
    const resCount = await $fetch<number>(`${domains}/wp-json/${link}/change-count`, {
      method: 'POST',
      body: { id: props.id },
    });

    countLocal.value = resCount;

    const res = getLocaleStorage();

    if (isCheckedCount.value) {
      res.push(props.id);
    } else {
      // delete res[props.id];
    }

    console.log(res);

    localStorageUtil.setStorage(nameStorage, res);
  } catch (error) {
    console.log(error);
  }
};

// Клик по кнопке
const changeCount = () => {
  isCheckedCount.value = !isCheckedCount.value;

  if (isCheckedCount.value) {
    sendChangeCount('count-polezno-plus');
  } else {
    sendChangeCount('count-polezno-minus');
  }
};

//
onMounted(() => {
  loadPage();
});
</script>

<template>
  <button
    type="button"
    :class="['rticle_full_useful__btn', { active: isCheckedCount }]"
    @click="changeCount"
  >
    <div>
      <svg class="rticle_full_useful__hart">
        <use xlink:href="/img/sprite.svg#hart_mini"></use>
      </svg>
    </div>

    <span class="rticle_full_useful__title">Было полезно</span>

    <span class="rticle_full_useful__count">{{ countLocal }}</span>
  </button>
</template>

<style lang="css" scoped></style>
