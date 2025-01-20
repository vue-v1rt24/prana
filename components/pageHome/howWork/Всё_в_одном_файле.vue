<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

//
const mm = gsap.matchMedia();

// Блок анимации, на котором будет скролл
const howWork = ref<HTMLDivElement | null>(null);

// Блок с карточками
const cardsBx = ref<HTMLDivElement | null>(null);

// Для счётчика
const clientsPercent = reactive({ count: 0 });

// Угол дуги (так же можно изменить расстояние между карточек)
// Установили на 40% от полного круга
const arcAngle = Math.PI * 0.4;

// Начало дуги / начало вывода карточек
// const startAngle = Math.PI / 2 - arcAngle / 2;
const startAngle = Math.PI / 2 - arcAngle / 20;

// Расстояние между карточками (размещение карточек по дуге при прокрутке)
// const getRadius = () =>
// window.innerWidth < 900 ? window.innerWidth * 7.5 : window.innerWidth * 2.5;
// window.innerWidth < 900 ? window.innerWidth * 7.5 : window.innerWidth * 1.6;

const getRadius = () => {
  let radius = 3072;

  mm.add('(min-width: 1601px', () => {
    radius = window.innerWidth * 1.6;
  });

  mm.add('(max-width: 1600px', () => {
    radius = 3000;
  });

  //
  return radius;
};

//
onMounted(() => {
  // Высота скролла анимации (в течении этого расстояния блок будет закреплён)
  const stickyHeight = howWork.value!.offsetHeight * cardsBx.value!.children.length;

  // Выбираем все блоки с карточками
  const cards = [...cardsBx.value!.children] as HTMLElement[];

  // Получаем количество карточек
  const totalCards = cards.length;

  //
  const positionCards = (progress: number = 0) => {
    const radius = getRadius();
    console.log(radius);
    // const totalTravel = 1 + totalCards / 7.5; // общее расстояние прокрутки, которое зависит от количества карточек и прогресса прокрутки
    const totalTravel = 1 + totalCards / 75; // общее расстояние прокрутки, которое зависит от количества карточек и прогресса прокрутки
    const adjustedProgress = (progress * totalTravel - 1) * 0.75; // изменяем прогресс прокрутки, чтобы он соответствовал общей длине дуги

    // Проходимся по каждой карточке и вычисляем её положение на дуге
    cards.forEach((card, i) => {
      const normalizedProgress = (totalCards - 1 - i) / totalCards;
      const cardProgress = normalizedProgress + adjustedProgress;
      const angle = startAngle + arcAngle * cardProgress;

      // Находим положение каждой на круге карточки по оси x и y
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      // Рассчитываем вращение каждой карточки по дуге
      // Наклон боковых карточек
      // const rotation = (angle - Math.PI / 2) * (180 / Math.PI);
      const rotation = (angle - Math.PI / 2) * (300 / Math.PI);

      // Установка значений каждой карточке при скролле
      gsap.set(card, {
        x: x,
        y: -y + radius,
        rotation: -rotation,
        transformOrigin: 'center center',
      });

      // Подцветка активной карточки
      const centerWindow = window.innerWidth / 2;
      const cardPolovina = card.offsetWidth / 2;
      const cardPosition = card.getBoundingClientRect();

      // if (centerWindow >= cardPosition.left + cardPolovina) {
      if (
        centerWindow >= cardPosition.left &&
        centerWindow < cardPosition.left + card.offsetWidth
      ) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  };

  // Фиксируем блок для анимации скролла
  ScrollTrigger.create({
    trigger: howWork.value,
    start: 'top top',
    end: `+=${stickyHeight}`,
    pin: true,
    pinSpacing: true,
    onUpdate(self) {
      positionCards(self.progress);
    },
  });

  // Смещение крайней карточки при скролле
  gsap.to('.card_last', {
    // y: 900, // на 80% / 1920px
    // y: 1550, // на 50% / 3072px
    // y: document.querySelector<HTMLDivElement>('.how_work_bx')!.offsetHeight - 25,
    y: document.querySelector<HTMLDivElement>('.how_work_bx')!.offsetHeight - 84,
    rotation: 90,
    scale: 0,
    autoAlpha: 0,
    scrollTrigger: {
      trigger: '.how_work_clients',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      markers: true,
    },
  });

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

  // Вызываем при загрузке страницы
  positionCards(0);

  // Изменение размера экрана
  window.addEventListener('resize', () => {
    positionCards(0);
  });
});
</script>

<template>
  <section class="how_work_section">
    <div class="how_work_bx" ref="howWork">
      <div class="container">
        <h2 class="title_52">Как мы работаем?</h2>
      </div>

      <!--  -->
      <div class="cards" ref="cardsBx">
        <PageHomeHowWorkCard
          :idx="1"
          :cart-all="5"
          title="Брифинг"
          desc="Собираем информацию и определяем цель проекта"
        />

        <PageHomeHowWorkCard
          :idx="2"
          :cart-all="5"
          title="Коммерческое предложение"
          desc="На основе брифа обозначаем основные этапы, определяем сроки и производим расчет стоимости проекта"
        />

        <PageHomeHowWorkCard
          :idx="3"
          :cart-all="5"
          title="Договор и ТЗ"
          desc="Заключаем договор, составляем техническое задание"
        />

        <PageHomeHowWorkCard
          :idx="4"
          :cart-all="5"
          title="Разработка проекта"
          desc="Создаем продукт, согласовывая ключевые этапы и решения"
        />

        <PageHomeHowWorkCard
          :idx="5"
          :cart-all="5"
          title="Сдача проекта"
          desc="Формируем и передаем все разработанные материалы"
          class="card_last"
        />
      </div>
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
    padding-top: 80px;
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
  @media (max-width: 800px) {
    padding-top: 30px;
  }

  /*  */
  .title_52 {
    text-align: center;
    /* margin-bottom: 120px; */

    /*  */
    @media (max-width: 800px) {
      font-size: 42px;
    }

    @media (max-width: 576px) {
      font-size: 26px;
    }
  }
}

/*  */

.cards {
  position: absolute;
  top: 240px;
  left: 50%;
  transform: translateX(-50%);
  height: 550px;
  will-change: transform;
}

/*  */

.how_work_clients {
  background-color: var(--colorDark3);
  border-radius: 72px 72px 0 0;
  padding: 160px 0;
  margin-top: 160px;

  /*  */
  @media (max-width: 1024px) {
    padding: 140px 0;
    margin-top: 140px;
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
  }
}

.how_work_clients__logos_item {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
