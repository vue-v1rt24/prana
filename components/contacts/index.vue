<script setup lang="ts">
import { gsap } from 'gsap';

//
const theme = useTheme();

//
const mm = gsap.matchMedia();

//
onMounted(() => {
  mm.add('(max-width: 1200px)', () => {
    const dataCompanyLeft = document.querySelector('.data_company__left');
    const mapWrap = document.querySelector('.map_wrap');
    const dataCompanyForm = document.querySelector('.data_company__form');

    if (dataCompanyLeft && mapWrap && dataCompanyForm) {
      mapWrap.after(dataCompanyForm);

      return () => {
        dataCompanyLeft.after(dataCompanyForm);
      };
    }
  });
});
</script>

<template>
  <section id="contacts" :class="['blog_bx', { dark: theme === 'dark', light: theme === 'light' }]">
    <div class="container">
      <h2 class="blog_bx__title">Контакты</h2>

      <div class="data_company">
        <div class="data_company__left">
          <!-- Карта -->
          <ContactsMap />

          <!-- Вакансии -->
          <ContactsVacancyContacts />
        </div>

        <!-- Свяжитесь с нами -->
        <ContactsForm />
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.blog_bx {
  position: relative;
  background-color: var(--colorDark3);
  border-radius: 72px 72px 0px 0px;
  padding: 160px 0 80px 0;

  @media (max-width: 700px) {
    padding: 160px 0 38px 0;
  }

  @media (max-width: 576px) {
    border-radius: 32px 32px 0px 0px;
    padding: 80px 0 38px 0;
  }
}

.blog_bx::before,
.blog_bx::after {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100px;
  height: 100px;
  background-color: var(--colorDark4);
  z-index: -1;
}

.blog_bx::after {
  left: auto;
  right: 0;
}

/*  */
.blog_bx.dark {
  background-color: var(--colorDark4);
}

.blog_bx.dark::before,
.blog_bx.dark::after {
  background-color: var(--colorDark3);
}

/*  */
.blog_bx.light {
  background-color: var(--colorDark4);
}

.blog_bx.light::before,
.blog_bx.light::after {
  background-color: var(--colorTextWhite);
}

/*  */
.blog_bx__title {
  font-family: var(--fontFamily-Unbounded);
  font-size: 52px;
  line-height: 100%;
  letter-spacing: 0.02em;

  @media (max-width: 576px) {
    font-size: 26px;
  }
}

/*  */

.data_company {
  position: relative;
  display: grid;
  grid-template-columns: minmax(500px, 1155px) minmax(500px, 685px);
  gap: 20px;
  margin-top: 62px;

  @media (max-width: 1200px) {
    display: block;
    /* grid-template-columns: 1fr; */
    /* gap: 40px; */
  }

  @media (max-width: 576px) {
    margin-top: 42px;
  }
}
</style>
