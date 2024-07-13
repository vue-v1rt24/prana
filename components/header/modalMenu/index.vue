<script setup lang="ts">
import { useModalMenu } from '@/composables/useModalMenu';

//
defineProps<{
  logo?: string;
  nomerTelefona?: string;
  nomerTelefonaMenedzhment?: string;
  settingPochta?: string;
  telegramLink?: string;
  vkLink?: string;
  whatsappLink?: string;
}>();

// Управление модальным окно формы
const { isOpenModal } = useOutsideModal();

//
const { resizeHeightMenu, addRemoveClassBody, resetMenu } = useModalMenu();
const headerMenu = ref<HTMLDivElement | null>(null);
const subMenu = ref<HTMLDivElement | null>(null);

//
const closeClick = () => {
  addRemoveClassBody();
  resetMenu(subMenu);
};

//
onMounted(() => {
  resizeHeightMenu();

  //
  headerMenu.value?.addEventListener('click', (evt) => {
    const target = evt.target as HTMLElement;

    if (target.classList.contains('menu-item_not-click')) {
      evt.preventDefault();
      const parent = target.closest('.menu-item');

      parent?.classList.toggle('open');
      resizeHeightMenu();
    } else if (target.closest('.menu-item')) {
      closeClick();
    }
  });
});
</script>

<template>
  <!-- Фон модального меню -->
  <div @click="closeClick" class="backDropMenu"></div>

  <!-- Появляющиеся меню -->
  <div class="header__menu" ref="headerMenu">
    <div class="header__menu_top">
      <div v-if="logo" class="header__menu_top_img"><img :src="logo" alt="" /></div>
      <UiClose @close-click="closeClick" />
    </div>

    <!--  -->
    <div class="header__menu_center">
      <ul class="header__menu_ul" ref="subMenu">
        <li class="menu-item">
          <a class="menu-item_not-click" href="#">Портфолио</a>
          <ul class="sub-menu">
            <li class="menu-item">
              <NuxtLink :to="{ path: '/portfolio', query: { cat: encodeURI('Разработка') } }">
                Веб-разработка
              </NuxtLink>
            </li>
            <li class="menu-item">
              <NuxtLink :to="{ path: '/portfolio', query: { cat: encodeURI('Фото и видео') } }">
                Фото и видео
              </NuxtLink>
            </li>
            <li class="menu-item">
              <NuxtLink :to="{ path: '/portfolio', query: { cat: encodeURI('Продвижение') } }">
                Продвижение
              </NuxtLink>
            </li>
            <li class="menu-item">
              <NuxtLink :to="{ path: '/portfolio', query: { cat: encodeURI('Брендинг') } }">
                Брендинг
              </NuxtLink>
            </li>
          </ul>
        </li>
        <li class="menu-item">
          <a class="menu-item_not-click" href="#">Услуги</a>
          <ul class="sub-menu">
            <li class="menu-item">
              <a href="#">Веб-разработка</a>
            </li>
            <li class="menu-item">
              <a href="#">Дизайн</a>
            </li>
            <li class="menu-item">
              <a href="#">Фото и видео</a>
            </li>
            <li class="menu-item">
              <a href="#">Motion дизайн</a>
            </li>
            <li class="menu-item">
              <a href="#">Продвижение</a>
            </li>
          </ul>
        </li>
        <li class="menu-item">
          <a class="menu-item_not-click" href="#">Компания</a>
          <ul class="sub-menu">
            <li class="menu-item">
              <NuxtLink to="/company">Команда</NuxtLink>
            </li>
            <li class="menu-item">
              <NuxtLink to="/blog">Блог</NuxtLink>
            </li>
            <li class="menu-item">
              <NuxtLink to="/reviews">Отзывы</NuxtLink>
            </li>
            <li class="menu-item">
              <a href="#">Вакансии</a>
            </li>
            <li class="menu-item">
              <a href="#">Наша продукция</a>
            </li>
            <li class="menu-item">
              <a href="#">Контакты</a>
            </li>
          </ul>
        </li>
      </ul>

      <!--  -->
      <div class="header__menu_contacts">
        <ul class="header__menu_phones">
          <li v-if="nomerTelefona" class="header__menu_phones_li">
            <a :href="`tel:${nomerTelefona}`">{{ nomerTelefona }}</a>
            <span>Горячая линия</span>
          </li>

          <li v-if="nomerTelefonaMenedzhment" class="header__menu_phones_li">
            <a :href="`tel:+${nomerTelefonaMenedzhment}`">{{ nomerTelefonaMenedzhment }}</a>
            <span>Менеджмент</span>
          </li>

          <li v-if="settingPochta" class="header__menu_phones_li">
            <a :href="`mailto:${settingPochta}`">{{ settingPochta }}</a>
            <span>Электронный адрес</span>
          </li>
        </ul>

        <div class="header__menu_links">
          <div>
            <UiLinkText :link="`/`" title="Презентация компании" underline />

            <UiLinkText
              title="Начать проект"
              underline
              @click.prevent="isOpenModal().value = true"
            />
          </div>

          <ul class="header_soc">
            <li v-if="vkLink">
              <NuxtLink :to="vkLink" target="_blank">
                <svg>
                  <use xlink:href="/img/sprite.svg#vk"></use>
                </svg>
              </NuxtLink>
            </li>

            <li v-if="telegramLink">
              <NuxtLink :to="telegramLink" target="_blank">
                <svg>
                  <use xlink:href="/img/sprite.svg#telegram"></use>
                </svg>
              </NuxtLink>
            </li>

            <li v-if="whatsappLink">
              <NuxtLink :to="whatsappLink" target="_blank">
                <svg>
                  <use xlink:href="/img/sprite.svg#whatsapp"></use>
                </svg>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
