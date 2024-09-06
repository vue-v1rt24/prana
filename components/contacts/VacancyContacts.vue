<script setup lang="ts">
// Получение данных
const { dataContacts } = await useContacts();
// console.log(dataContacts.value);

//
const theme = useTheme();
</script>

<template>
  <div :class="['job_bx', { dark: theme === 'dark', light: theme === 'light' }]">
    <!-- Вакансии -->
    <ContactsVacancies />

    <!-- Контакты -->
    <ContactsContactBlock v-if="dataContacts?.contacts" :contacts="dataContacts.contacts" />
  </div>
</template>

<style lang="css" scoped>
.job_bx {
  display: grid;
  grid-template-columns: 450px 1fr;
  align-items: flex-start;
  column-gap: 20px;

  @media (max-width: 1600px) {
    grid-template-columns: 1fr;
    row-gap: 40px;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    margin-top: 40px;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 576px) {
    margin-top: 32px;
  }
}
</style>
