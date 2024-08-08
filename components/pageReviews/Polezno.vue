<script setup lang="ts">
import { localStorageUtil } from '~/utils/localStorage.utils';

//
const { domains } = useRuntimeConfig().public;

// Хранилище для отметок понравившимся
const likes = useCountLikes();

//
const props = defineProps<{
  id: number;
  count: number;
  title: string;
}>();

const emit = defineEmits<{
  currentCount: [val: number]; // возвращает в родительский компонент новое количество с сервера (возможно не используется)
  currentChecked: [val: boolean]; // возвращает в родительский компонент информацию об состоянии активности кнопки (возможно не используется)
}>();

// Ключ хранилища
const nameStorage = 'useful';

//
const isCheckedCount = ref(false);
const countLocal = ref<number>(props.count);

// Установка количества понравившимся
likes.value = props.count;

// Получение данных из хранилища
const getLocaleStorage = () => {
  return (localStorageUtil.getStorage(nameStorage) as number[]) || [];
};

// При начальной загрузки страницы
const loadPage = () => {
  const res = getLocaleStorage();

  if (res && res.includes(props.id)) {
    isCheckedCount.value = true;
    emit('currentChecked', isCheckedCount.value);
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
    likes.value = resCount; // Установка количества понравившимся

    emit('currentCount', countLocal.value);

    const res = getLocaleStorage();

    if (isCheckedCount.value) {
      res.push(props.id);
    } else {
      res.splice(res.indexOf(props.id), 1);
    }

    localStorageUtil.setStorage(nameStorage, res);
  } catch (error) {
    console.log(error);
  }
};

// Клик по кнопке
const changeCount = () => {
  isCheckedCount.value = !isCheckedCount.value;

  emit('currentChecked', isCheckedCount.value);

  if (isCheckedCount.value) {
    sendChangeCount('count-plus');
  } else {
    sendChangeCount('count-minus');
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

    <span class="rticle_full_useful__title">{{ title }}</span>

    <span class="rticle_full_useful__count">{{ countLocal }}</span>
  </button>
</template>

<style lang="css" scoped>
.rticle_full_useful__btn {
  width: 223px;
  height: 51px;
  font-family: var(--fontFamily-NeueMachina);
  background-color: transparent;
  border: 2px solid #40b6b7;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
  padding: 0;
}

.rticle_full_useful__hart {
  width: 19px;
  height: 19px;
  stroke: var(--accentColor);
  fill: transparent;
  margin-top: 4px;
}

.rticle_full_useful__title {
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  color: var(--colorDark3);
}

.rticle_full_useful__count {
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  color: #b9b9b9;
  margin-top: 2px;
}

.rticle_full_useful__btn.active {
  background-color: var(--accentColor);
}

.rticle_full_useful__btn.active .rticle_full_useful__hart {
  stroke: white;
  fill: white;
}

.rticle_full_useful__btn.active .rticle_full_useful__title {
  color: white;
}

.rticle_full_useful__btn.active .rticle_full_useful__count {
  color: white;
  opacity: 0.6;
}
</style>
