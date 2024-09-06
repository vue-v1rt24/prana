<script setup lang="ts">
import { useActiveBtnCategoryPortfolio } from '~/composables/useLocalStorages';

const props = defineProps<{
  catName: string;
}>();

const emit = defineEmits<{
  changeTagSub: [name: string];
}>();

//
const changeNameBtm = () => {
  emit('changeTagSub', props.catName);
};
</script>

<template>
  <button
    type="button"
    :class="['btn_sub_cat', useActiveBtnCategoryPortfolio().value.child === catName && 'active']"
    @click="changeNameBtm"
  >
    <span class="works__tag_hash">#</span>
    <span class="btn_sub_cat__title">{{ catName }}</span>
  </button>
</template>

<style lang="css" scoped>
.btn_sub_cat {
  height: 46px;
  font-family: var(--fontFamily-NeueMachina);
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  color: white;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0 16px;

  &.active {
    color: var(--colorDark3);
    background-color: white;
  }
}
</style>
