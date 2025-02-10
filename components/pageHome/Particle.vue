<script setup lang="ts">
import { particle } from '@/assets/libs/particle';

//
defineProps<{
  title?: string;
  desc?: string;
}>();

//
let stopAnimVal: () => void;

//
onMounted(() => {
  const { stopActions } = particle();
  stopAnimVal = stopActions;
});

onUnmounted(() => {
  stopAnimVal();
});
</script>

<template>
  <section class="decisions_sec">
    <div class="decisions">
      <h1 v-if="title" class="decisions__title" v-html="title"></h1>

      <p v-if="desc" class="decisions__desc">{{ desc }}</p>
    </div>

    <canvas class="particle"></canvas>

    <div class="ellips"></div>
  </section>
</template>

<style lang="css" scoped>
.decisions_sec {
  position: relative;
  height: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -107px;
  margin-bottom: 40px;
}

.decisions {
  user-select: none;
}

.decisions__title {
  position: relative;
  font-family: var(--fontFamily-Unbounded);
  font-size: 68px;
  line-height: 110%;
  letter-spacing: 1.6px;
  text-align: center;
  color: var(--colorTextWhite);
  padding: 0 30px;

  /* Шапка деда Мороза */
  /* &::before {
    content: '';
    position: absolute;
    top: -24px;
    left: 50%;
    transform: rotate(340deg);
    margin-left: -457px;
    width: 60px;
    height: 60px;
    background-image: url(/img/shapka-ded-moroza.svg);
    background-repeat: no-repeat;
    background-position: 0px 0px;
    background-size: 100% 100%;
  }

  @media (min-width: 1925px) {
    &::before {
      margin-left: -461px;
    }
  }

  @media (max-width: 1199px) {
    &::before {
      top: -20px;
      width: 45px;
      height: 45px;
      margin-left: -350px;
    }
  }

  @media (max-width: 768px) {
    &::before {
      top: -18px;
      width: 40px;
      height: 40px;
      margin-left: -300px;
    }
  }

  @media (max-width: 636px) {
    &::before {
      margin-left: -183px;
    }
  }

  @media (max-width: 576px) {
    &::before {
      top: -9px;
      width: 20px;
      height: 20px;
      margin-left: -151px;
    }
  } */
}

:global(.decisions__title span) {
  background-image: var(--linearGradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.decisions__desc {
  color: var(--colorTextOpacity08);
  text-align: center;
  font-size: 26px;
  font-weight: 300;
  line-height: 130%;
  padding: 0 30px;
  margin-top: 46px;
}

/*  */
.particle {
  position: absolute;
  inset: 0;
  z-index: -1;
}

/*  */
.ellips {
  position: absolute;
  inset: 0;
  background-image: url(/img/ellipse.svg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}

/* ==================== Медиа запросы */
@media (min-width: 1925px) {
  .decisions_sec {
    height: 100vh;
  }

  .decisions {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1200px;
    padding-top: 0;
  }
}

@media (max-width: 1600px) {
  .decisions_sec {
    height: 880px;
  }
}

@media (max-width: 1199px) {
  .decisions_sec {
    height: 750px;
  }

  .decisions__title {
    font-size: 52px;
    letter-spacing: 1.24px;
  }
}

@media (max-width: 768px) {
  .decisions_sec {
    height: 680px;
    margin-top: -106px;
    margin-bottom: 0;
  }

  .decisions__title {
    font-size: 44px;
  }

  .decisions__desc {
    font-size: 20px;
  }
}

@media (max-width: 576px) {
  .decisions_sec {
    height: 470px;
    margin-top: -73px;
  }

  .decisions__title {
    font-size: 22px;
    letter-spacing: 0.76px;
    padding: 0 20px;
  }

  .decisions__desc {
    width: 260px;
    font-size: 15px;
    padding: 0 20px;
    margin: 24px auto 0 auto;
  }
}
</style>
