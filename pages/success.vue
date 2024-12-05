<script setup lang="ts">
const router = useRouter();

//
useSeoMeta({
  title: 'Заявка отправлена',
  description: '',
});
</script>

<template>
  <section class="service_item">
    <!-- Хлебные крошки -->
    <Breadcrumbs :breadcrumbs="[{ title: 'Заявка отправлена' }]" />

    <!--  -->
    <div class="about_particles"></div>

    <!--  -->
    <div class="container">
      <h1 class="service_item__h1">Заявка успешно отправлена</h1>
      <p class="service_item__desc">Мы свяжемся с Вами в ближайшее время</p>

      <UiButton
        title="Вернуться на главную"
        @click-btn="router.push('/')"
        class="service_item__btn"
      />
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

  @media (max-width: 576px) {
    width: 100%;
    height: 80px;
  }
}
</style>
