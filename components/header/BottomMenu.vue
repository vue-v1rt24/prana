<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { upPage, movingContact } from '~/utils/utils';

gsap.registerPlugin(ScrollTrigger);

//
const route = useRoute();

//
let mm = gsap.matchMedia();

//
const menuButton = ref<HTMLDivElement | null>(null);
const arrowUp = ref<HTMLDivElement | null>(null);
const menu = ref<HTMLDivElement | null>(null);
const startProjectBtn = ref<HTMLDivElement | null>(null);

const wArrowUp = ref<number | null>(null);
const wMenu = ref<number | null>(null);
const wStartProjectBtn = ref<number | null>(null);
const deff = ref<string>('+');
const finalPosition = 30;

// Для управления модальным меню
const { resizeHeightMenu, addRemoveClassBody } = useModalMenu();

// Управление модальным окно формы
const { isOpenModal } = useOutsideModal();

// Открытие модального меню
const openMenuSticky = () => {
  resizeHeightMenu();
  addRemoveClassBody();
};

//
onMounted(() => {
  // Анимация кнопок меню / разъезд кнопок
  const refreshData = () => {
    wArrowUp.value = arrowUp.value?.offsetWidth ?? 0;
    wMenu.value = menu.value?.offsetWidth ?? 0;
    wStartProjectBtn.value = startProjectBtn.value?.offsetWidth ?? 0;
  };

  //
  mm.add(
    {
      isDesktop: `(min-width: 1201px)`,
      isDesktopMax1200: `(max-width: 1200px)`,
      isDesktopMax1024: `(max-width: 1024px)`,
    },
    (context) => {
      const { isDesktop, isDesktopMax1200, isDesktopMax1024 } = context.conditions as any;

      if (isDesktopMax1200) {
        deff.value = '-';
      } else {
        deff.value = '+';
      }

      if (isDesktop || isDesktopMax1200 || isDesktopMax1024) {
        refreshData();
      }

      gsap.set(arrowUp.value, {
        left: `calc(50% - ((${wMenu.value}px / 2) ${deff.value} ${wArrowUp.value}px + 60px))`,
      });

      gsap.set(startProjectBtn.value, {
        right: `calc(50% - ((${wMenu.value}px / 2) + ${wStartProjectBtn.value}px + 60px))`,
      });
    },
  );

  //
  const tl = gsap.timeline({
    defaults: { duration: 1 },
    scrollTrigger: { trigger: 'body', start: 1000, scrub: true, end: 1500 },
  });

  tl.to(menuButton.value, {
    bottom: 20,
  });

  tl.to(arrowUp.value, {
    left: finalPosition,
  });

  tl.to(
    startProjectBtn.value,
    {
      right: finalPosition,
    },
    '<',
  );
});
</script>

<template>
  <div class="menu_button" ref="menuButton">
    <nav class="nav">
      <ul class="menu" ref="menu">
        <li class="menu_button__arrow_up react" ref="arrowUp" @click="upPage">
          <svg class="arrow_up">
            <use xlink:href="/public/img/sprite.svg#arrow_back"></use>
          </svg>
        </li>

        <li class="logo">
          <NuxtLink v-if="route.path !== '/'" to="/">
            <img src="/img/logo-footer.svg" alt="" />
          </NuxtLink>

          <img v-else src="/img/logo-footer.svg" alt="" @click="upPage" />
        </li>

        <li class="menu__item">
          <NuxtLink to="/portfolio">Портфолио</NuxtLink>
        </li>

        <li class="menu__item">
          <NuxtLink to="/blog">Блог</NuxtLink>
        </li>

        <li class="menu__item">
          <NuxtLink to="/services">Услуги</NuxtLink>
        </li>

        <li class="menu__item">
          <NuxtLink to="/comanda">Команда</NuxtLink>
        </li>

        <li class="menu__item" @click.prevent="movingContact"><a href="#">Контакты</a></li>

        <li class="dots" @click="openMenuSticky">
          <span></span>
          <span></span>
          <span></span>
        </li>
      </ul>
    </nav>

    <!--  -->
    <div class="menu_button_start_project__bx" ref="startProjectBtn">
      <UiButton
        class="menu_button_start_project"
        title="Начать проект"
        @click-btn="isOpenModal().value = true"
      />
    </div>
  </div>
