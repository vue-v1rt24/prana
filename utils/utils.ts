import { gsap } from 'gsap';
import type { Ref } from 'vue';

// Формирование даты
export const dateFormat = (value: string) => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'numeric',
    day: '2-digit',
  }).format(new Date(value));
};

// Замена пробела на нижнее подчёркивание у строки
export const replaceSpace = (str: string) => str.replaceAll(' ', '_');

// Проверка на мобильность
export const isMobile = (): boolean => {
  return /iphone|ipod|ipad|android|blackberry|mini|windows\sce|palm/i.test(
    navigator.userAgent.toLowerCase(),
  );
};

// Перемещение к блоку контактов
export const movingContact = () => {
  document.getElementById('contacts')?.scrollIntoView({
    behavior: 'smooth',
  });
};

// Подъём на верх страницы
export const upPage = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

// Копирование почты
export const copyBuffer = (elem: Ref | string, rightGsap: Ref | number) => {
  const elemNew = toValue(elem);
  const rightGsapNew = toValue(rightGsap);

  elemNew.value && navigator.clipboard.writeText(elemNew.value.textContent as string);

  //
  gsap.to('.notification_animate', {
    duration: 0.5,
    right: rightGsapNew.value,

    onComplete() {
      setTimeout(() => {
        gsap.to('.notification_animate', { duration: 1, right: '-100%' });
      }, 3000);
    },
  });
};
