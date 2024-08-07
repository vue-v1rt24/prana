<script setup lang="ts">
import { type TypeHeaderSettings } from '@/types/header.types';
import { useModalMenu } from '@/composables/useModalMenu';

//
const route = useRoute();
const { graphqlUrl } = useRuntimeConfig().public;
const { resizeHeightMenu, addRemoveClassBody } = useModalMenu();
const menuPositionRelative = ref<Boolean>(false);
const dotsMenu = ref<HTMLDivElement | null>(null);

// Даём активный класс меню "Блог", когда находимся на его внутренних страницах
const { blogChildrenActiveMenu, servicesChildrenActiveMenu } = useChildrenActiveMenu();

// Управление модальным окно формы
const { isOpenModal } = useOutsideModal();

// Запрос на получение данных
const settingsQuery = {
  query: `
    {
      settingsSitePage {
        settingsSite {
          logotip {
            node {
              mediaItemUrl
            }
          }
          logotipVModalnomMenyu {
            node {
              mediaItemUrl
            }
          }
          nomerTelefona
          nomerTelefonaMenedzhment
          settingPochta
          telegramLink
          vkLink
          whatsappLink
        }
      }
    }
`,
};

const { data } = await useFetch(graphqlUrl, {
  params: settingsQuery,
  transform(data) {
    const d = data as TypeHeaderSettings;

    return {
      logo: d.data.settingsSitePage.settingsSite.logotip.node.mediaItemUrl,

      logotipVModalnomMenyu:
        d.data.settingsSitePage.settingsSite.logotipVModalnomMenyu.node.mediaItemUrl,

      hotLine: d.data.settingsSitePage.settingsSite.nomerTelefona,
      nomerTelefonaMenedzhment: d.data.settingsSitePage.settingsSite.nomerTelefonaMenedzhment,
      settingPochta: d.data.settingsSitePage.settingsSite.settingPochta,

      telegramLink: d.data.settingsSitePage.settingsSite.telegramLink,
      vkLink: d.data.settingsSitePage.settingsSite.vkLink,
      whatsappLink: d.data.settingsSitePage.settingsSite.whatsappLink,
    };
  },
});

// Перемещение к блоку контактов
const movingContact = () => {
  document.getElementById('contacts')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

//
watchEffect(() => {
  if (route.path !== '/') {
    menuPositionRelative.value = true;
  } else {
    menuPositionRelative.value = false;
  }
});

//
onMounted(() => {
  dotsMenu.value?.addEventListener('click', () => {
    resizeHeightMenu();
    addRemoveClassBody();
  });
});
</script>

<template>
  <header :class="['header_bx', { header_bx_relative: menuPositionRelative }]">
    <div class="container">
      <div class="header">
        <div v-if="data?.logo" class="logo">
          <NuxtLink to="/">
            <img :src="data.logo" alt="" />
          </NuxtLink>
        </div>

        <div class="header__nav">
          <nav>
            <ul class="menu">
              <li><NuxtLink to="/portfolio">Портфолио</NuxtLink></li>
              <li>
                <NuxtLink to="/blog" :class="{ active: blogChildrenActiveMenu().value }">
                  Блог
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/services" :class="{ active: servicesChildrenActiveMenu().value }">
                  Услуги
                </NuxtLink>
              </li>
              <li><NuxtLink to="/comanda">Команда</NuxtLink></li>
              <li @click="movingContact"><a href="#">Контакты</a></li>
            </ul>
          </nav>
        </div>

        <!--  -->
        <div class="header__menu_dots" ref="dotsMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <!--  -->
        <a v-if="data?.hotLine" class="header__tel" :href="`tel:${data.hotLine}`">{{
          data.hotLine
        }}</a>

        <UiButton
          class="header_start_project_btn header__transparent"
          title="Начать проект"
          color-class="hover_bg btn_transparent"
          :arrow="false"
          @click-btn="isOpenModal().value = true"
        />
      </div>
    </div>
  </header>

  <!-- Появляющиеся меню -->
  <HeaderModalMenu
    :logo="data?.logotipVModalnomMenyu"
    :nomerTelefona="data?.hotLine"
    :nomerTelefonaMenedzhment="data?.nomerTelefonaMenedzhment"
    :settingPochta="data?.settingPochta"
    :telegramLink="data?.telegramLink"
    :vkLink="data?.vkLink"
    :whatsappLink="data?.whatsappLink"
  />
</template>

<style lang="css" scoped>
.header_bx {
  position: relative;
  z-index: 10;
  width: 100%;
  padding: 25px 0;
}

.header_bx_relative {
  background-color: rgba(6, 14, 27, 0.5);
  backdrop-filter: blur(23px);
  -webkit-backdrop-filter: blur(23px);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  width: 235px;
}

/*  */
.menu {
  font-weight: 400;
  font-size: 17px;
  display: flex;
  align-items: center;
  column-gap: 60px;
}

.menu li {
  @media (max-width: 1600px) {
    &:last-child {
      display: none;
    }
  }

  @media (max-width: 1450px) {
    &:nth-child(4) {
      display: none;
    }
  }

  @media (max-width: 1360px) {
    &:nth-child(3) {
      display: none;
    }
  }
}

.menu a {
  transition: color 0.5s;
}

.menu a:hover,
.menu a.active {
  color: var(--accentColor);
}

/*  */
.header__tel {
  font-family: var(--fontFamily-RFDewi);
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  text-transform: uppercase;
  transition: color 0.5s;
}

.header__tel:hover {
  color: var(--accentColor);
}

/*  */
.header__menu_dots {
  position: relative;
  display: flex;
  align-items: center;
  column-gap: 12px;
  cursor: pointer;
}

.header__menu_dots::before {
  content: '';
  position: absolute;
  inset: -20px;
}

.header__menu_dots span {
  width: 15px;
  height: 15px;
  background-color: var(--accentColor);
  border-radius: 50%;
}

.header__menu_dots:hover span:nth-child(1) {
  animation: animateDotsLeft 0.5s;
}

.header__menu_dots:hover span:nth-child(3) {
  animation: animateDotsRight 0.5s;
}

@keyframes animateDotsLeft {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes animateDotsRight {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
}

/*  */
.header__transparent {
  width: 234px;
  height: 62px;
  color: white;
  font-family: var(--fontFamily-RoadRadio);
  font-size: 20px;
  border-radius: 18px;
}

/* ==================== Медиа запросы */
@media (max-width: 1200px) {
  .header__nav {
    display: none;
  }
}

@media (max-width: 992px) {
  .header_start_project_btn {
    display: none;
  }

  .header__menu_dots {
    order: 1;
  }
}

@media (max-width: 768px) {
  .header__tel {
    margin-left: auto;
    margin-right: 61px;
  }

  .logo {
    width: 210px;
  }
}

@media (max-width: 700px) {
  .header__tel {
    display: none;
  }
}

@media (max-width: 576px) {
  .header_bx {
    padding: 19px 0;
  }

  .logo {
    width: 160px;
  }

  .header__nav {
    top: 92px;
    right: 20px;
    width: calc(100% - 38px);
  }

  .header__menu_dots span {
    width: 12px;
    height: 12px;
  }
}
</style>
