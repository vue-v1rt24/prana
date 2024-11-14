<script setup lang="ts"></script>

<template>
  // Заглушка
  <div class="zaglushka_bx">
    <img class="zaglushka" src="/zaglushka.jpg" alt="" />
  </div>
</template>

<style lang="css" scoped>
.zaglushka_bx {
  position: fixed;
  inset: 0;
  background-color: #030810;
  z-index: 99;
}

.zaglushka {
  position: fixed;
  inset: 0;
  z-index: 100;
}
</style>
