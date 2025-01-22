<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

//
const props = defineProps<{
  howWorkCards: {
    howWorkCardRepeatTitle: string;
    howWorkCardRepeatDesc: string;
    howworkcardrepeatimg: {
      node: {
        mediaItemUrl: string;
      };
    };
  }[];
}>();

// console.log(props.howWorkCards);

// Количество карточек
const countCard = computed(() => props.howWorkCards.length);

//
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
      v-for="(card, idx) in howWorkCards"
      :key="card.howWorkCardRepeatTitle"
      :idx="idx + 1"
      :cart-all="countCard"
      :title="card.howWorkCardRepeatTitle"
      :desc="card.howWorkCardRepeatDesc"
      :img-folder="card.howworkcardrepeatimg.node.mediaItemUrl"
      :class="{ card_last: idx + 1 === countCard }"
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

  /*  */
  @media (max-height: 870px) {
    top: 180px;
  }

  @media (max-height: 788px) {
    top: 160px;
  }

  @media (max-height: 768px) {
    top: 140px;
  }
}
</style>
