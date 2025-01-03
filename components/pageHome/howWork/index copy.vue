<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Блок анимации, на котором будет скролл
const howWork = ref<HTMLDivElement | null>(null);

// Блок с карточками
const cardsBx = ref<HTMLDivElement | null>(null);

// Угол дуги (так же можно изменить расстояние между карточек)
// Установили на 40% от полного круга
const arcAngle = Math.PI * 0.4;

// Начало дуги / начало вывода карточек
const startAngle = Math.PI / 2 - arcAngle / 2;

// Расстояние между карточками (размещение карточек по дуге при прокрутке)
const getRadius = () =>
  // window.innerWidth < 900 ? window.innerWidth * 7.5 : window.innerWidth * 2.5;
  window.innerWidth < 900 ? window.innerWidth * 7.5 : window.innerWidth * 1.6;

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
    const totalTravel = 1 + totalCards / 7.5; // общее расстояние прокрутки, которое зависит от количества карточек и прогресса прокрутки
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
        />
      </div>
    </div>

    <!--  -->
    <div class="how_work_clients">
      <div class="container">
        <div class="how_work_clients__percent">98%</div>
        <div class="how_work_clients__title">наших клиентов продолжают сотрудничество с нами</div>
        <div class="how_work_clients__logos">
          <div>
            <img src="/img/work/w1.png" alt="" />
          </div>

          <div>
            <img src="/img/work/w2.png" alt="" />
          </div>

          <div>
            <img src="/img/work/w3.png" alt="" />
          </div>

          <div>
            <img src="/img/work/w4.png" alt="" />
          </div>

          <div>
            <img src="/img/work/w1.png" alt="" />
          </div>

          <div>
            <img src="/img/work/w2.png" alt="" />
          </div>

          <div>
            <img src="/img/work/w3.png" alt="" />
          </div>

          <div>
            <img src="/img/work/w4.png" alt="" />
          </div>

          <div>
            <img src="/img/work/w1.png" alt="" />
          </div>

          <div>
            <img src="/img/work/w2.png" alt="" />
          </div>

          <div>
            <img src="/img/work/w3.png" alt="" />
          </div>

          <div>
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
}

/*  */
.how_work_bx {
  position: relative;
  height: 100vh;
  /* background-color: var(--colorDark4);
  border-radius: 72px 72px 0px 0px; */
  /* padding: 160px 0; */
  padding-top: 160px;

  /*  */
  .title_52 {
    text-align: center;
    margin-bottom: 120px;
  }
}

/*  */

.cards {
  position: absolute;
  left: 50%;
  top: 330px;
  transform: translateX(-50%);
  height: 550px;
  will-change: transform;
}

/*  */

.how_work_clients {
  height: 1223px;
  background: var(--colorDark3);
  border-radius: 72px 72px 0 0;
  padding: 160px 0;
  margin-top: 160px;
}

/*  */
.how_work_clients__percent {
  width: fit-content;
  font-family: var(--fontFamily-Unbounded);
  font-weight: 700;
  font-size: 100px;
  line-height: 100%;
  letter-spacing: 0.02em;
  text-align: center;
  color: #40b6b7;
  border: 2px solid #40b6b7;
  border-radius: 42px;
  padding: 15px 25px;
  margin: 0 auto;
}

/*  */
.how_work_clients__title {
  max-width: 1088px;
  font-weight: 700;
  font-size: 52px;
  line-height: 100%;
  letter-spacing: 0.02em;
  text-align: center;
  margin: 42px auto 62px auto;
}

/*  */
.how_work_clients__logos {
  max-width: 1280px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin: 0 auto;
}
</style>
