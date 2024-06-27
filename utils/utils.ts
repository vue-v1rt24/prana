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
