<script setup lang="ts">
// import { useQueryFile } from '~/composables/services/useQueryFile';

//
const router = useRouter();
const route = useRoute();

//
useSeoMeta({
  title: 'Продукция',
  description: 'Описание',
});

// Получение данных
// const { dataServiceFile } = await useQueryFile(route.params.slug);

// Скачивание файла
/* const loadFile = async () => {
  if (!dataServiceFile.value?.filePath) return;

  const link = document.createElement('a');
  link.setAttribute('href', dataServiceFile.value.filePath);
  link.setAttribute('target', '_blank');
  link.setAttribute('download', '');
  link.style.display = 'none';

  document.body.append(link);
  link.click();
  link.remove();
}; */
</script>

<template>
  <section class="service_item">
    <!-- Хлебные крошки -->
    <Breadcrumbs :breadcrumbs="[{ title: 'Страница продукции' }]" />

    <!--  -->
    <div class="about_particles"></div>

    <!--  -->
    <div class="container">
      <h1 class="service_item__h1">Раздел находится в разработке</h1>
      <p class="service_item__desc">Совсем скоро он появится</p>

      <!-- <UiButton
        title="Скачать презентацию"
        class="service_item__btn download_pdf"
        @click-btn="loadFile"
      /> -->

      <UiButton title="Вернуться назад" @click-btn="router.back" class="service_item__btn" />
    </div>
  </section>
</template>

<style lang="css" scoped>
.service_item {
  padding-bottom: 180px;

  @media (max-width: 576px) {
    padding-bottom: 80px;
  }
}

/*  */
.about_particles {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 2318px;
  overflow: hidden;
  z-index: -1;
}

.about_particles::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 940px;
  height: 714px;
  background-image: url(/img/team/decoration_1_1920.png);
  background-repeat: no-repeat;
  z-index: -1;
}

@media (max-width: 1200px) {
  .about_particles::before {
    width: 564px;
    height: 604px;
    background-image: url(/img/team/decoration_1_768.png);
  }
}

@media (max-width: 700px) {
  .about_particles::before {
    right: -120px;
  }
}

@media (max-width: 576px) {
  .about_particles::before {
    right: -311px;
    width: 564px;
    height: 604px;
    background-image: url(../img/team/decoration_1_360.png);
  }
}

/*  */
.service_item__h1 {
  max-width: 770px;
  font-family: var(--fontFamily-Unbounded);
  font-size: 62px;
  line-height: 100%;
  letter-spacing: 0.02em;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 42px;
  }

  @media (max-width: 576px) {
    font-size: 32px;
  }
}

.service_item__desc {
  margin: 52px 0 82px 0;
}

.service_item__btn {
  width: 430px;
  height: 103px;
  margin-bottom: 20px;

  @media (max-width: 576px) {
    width: 100%;
    height: 80px;
  }
}
</style>
