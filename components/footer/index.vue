<script setup lang="ts">
import { upPage } from '~/utils/utils';

//
const viewport = useViewport();

// Управление модальным окно формы
const { isOpenModal } = useOutsideModal();

//
const theme = useTheme();

// Даём активный класс меню "Блог" и "Отзывы", когда находимся на их внутренних страницах
const { blogChildrenActiveMenu } = useChildrenActiveMenu();
const { reviewChildrenActiveMenu } = useChildrenActiveMenu();
</script>

<template>
  <footer :class="['footer_bx', { dark: theme === 'dark', light: theme === 'light' }]">
    <div class="container">
      <div class="footer">
        <div class="footer__logo_bx">
          <div class="footer__logo" @click="upPage"><img src="/img/logo.svg" alt="" /></div>
          <div class="footer__copy">© {{ new Date().getFullYear() }}, LLC PRANA IT</div>
          <div class="footer__politico">
            <NuxtLink to="/privacy">Политика конфиденциальности</NuxtLink>
          </div>
        </div>

        <ul v-if="viewport.isGreaterOrEquals('screen1280')" class="footer__menu">
          <HeaderModalMenuPortfolio footer />

          <li class="menu-item">
            <a href="#">Услуги</a>

            <ul class="sub-menu">
              <li class="menu-item">
                <NuxtLink to="/razrabotka">Разработка</NuxtLink>
              </li>
              <li class="menu-item">
                <NuxtLink to="/branding">Брендинг</NuxtLink>
              </li>
              <li class="menu-item">
                <NuxtLink to="/foto-video">Фото/видео</NuxtLink>
              </li>
              <!-- <li class="menu-item">
                <NuxtLink to="/promotion">Продвижение</NuxtLink>
              </li> -->
            </ul>
          </li>

          <li class="menu-item">
            <NuxtLink to="/comanda">Команда</NuxtLink>

            <ul class="sub-menu">
              <li class="menu-item">
                <NuxtLink to="/blog" :class="{ active: blogChildrenActiveMenu().value }">
                  Блог
                </NuxtLink>
              </li>
              <!-- <li class="menu-item">
                <NuxtLink to="/reviews" :class="{ active: reviewChildrenActiveMenu().value }">
                  Отзывы
                </NuxtLink>
              </li> -->
              <!-- <li class="menu-item">
                <NuxtLink to="/vacancies">Вакансии</NuxtLink>
              </li> -->
              <!-- <li class="menu-item">
                <NuxtLink to="/products">Наша продукция</NuxtLink>
              </li> -->
              <li class="menu-item">
                <a href="#">Контакты</a>
              </li>
            </ul>
          </li>
        </ul>

        <ul class="footer__links">
          <li>
            <UiLinkText
              link="/presents_parana_it.pdf"
              target="_blank"
              class="close_menu"
              title="Презентация компании"
              underline
            />
          </li>

          <li>
            <UiLinkText title="Начать проект" underline @click="isOpenModal().value = true" />
          </li>

          <li>
            <UiLinkText title="Бриф на разработку" underline link="/brief" />
          </li>

          <li>
            <a href="https://arda.digital" target="_blank">
              <img src="/public/img/arda.svg" alt="" />
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Модальное окно формы -->
    <LazyOutsideModal />
  </footer>
</template>

<style lang="css" scoped>
.footer_bx {
  background-color: var(--colorDark3);
  overflow: hidden;

  &.dark {
    background-color: var(--colorDark4);
  }

  &.light {
    background-color: var(--colorDark4);
  }
}

.footer {
  position: relative;
  display: flex;
  border-top: var(--border);
  padding: 80px 0 150px 0;

  @media (max-width: 1700px) {
    justify-content: space-between;
  }

  @media (max-width: 700px) {
    justify-content: center;
    padding: 38px 0 160px 0;
  }
}

/*  */
.footer__logo_bx {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 206px;

  @media (max-width: 1700px) {
    margin-right: 0;
  }

  @media (max-width: 700px) {
    text-align: center;
  }
}

.footer__copy {
  font-weight: 300;
  font-size: 16px;
  line-height: 100%;
  color: #7c838d;
  margin: auto 0 26px 0;

  @media (max-width: 576px) {
    font-size: 16px;
  }
}

/*  */
.footer__logo {
  @media (max-width: 700px) {
    margin-bottom: 240px;
  }

  @media (max-width: 576px) {
    margin-bottom: 200px;
  }
}

.footer__logo img {
  width: 263px;

  @media (max-width: 700px) {
    width: 230px;
  }

  @media (max-width: 576px) {
    width: 178px;
  }
}

/*  */
.footer__menu {
  display: flex;
  column-gap: 103px;
  padding-top: 13px;
}

.footer__menu .menu-item a {
  display: block;
  margin-bottom: 24px;
}

.footer__menu .menu-item {
  font-size: 18px;
}

.footer__menu .menu-item .sub-menu .menu-item:not(:last-child) {
  margin-bottom: 18px;
}

.footer__menu .menu-item .sub-menu .menu-item a {
  font-size: 16px;
  font-weight: 300;
  color: #b7bec9;
  margin-bottom: 0;
  transition: color 0.5s;
}

.footer__menu .menu-item .sub-menu .menu-item a:hover,
.footer__menu .menu-item .sub-menu .menu-item a.active {
  color: var(--accentColor);
}

/*  */
.footer__links {
  display: flex;
  flex-direction: column;
  padding-top: 13px;
  margin-left: auto;
  margin-right: 185px;

  @media (max-width: 1700px) {
    margin-left: 0;
    margin-right: 0;
  }

  @media (max-width: 700px) {
    position: absolute;
    top: 112px;
    align-items: center;
  }

  @media (max-width: 576px) {
    top: 94px;
  }
}

.footer__links .job__link {
  border-top: 0;
  padding-top: 0;
  margin-bottom: 28px;

  @media (max-width: 576px) {
    margin-bottom: 22px;
  }
}

/*  */
.footer__politico a {
  font-weight: 300;
  font-size: 16px;
  line-height: 100%;
  color: #7c838d;

  @media (max-width: 576px) {
    font-size: 14px;
  }
}
</style>
