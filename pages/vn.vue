<script setup lang="ts">
// Заглушка. Включить в файле nuxt.config.ts в настройке routeRules
</script>

<template>
  <div class="zaglushka_bx">
    <img class="zaglushka" src="/zaglushka.jpg" alt="" />
  </div>
</template>

<style lang="css" scoped>
:global(body) {
  overflow: hidden;
}

.zaglushka_bx {
  position: fixed;
  inset: 0;
  background-color: #030810;
  z-index: 1500;
}

.zaglushka {
  position: fixed;
  inset: 0;
  z-index: 1501;
}
</style>
