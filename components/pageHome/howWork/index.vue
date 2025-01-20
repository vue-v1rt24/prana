<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

//
const viewport = useViewport();

// Для счётчика
const clientsPercent = reactive({ count: 0 });

//
onMounted(() => {
  // Для блока со счётчиком
  const tlPercent = gsap.timeline({
    scrollTrigger: {
      trigger: '.how_work_clients__percent',
      start: 'center center+=300',
      // markers: true,
    },
  });

  tlPercent.to(clientsPercent, {
    duration: 1,
    count: 98,
  });

  // Заголовок
  /* tlPercent.to('.how_work_clients__title span', {
    y: 0,
    ease: 'power1.out',
  }); */

  gsap.to('.how_work_clients__title span', {
    y: 0,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: '.how_work_clients',
      start: 'top top',
      // markers: true,
    },
  });

  // Блок с логотипами компаний
  /* tlPercent.to('.how_work_clients__logos_item', {
    x: 0,
    opacity: 1,
    stagger: 0.1,
    ease: 'power1.out',
  }); */

  gsap.to('.how_work_clients__logos_item', {
    x: 0,
    opacity: 1,
    stagger: 0.1,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: '.how_work_clients',
      start: 'top top',
      // markers: true,
    },
  });
});

//
onMounted(() => {
  gsap.set('.how_work_clients__logos_item', { clearProps: 'all' });
});
</script>

<template>
  <section class="how_work_section">
    <div class="how_work_bx">
      <div class="container">
        <h2 class="title_52">Как мы работаем?</h2>
      </div>

      <!--  -->
      <PageHomeHowWorkSliderDuga v-if="viewport.isGreaterThan('screen1200')" />

      <!--  -->
      <PageHomeHowWorkSliderHorizontal v-else />
    </div>

    <!--  -->
    <div class="how_work_clients">
      <div class="container">
        <!-- <div class="how_work_clients__percent">98%</div> -->
        <div class="how_work_clients__percent">{{ Math.floor(clientsPercent.count) }}%</div>
        <div class="how_work_clients__title">
          <span>Наших клиентов продолжают сотрудничество с нами</span>
        </div>
        <div class="how_work_clients__logos">
          <div class="how_work_clients__logos_item">
            <img src="/img/work/w1.png" alt="" />
          </div>

          <div class="how_work_clients__logos_item">
            <img src="/img/work/w2.png" alt="" />
          </div>

          <div class="how_work_clients__logos_item">
            <img src="/img/work/w3.png" alt="" />
          </div>

          <div class="how_work_clients__logos_item">
            <img src="/img/work/w4.png" alt="" />
          </div>

          <div class="how_work_clients__logos_item">
            <img src="/img/work/w1.png" alt="" />
          </div>

          <div class="how_work_clients__logos_item">
            <img src="/img/work/w2.png" alt="" />
          </div>

          <div class="how_work_clients__logos_item">
            <img src="/img/work/w3.png" alt="" />
          </div>

          <div class="how_work_clients__logos_item">
            <img src="/img/work/w4.png" alt="" />
          </div>

          <div class="how_work_clients__logos_item">
            <img src="/img/work/w1.png" alt="" />
          </div>

          <div class="how_work_clients__logos_item">
            <img src="/img/work/w2.png" alt="" />
          </div>

          <div class="how_work_clients__logos_item">
            <img src="/img/work/w3.png" alt="" />
          </div>

          <div class="how_work_clients__logos_item">
            <img src="/img/work/w4.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.how_work_section {
  background-color: var(--colorDark4);
  border-radius: 72px 72px 0px 0px;
  overflow: hidden;

  /*  */
  @media (max-width: 576px) {
    border-radius: 32px 32px 0 0;
  }
}

/*  */
.how_work_bx {
  position: relative;
  height: 100vh;
  /* background-color: var(--colorDark4);
  border-radius: 72px 72px 0px 0px; */
  /* padding: 160px 0; */
  /* padding-top: 160px; */
  padding-top: 60px;

  /*  */
  @media (max-width: 1200px) {
    height: auto;
    padding: 160px 0;
  }

  @media (max-width: 800px) {
    padding: 120px 0;
  }

  @media (max-width: 576px) {
    padding: 80px 0;
  }

  /*  */
  .title_52 {
    text-align: center;
    /* margin-bottom: 120px; */

    /*  */
    @media (max-width: 1200px) {
      margin-bottom: 80px;
    }

    @media (max-width: 800px) {
      font-size: 42px;
    }

    @media (max-width: 576px) {
      font-size: 26px;
      margin-bottom: 42px;
    }
  }
}

/*  */

.how_work_clients {
  background-color: var(--colorDark3);
  border-radius: 72px 72px 0 0;
  /* padding: 160px 0; */
  padding-top: 160px;
  margin-top: 160px;

  /*  */
  @media (max-width: 1200px) {
    margin-top: 0;
  }

  @media (max-width: 1024px) {
    padding-top: 140px;
  }

  @media (max-width: 576px) {
    padding-top: 80px;
  }
}

/*  */
.how_work_clients__percent {
  position: relative;
  z-index: 1;
  width: fit-content;
  font-family: var(--fontFamily-Unbounded);
  font-weight: 700;
  font-size: 100px;
  line-height: 100%;
  letter-spacing: 0.02em;
  text-align: center;
  color: #40b6b7;
  background-color: var(--colorDark3);
  border: 2px solid #40b6b7;
  border-radius: 42px;
  padding: 15px 25px;
  margin: 0 auto;

  /*  */
  @media (max-width: 1024px) {
    font-size: 80px;
  }

  @media (max-width: 576px) {
    font-size: 54px;
    border-radius: 24px;
  }
}

/*  */
.how_work_clients__title {
  max-width: 1088px;
  height: 113px;
  font-weight: 700;
  font-size: 52px;
  line-height: 100%;
  letter-spacing: 0.02em;
  text-align: center;
  margin: 42px auto 62px auto;
  overflow: hidden;

  /*  */
  @media (max-width: 1024px) {
    height: 90px;
    font-size: 42px;
    margin-top: 32px;
  }

  @media (max-width: 576px) {
    height: 56px;
    font-size: 26px;
    margin: 24px 0 42px 0;
  }

  /*  */
  span {
    display: block;
    transform: translateY(100%);
  }
}

/*  */
.how_work_clients__logos {
  max-width: 1280px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin: 0 auto;

  /*  */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 10px;
  }
}

.how_work_clients__logos_item {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
