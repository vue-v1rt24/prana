<script setup lang="ts">
defineProps<{
  vk: string;
  telegram: string;
  whatsapp: string;
}>();
</script>

<template>
  <ul class="soc">
    <li class="soc__item">
      <a class="soc__item_link" :href="vk" target="_blank">
        <svg width="22px" height="22px" class="soc_img">
          <use xlink:href="/img/sprite.svg#vk"></use>
        </svg>
      </a>
    </li>
    <li class="soc__item">
      <a class="soc__item_link" :href="telegram" target="_blank">
        <svg width="22px" height="19px" class="soc_img">
          <use xlink:href="/img/sprite.svg#telegram"></use>
        </svg>
      </a>
    </li>
    <li class="soc__item">
      <a class="soc__item_link" :href="whatsapp" target="_blank">
        <svg width="22px" height="22px" class="soc_img">
          <use xlink:href="/img/sprite.svg#whatsapp"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<style lang="css" scoped>
.soc {
  display: flex;
  align-items: center;
  column-gap: 12px;
  border-radius: 8px;
  margin-top: 32px;

  @media (max-width: 567px) {
    margin-top: 24px;
  }
}

.soc__item {
  width: 46px;
  height: 46px;
  background-color: var(--colorDark3);
  border-radius: 8px;
}

.soc__item_link {
  display: block;
  padding: 12px;
}

.soc_img {
  fill: white;
  transition: 0.3s;
}

.soc__item_link:hover .soc_img {
  fill: var(--accentColor);
}
</style>
