<script setup lang="ts">
import '~/assets/css/vacancies-contacts.css';

const viewport = useViewport();
</script>

<template>
  <div v-if="viewport.isGreaterOrEquals('screen576')" class="job vacancy">
    <div class="title_h4 job__title_h4">Вакансии</div>

    <div class="job__lists">
      <div class="job__lists_item">
        <div class="title_20_500_130">Компания PRANA IT ищет ярких и талантливых людей!</div>

        <p class="job__lists__desc">
          Мы постоянно развиваемся и запускаем новые масштабные проекты, поэтому всегда находимся в
          поиске сильных специалистов. Наша команда, в первую очередь, нацелена на саморазвитие и
          совершенствование, и мы будем рады увидеть рядом таких же смелых, энергичных и
          целеустремлённых профессионалов. По вопросам сотрудничества и трудоустройства обращайтесь
          по электронному адресу: info@pranait.ru
        </p>
      </div>
    </div>

    <!-- <UiLinkText link="/vacancies" title="Смотреть все вакансии" /> -->
  </div>
</template>

<style lang="css" scoped></style>
