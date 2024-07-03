<script setup lang="ts">
const viewport = useViewport();
const theme = useTheme();
</script>

<template>
  <div :class="['job_bx', { dark: theme === 'dark' }]">
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

      <UiLinkText :link="`/`" title="Смотреть все вакансии" />
    </div>

    <!--  -->
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

.job {
  background-color: var(--colorDark4);
  backdrop-filter: blur(29.5px);
  -webkit-backdrop-filter: blur(29.5px);
  border-radius: 42px;
  padding: 40px;

  .dark & {
    background-color: var(--colorDark3);
  }

  @media (max-width: 576px) {
    border-radius: 24px;
    padding: 24px;
  }
}

.job__lists_item:not(:last-child) {
  margin-bottom: 32px;
}

.title_h4.job__title_h4 {
  font-size: 26px;
  border-bottom: var(--border);
  padding-bottom: 24px;

  @media (max-width: 576px) {
    font-size: 20px;
  }
}

.job__lists {
  padding: 32px 0;

  @media (max-width: 576px) {
    padding: 24px 0;
  }
}

.job__lists_item .title_20_500_130 {
  display: block;
}

.job__lists_item .title_20_500_130:not(:last-child) {
  margin-bottom: 10px;
}

.job__lists__desc {
  font-weight: 300;
  line-height: 120%;
  font-size: 16px;
  color: var(--colorTextOpacity06);
}

/*  */
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
