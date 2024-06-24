<script setup lang="ts">
import { type TypeHeaderSettings } from '@/types/header.types';
import { useModalMenu } from '@/composables/useModalMenu';

//
const route = useRoute();
const { graphqlUrl } = useRuntimeConfig().public;
const { resizeHeightMenu, addRemoveClassBody } = useModalMenu();
const menuPositionRelative = ref<Boolean>(false);
const dotsMenu = ref<HTMLDivElement | null>(null);

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
              <li><a href="team.html">Команда</a></li>
              <li><NuxtLink to="/blog">Блог</NuxtLink></li>
              <li><NuxtLink to="/blog">Наша продукция</NuxtLink></li>
              <li><a href="#">Контакты</a></li>
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

.menu {
  font-weight: 400;
  font-size: 17px;
  display: flex;
  align-items: center;
  column-gap: 60px;
}

/*  */
.header__tel {
  font-family: var(--fontFamily-RFDewi);
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  text-transform: uppercase;
}

/*  */
.header__menu_dots {
  display: flex;
  align-items: center;
  column-gap: 12px;
  cursor: pointer;
}

.header__menu_dots span {
  width: 15px;
  height: 15px;
  background-color: var(--accentColor);
  border-radius: 50%;
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
@media (max-width: 1600px) {
  .header__nav {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-18px);
    transition: opacity 0.3s, visibility 0.3s, transform 0.3s;

    position: absolute;
    top: 118px;
    right: 29px;
    width: 320px;
    text-align: center;
    background-color: white;
    border-radius: 26px;
    padding: 18px;
    overflow: scroll;
  }

  .header__nav.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .header__nav a {
    color: #121212;
  }

  .menu {
    flex-direction: column;
  }

  .menu li {
    width: 100%;
    margin-bottom: 10px;
  }

  .menu a {
    height: 65px;
    background-color: #f4f4f4;
    backdrop-filter: blur(29.5px);
    border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
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