/* Фон модального меню */
.backDropMenu {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 99;
}

.open_menu .backDropMenu {
  display: block;
}

/*  */
.header__menu {
  position: absolute;
  top: 32px;
  left: 50%;
  transform: translateX(-50%) translateY(-150%);
  width: 1404px;
  background: #fff;
  border-radius: 26px;
  overflow-y: auto;
  padding: 62px;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 100;
}

.open_menu .header__menu {
  transform: translateX(-50%) translateY(0);
}

.header__menu_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 62px;
}

/*  */
.header__menu_center {
  display: flex;
  column-gap: 89px;
}

/*  */
.header__menu_ul {
  display: flex;
  column-gap: 88px;
}

.header__menu_ul a {
  font-size: 18px;
  font-weight: 500;
  line-height: 100%;
  color: var(--colorDark3);
  display: block;
  transition: color 0.5s;
}

.header__menu_ul a:not(.menu-item_not-click):hover,
.header__menu_ul a.active {
  color: var(--accentColor);
}

.header__menu_ul .sub-menu .menu-item:first-child {
  margin-top: 15px;
}

.header__menu_ul .sub-menu a {
  font-size: 16px;
  font-weight: 300;
  padding: 9px 0;
}

.header__menu_ul .sub-menu .menu-item:not(:last-child) a {
  padding: 9px 0;
}

/*  */
.header__menu_contacts {
  display: flex;
  column-gap: 110px;
}

/*  */
.header__menu_phones {
  display: flex;
  flex-direction: column;
  row-gap: 38px;
}

.header__menu_phones_li a {
  font-family: var(--fontFamily-RFDewi);
  font-weight: 700;
  font-size: 22px;
  line-height: 100%;
  color: var(--colorDark3);
  display: block;
  margin-bottom: 24px;
  transition: color 0.5s;
}

.header__menu_phones_li a:hover {
  color: var(--accentColor);
}

.header__menu_phones_li span {
  font-weight: 300;
  font-size: 16px;
  line-height: 100%;
  color: var(--colorGray);
}

/*  */
.header__menu_links {
  display: flex;
  flex-direction: column;
}

.header__menu_links .job__link {
  column-gap: 12px;
  padding: 0 0 28px 0;
}

.header_soc {
  display: flex;
  align-items: center;
  column-gap: 16px;
  margin-top: auto;
}

.header_soc a {
  width: 56px;
  height: 56px;
  background-color: var(--colorBirch);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header_soc svg {
  width: 22px;
  height: 22px;
  fill: var(--accentColor);
}

/* ==================== Медиа запросы */
@media (max-width: 1500px) {
  .header__menu {
    width: 800px;
  }

  .header__menu_center {
    flex-direction: column;
    align-items: center;
    row-gap: 52px;
  }
}

@media (max-width: 992px) {
  .header__menu {
    width: 720px;
  }
}

@media (max-width: 768px) {
  .header__menu {
    width: 90%;
    padding: 30px;
  }

  .header__menu_top {
    margin-bottom: 52px;
  }

  .header__menu_center {
    flex-direction: column-reverse;
  }

  .header__menu_ul {
    width: 100%;
  }

  .header__menu_contacts {
    width: 100%;
  }

  .header__menu_phones_li a {
    font-size: 20px;
    margin-bottom: 16px;
  }
}

@media (max-width: 700px) {
  .header__menu_ul,
  .header__menu_contacts {
    justify-content: space-between;
    column-gap: 0;
  }
}

@media (max-width: 576px) {
  .header__menu {
    padding: 18px 28px;
  }

  .header__menu_top {
    margin-bottom: 24px;
  }

  .header__menu_top_img {
    width: 85px;
  }

  .header__menu_center {
    flex-direction: column;
  }

  .header__menu_ul {
    flex-direction: column;
    border-top: 1px solid #f4f4f4;
  }

  .header__menu_ul > li.menu-item {
    border-bottom: 1px solid #f4f4f4;
    padding: 22px 0;
  }

  .header__menu_ul .sub-menu {
    display: none;
  }

  .header__menu_contacts {
    flex-direction: column;
  }

  .header__menu_phones {
    row-gap: 24px;
    margin-bottom: 32px;
  }

  .header__menu_phones_li a {
    font-size: 16px;
    margin-bottom: 14px;
  }

  .header__menu_links .job__link {
    font-size: 15px;
    column-gap: 8px;
    padding: 0 0 20px 0;
  }

  .header_soc {
    margin-top: 12px;
  }

  .header_soc a {
    width: 46px;
    height: 46px;
  }

  .menu-item_not-click {
    position: relative;
  }

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

  .header__menu_ul .menu-item.open .menu-item_not-click::after {
    transform: rotate(90deg);
  }

  .header__menu_ul .menu-item.open .sub-menu {
    display: block;
  }
}
</style>
