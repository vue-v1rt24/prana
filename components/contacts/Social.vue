<script setup lang="ts">
defineProps<{
  vk: string;
  telegram: string;
  whatsapp: string;
  youtube: string;
  behans: string;
  rutube: string;
  workspace: string;
  dprofile: string;
}>();

//
const theme = useTheme();
</script>

<template>
  <ul :class="['soc', { dark: theme === 'dark', light: theme === 'light' }]">
    <li class="soc__item">
      <a class="soc__item_link" :href="vk" target="_blank">
        <svg class="soc_img">
          <use xlink:href="/public/img/sprite.svg#vk"></use>
        </svg>
      </a>
    </li>
    <li class="soc__item">
      <a class="soc__item_link" :href="telegram" target="_blank">
        <svg class="soc_img">
          <use xlink:href="/public/img/sprite.svg#telegram"></use>
        </svg>
      </a>
    </li>
    <li class="soc__item">
      <a class="soc__item_link" :href="whatsapp" target="_blank">
        <svg class="soc_img">
          <use xlink:href="/public/img/sprite.svg#whatsapp"></use>
        </svg>
      </a>
    </li>
    <li class="soc__item">
      <a class="soc__item_link" :href="youtube" target="_blank">
        <svg class="soc_img">
          <use xlink:href="/public/img/sprite.svg#youtube"></use>
        </svg>
      </a>
    </li>
    <li class="soc__item">
      <a class="soc__item_link" :href="behans" target="_blank">
        <svg class="soc_img">
          <use xlink:href="/public/img/sprite.svg#behance"></use>
        </svg>
      </a>
    </li>
    <li class="soc__item">
      <a class="soc__item_link" :href="rutube" target="_blank">
        <svg class="soc_img">
          <use xlink:href="/public/img/sprite.svg#rutube"></use>
        </svg>
      </a>
    </li>
    <li class="soc__item">
      <a class="soc__item_link" :href="workspace" target="_blank">
        <svg class="soc_img">
          <use xlink:href="/public/img/sprite.svg#workspace"></use>
        </svg>
      </a>
    </li>
    <li class="soc__item">
      <a class="soc__item_link" :href="dprofile" target="_blank">
        <svg class="soc_img">
          <use xlink:href="/public/img/sprite.svg#dprofile"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<style lang="css" scoped>
.soc {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  border-radius: 8px;
  margin-top: 32px;

  @media (max-width: 567px) {
    margin-top: 24px;
  }
}

.soc__item {
  width: 40px;
  height: 40px;
  background-color: var(--colorDark3);
  border-radius: 8px;

  .dark &,
  .light & {
    background-color: var(--colorDark4);
  }
}

.soc__item_link {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.soc_img {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  fill: white;
  transition: 0.3s;
}

.soc__item_link:hover .soc_img {
  fill: var(--accentColor);
}
</style>
