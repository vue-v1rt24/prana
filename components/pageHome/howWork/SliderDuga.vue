<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

//
const mm = gsap.matchMedia();

// Для удаления экземпляра ScrollTrigger
const nodeScrollTrigger = ref<ScrollTrigger | null>(null);

// Блок с карточками
const cardsBx = ref<HTMLDivElement | null>(null);

// Угол дуги (так же можно изменить расстояние между карточек)
// Установили на 40% от полного круга
const arcAngle = Math.PI * 0.4;

// Начало дуги / начало вывода карточек
const startAngle = Math.PI / 2 - arcAngle / 20;

// Расстояние между карточками (размещение карточек по дуге при прокрутке)
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
  const stickyHeight =
    document.querySelector<HTMLDivElement>('.how_work_bx')!.offsetHeight *
    cardsBx.value!.children.length;

  // Выбираем все блоки с карточками
  const cards = [...cardsBx.value!.children] as HTMLElement[];

  // Получаем количество карточек
  const totalCards = cards.length;

  //
  const positionCards = (progress: number = 0) => {
    const radius = getRadius();
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
      const cardPosition = card.getBoundingClientRect();

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
  nodeScrollTrigger.value = ScrollTrigger.create({
    trigger: '.how_work_bx',
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
    y: () => document.querySelector<HTMLDivElement>('.how_work_bx')!.offsetHeight - 84,
    rotation: 90,
    scale: 0,
    autoAlpha: 0,
    scrollTrigger: {
      trigger: '.how_work_clients',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
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

//
onUnmounted(() => {
  mm.kill(true);

  //
  if (nodeScrollTrigger.value?.kill) {
    nodeScrollTrigger.value.kill();
  }
});
</script>

<template>
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
</template>

<style lang="css" scoped>
.cards {
  position: absolute;
  top: 240px;
  left: 50%;
  transform: translateX(-50%);
  height: 550px;
  will-change: transform;
}
</style>
