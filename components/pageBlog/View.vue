<script setup lang="ts">
import { localStorageUtil } from '@/utils/localStorage.utils';

/*  */
const props = defineProps<{
  id: number;
  count: number;
}>();

//
const { domains } = useRuntimeConfig().public;

// Отправка изменения количества на сервер
const sendCount = async () => {
  const res = await $fetch<number>(`${domains}/wp-json/count-view/change-count`, {
    method: 'POST',
    body: { id: props.id },
  });

  // console.log(res);
};

// Ключ хранилища
const keyStorage = 'view';

// Запись в локальное хранилище
const setLocalStorage = async () => {
  const loc = (localStorageUtil.getStorage(keyStorage) as number[]) || [];

  if (!loc.includes(props.id)) {
    try {
      await sendCount();
      loc.push(props.id);
      localStorageUtil.setStorage(keyStorage, loc);
    } catch (error) {
      console.log('Количество просмотров не изменилось');
    }
  }
};

//
onMounted(() => {
  setLocalStorage();
});
</script>

<template>
  <div class="article_full_view">
    <span><img src="/public/img/article/view.svg" alt="" /></span>
    <span>{{ count }}</span>
  </div>
</template>

<style lang="css" scoped></style>
