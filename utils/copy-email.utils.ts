import { gsap } from 'gsap';

// Копирование почты
export const copyBuffer = (evt: Event) => {
  const elem = evt.target as HTMLElement;
  let mm = gsap.matchMedia();
  const rightGsap = ref(30);

  elem && navigator.clipboard.writeText(elem.textContent as string);

  //
  mm.add('(max-width: 576px)', () => {
    rightGsap.value = 20;

    return () => {
      rightGsap.value = 30;
    };
  });

  //
  gsap.to('.notification_animate', {
    duration: 0.5,
    right: rightGsap.value,

    onComplete() {
      setTimeout(() => {
        gsap.to('.notification_animate', { duration: 1, right: '-100%' });
      }, 3000);
    },
  });
};
