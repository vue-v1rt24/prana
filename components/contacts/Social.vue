<script setup lang="ts"></script>

<template>
  <ul class="soc">
    <li class="soc__item">
      <a class="soc__item_link" href="#">
        <svg width="22px" height="22px" class="soc_img">
          <use xlink:href="/img/sprite.svg#vk"></use>
        </svg>
      </a>
    </li>
    <li class="soc__item">
      <a class="soc__item_link" href="#">
        <svg width="22px" height="19px" class="soc_img">
          <use xlink:href="/img/sprite.svg#telegram"></use>
        </svg>
      </a>
    </li>
    <li class="soc__item">
      <a class="soc__item_link" href="#">
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
