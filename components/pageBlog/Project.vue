<script setup lang="ts">
import type { TypeLinkProject } from '@/types/blog-page/blogHome.types';

//
const props = defineProps<{
  content: TypeLinkProject;
}>();
</script>

<template>
  <div class="separate_project">
    <div class="separate_project__img">
      <NuxtImg
        :src="content.homePreview.izobrazhenie.node.mediaItemUrl"
        width="290"
        height="290"
        loading="lazy"
        format="webp"
      />
    </div>

    <UiButton
      title="Смотреть проект"
      color-class="btn_transparent"
      border-radius="22px"
      @click-btn="$router.push(`/portfolio/${content.slug}?blog=${content.slug}`)"
    ></UiButton>
  </div>
</template>

<style lang="css" scoped>
.separate_project {
  position: absolute;
  top: 0px;
  right: -310px;
  width: 290px;

  @media (max-width: 1500px) {
    display: none;
  }

  @media (max-width: 830px) {
    position: static;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 31px;
    margin-bottom: 52px;
  }

  @media (max-width: 700px) {
    flex-direction: column;
  }

  @media (max-width: 576px) {
    margin-top: 82px;
  }
}

.separate_project__img {
  position: relative;
  width: 290px;
  height: 290px;

  @media (max-width: 830px) {
    flex: 1.05;
    width: 330px;
    height: 330px;
  }

  @media (max-width: 700px) {
    flex: none;
  }
}

.separate_project__img img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 18px;
}

.separate_project .blue_btn {
  width: 100%;
  height: 82px;
  font-size: 20px;
  margin-top: 18px;

  @media (max-width: 830px) {
    flex: 1;
    width: 330px;
    height: 330px;
    margin-top: 0;
  }

  @media (max-width: 700px) {
    flex: none;
    height: 82px;
    margin-top: 20px;
  }
}
</style>

<style>
.separate_project .blue_btn .btn__arrow .arrow {
  width: 13px;
  height: 13px;
}
</style>