</template>

<style lang="css" scoped>
.menu_button {
  position: fixed;
  bottom: -100%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  @media (max-width: 768px) {
    column-gap: 54px;
  }

  @media (max-width: 760px) {
    column-gap: 0;
  }
}

/*  */
.menu_button__arrow_up {
  position: absolute;
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background-color: var(--accentColor);
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;

  /*  */
  @media (max-width: 900px) {
    width: 50px;
    height: 50px;
    border-radius: 12px;
  }

  @media (max-width: 576px) {
    position: static;
    width: 40px;
    height: 40px;
    border-radius: 8px;
  }
}

.arrow_up {
  width: 26px;
  height: 26px;
  color: var(--colorTextWhite);
  rotate: 90deg;

  /*  */
  @media (max-width: 900px) {
    width: 22px;
    height: 22px;
  }

  @media (max-width: 576px) {
    width: 20px;
    height: 20px;
  }
}

/*  */
.logo {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background-color: var(--colorTextWhite);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--colorDark4);
  }

  /*  */
  @media (max-width: 900px) {
    width: 50px;
    height: 50px;

    img {
      width: 34px;
      height: 34px;
    }
  }

  @media (max-width: 576px) {
    display: none;
  }
}

/*  */
.nav {
  @media (max-width: 1200px) {
    margin-left: auto;
  }

  @media (max-width: 576px) {
    margin-left: 0;
  }
}

.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 12px;
  background-color: #f2f2f2;
  border-radius: 18px;
  padding: 14px;

  /*  */
  @media (max-width: 1200px) {
    margin-right: 30px;
  }

  @media (max-width: 1024px) {
    li:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 760px) {
    li:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 630px) {
    li:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 576px) {
    column-gap: 6px;
    border-radius: 12px;
    padding: 8px;
    margin-right: 0;
  }
}

.menu__item a {
  height: 60px;
  font-size: 17px;
  color: var(--colorDark3);
  background-color: var(--colorTextWhite);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 32px;
  border-radius: 12px;
  border: 2px solid transparent;
  transition: border 0.3s;

  /*  */
  @media (hover: hover) {
    &:hover {
      border-color: var(--accentColor);
    }
  }

  @media (hover: none) {
    &:active {
      border-color: var(--accentColor);
    }
  }

  /*  */
  @media (max-width: 900px) {
    height: 50px;
    font-size: 15px;
    padding: 0 24px;
  }

  @media (max-width: 576px) {
    height: 40px;
    font-size: 14px;
    border-radius: 8px;
    padding: 0 17px;
  }
}

.menu__item a.active {
  color: var(--colorTextWhite);
  background-color: var(--accentColor);
}

/*  */
.menu_button_start_project__bx {
  position: absolute;

  /*  */
  @media (max-width: 1500px) {
    display: none;
  }
}

.menu_button_start_project {
  width: 222px;
  height: 60px;
  font-family: var(--fontFamily-Unbounded);
  font-size: 14px;
  text-transform: uppercase;
  border-radius: 12px;
}

:deep(.blue_btn .btn__arrow .arrow) {
  width: 12px;
  height: 12px;
}

/*  */
.dots {
  display: none;
  height: 40px;
  background-color: var(--colorTextWhite);
  border-radius: 8px;
  align-items: center;
  column-gap: 10px;
  padding: 0 10px;

  /*  */
  @media (max-width: 576px) {
    display: flex;
  }
}

.dots span {
  width: 12px;
  height: 12px;
  background-color: var(--accentColor);
  border-radius: 50%;
}
</style>
