<script setup lang="ts">
import { particle } from '@/assets/libs/particle';

//
defineProps<{
  title: string;
  desc: string;
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
    <div class="container">
      <div class="decisions">
        <h1 class="decisions__title" v-html="title"></h1>

        <p class="decisions__desc">{{ desc }}</p>
      </div>

      <canvas class="particle"></canvas>

      <div class="ellips"></div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.decisions_sec {
  position: relative;
  height: 1000px;
  margin-top: -107px;
  margin-bottom: 40px;
}

.decisions {
  padding-top: 280px;
  user-select: none;
}

.decisions__title {
  font-family: var(--fontFamily-RFDewi);
  font-size: 80px;
  font-weight: 700;
  line-height: 110%;
  letter-spacing: 1.6px;
  text-align: center;
  color: var(--colorTextWhite);
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
    font-size: 62px;
    letter-spacing: 1.24px;
  }
}

@media (max-width: 768px) {
  .decisions_sec {
    height: 680px;
    margin-top: -106px;
    margin-bottom: 0;
  }

  .decisions {
    padding-top: 192px;
  }

  .decisions__title {
    font-size: 56px;
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

  .decisions {
    padding-top: 134px;
  }

  .decisions__title {
    font-size: 28px;
    letter-spacing: 0.76px;
  }

  .decisions__desc {
    width: 260px;
    font-size: 15px;
    margin: 24px auto 0 auto;
  }
}
</style>
