<script setup lang="ts">
import { replaceSpace } from '@/utils/utils';
import type { TypeBlogCategories } from '@/types/blog-page/blogHome.types';

const props = defineProps<{
  categories: TypeBlogCategories[];
  activeClassBtn: string;
}>();

//
const emit = defineEmits<{
  changeTag: [title: string];
}>();

// Подсчёт всех записей блога
const allCount = computed(() => props.categories.reduce((acc, item) => (acc += item.count), 0));

// Активный класс кнопок
const activeClassBtnLocal = ref(props.activeClassBtn);

// Выбор кнопок дочерней категории
const changeNameBtm = (name: string) => {
  emit('changeTag', name);
};

//
watch(
  () => props.activeClassBtn,
  (val) => {
    activeClassBtnLocal.value = val;
  },
);
</script>

<template>
  <div class="works_tabs">
    <button
      type="button"
      :class="['works_tabs__btn control', activeClassBtnLocal === 'all' && 'active']"
      data-filter="all"
      @click="changeNameBtm('all')"
    >
      <span class="works_tabs__btn_title">Все</span>
      <span class="works_tabs__btn_count">{{ allCount }}</span>
    </button>

    <template v-for="item in categories" :key="item.name">
      <button
        v-if="item.count"
        type="button"
        :class="['works_tabs__btn control', activeClassBtnLocal === item.name && 'active']"
        :data-filter="`.${replaceSpace(item.name)}`"
        @click="changeNameBtm(item.name)"
      >
        <span class="works_tabs__btn_title">{{ item.name }}</span>
        <span class="works_tabs__btn_count">{{ item.count }}</span>
      </button>
    </template>
  </div>
</template>

<style lang="css" scoped>
.works_tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 600px) {
    width: auto;
  }

  @media (max-width: 576px) {
    flex-wrap: nowrap;
    gap: 14px;
    padding: 0 20px;
    overflow-x: auto;
    margin: 0 -20px 32px -20px;
  }
}

.works_tabs::-webkit-scrollbar {
  height: 0;
}

.works_tabs__btn {
  height: 71px;
  font-family: var(--fontFamily-Unbounded);
  font-size: 18px;
  color: white;
  background-color: #060e1b;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
  border: none;
  border-radius: 18px;
  padding: 0 34px;

  /*  */
  @media (max-width: 768px) {
    height: 61px;
    font-size: 16px;
    border-radius: 16px;
    padding: 20px 30px;
  }

  @media (max-width: 576px) {
    height: 49px;
    padding: 14px 22px;
  }
}

.works_tabs__btn.active {
  background-color: var(--accentColor2);
}

.works_tabs__btn_count {
  color: rgba(255, 255, 255, 0.25);
}

.works_tabs__btn.active .works_tabs__btn_count {
  color: var(--colorTextOpacity06);
}

/*  */
.works_tabs_children {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
}
</style>
