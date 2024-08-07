<script setup lang="ts">
import '~/assets/css/vacancies-contacts.css';

defineProps<{
  goryachayLine: number;
  otdelProdazh: number;
  otdelRazrabotki: number;
}>();
</script>

<template>
  <div class="job contacts">
    <div class="title_h4 job__title_h4">Контакты</div>

    <div class="job__lists">
      <div class="job__lists_item">
        <div class="job__lists__desc">Номера</div>
        <a class="title_20_500_130" href="tel:88005008154">8 800 500 81 54</a>
        <a class="title_20_500_130" href="tel:+79391136690">+7 939 113 66 90</a>
        <a class="title_20_500_130" href="tel:+79383066690">+7 938 306 66 90</a>
      </div>

      <div class="job__lists_item">
        <div class="job__lists__desc">Email</div>
        <a class="title_20_500_130" href="mailto:info@pranait.ru">info@pranait.ru</a>

        <!-- Соцсети -->
        <ContactsSocial />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.contacts {
  padding-bottom: 0;
}

.contacts .job__lists__desc {
  margin-bottom: 10px;
}

.contacts .job__lists_item {
  margin-bottom: 0;
}

.contacts .job__lists {
  display: flex;
  column-gap: 125px;

  @media (max-width: 1800px) {
    flex-direction: column;
    row-gap: 26px;
  }

  @media (max-width: 576px) {
    row-gap: 24px;
  }
}
</style>
