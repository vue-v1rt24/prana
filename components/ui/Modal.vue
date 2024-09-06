<script setup lang="ts">
import * as FancyboxAll from '@fancyapps/ui';

//
const { Fancybox } = FancyboxAll;

//
const modalOpen = () => {
  Fancybox.show([{ src: '#modal', type: 'inline' }], {
    // closeButton: false,
    autoFocus: false,
    dragToClose: false,
  });
};

//
onUnmounted(() => {
  Fancybox.destroy();
});

//
defineExpose({
  modalOpen,
});
</script>

<template>
  <div id="modal" class="modal">
    <slot />
  </div>
</template>

<style lang="css" scoped>
.modal {
  display: none;
  background-color: transparent;
  padding: 0;
}
</style>
