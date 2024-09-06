<script setup lang="ts">
import '~/assets/css/vacancies-contacts.css';

const viewport = useViewport();
</script>

<template>
  <div v-if="viewport.isGreaterOrEquals('screen576')" class="job vacancy">
    <div class="title_h4 job__title_h4">Вакансии</div>

    <div class="job__lists">
      <div class="job__lists_item">
        <div class="title_20_500_130">Веб-дизайнер</div>

        <p class="job__lists__desc">
          В своём стремлении улучшить пользовательский опыт мы упускаем, что сделанные на базе
          интернет- аналитики
        </p>
      </div>

      <div class="job__lists_item">
        <div class="title_20_500_130">BackEnd разработчик</div>
        <p class="job__lists__desc">
          Вот вам яркий пример современных тенденций — укрепление и развитие внутренней структуры
          обеспечивает широкому кругу
        </p>
      </div>
    </div>

    <UiLinkText link="/vacancies" title="Смотреть все вакансии" />
  </div>
</template>

<style lang="css" scoped></style>
