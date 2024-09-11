<script setup lang="ts">
defineProps<{
  footer?: boolean;
}>();

//
const router = useRouter();
const route = useRoute();
const activeMenuPortfolio = ref<string>('');

//
const menuPortfolio = (title: string, idx: number) => {
  activeMenuPortfolio.value = title;
  router.push({ path: '/portfolio', query: { catMenu: encodeURI(title), idx } });
};

//
watchEffect(() => {
  if (!route.path.includes('portfolio')) {
    activeMenuPortfolio.value = '';
  } else {
    activeMenuPortfolio.value = decodeURI((route.query.catMenu as string) || '');
  }
});
</script>

<template>
  <li :class="['menu-item', { footer_menu_portfolio: footer }]">
    <a class="menu-item_not-click" href="#">Портфолио</a>

    <ul class="sub-menu sub-menu_no_link">
      <li
        :class="['menu-item react', { active: activeMenuPortfolio === 'Разработка' }]"
        @click="menuPortfolio('Разработка', 2)"
      >
        Разработка
      </li>
      <li
        :class="['menu-item react', { active: activeMenuPortfolio === 'Фото и видео' }]"
        @click="menuPortfolio('Фото и видео', 3)"
      >
        Фото и видео
      </li>
      <li
        :class="['menu-item react', { active: activeMenuPortfolio === 'Брендинг' }]"
        @click="menuPortfolio('Брендинг', 0)"
      >
        Брендинг
      </li>
    </ul>
  </li>
</template>

<style lang="css" scoped>
.menu-item_not-click {
  position: relative;
  font-size: 18px;
  font-weight: 500;
  line-height: 100%;
  color: var(--colorDark3);
  display: block;
  transition: color 0.5s;

  .footer_menu_portfolio & {
    color: var(--colorTextWhite);
  }
}

@media (max-width: 576px) {
  .menu-item_not-click::after {
    content: '';
    position: absolute;
    top: 4px;
    right: 0px;
    width: 11px;
    height: 11px;
    background-image: url(/img/arrow-menu.svg);
    background-repeat: no-repeat;
  }
}

/*  */
.sub-menu {
  margin-top: 15px;

  /*  */
  @media (max-width: 576px) {
    display: none;
  }
}

.sub-menu .menu-item {
  color: var(--colorDark3);
  padding: 9px 0;
  transition: color 0.5s;

  .footer_menu_portfolio & {
    font-size: 16px;
    color: #b7bec9;
  }

  &:hover {
    color: var(--accentColor);
  }

  &.active {
    color: var(--accentColor);
  }
}

/*  */
.menu-item.open .menu-item_not-click::after {
  transform: rotate(90deg);
}

.menu-item.open .sub-menu {
  display: block;
}
</style>
