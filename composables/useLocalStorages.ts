// Это файл для хранения локальных данных. Своя Pinia

// Для хранения названия темы
export const useTheme = () => useState<'light' | 'dark' | null>('theme', () => null);

// Для хранения количества отметок понравившимся статьи блога
export const useCountLikes = () => useState<number>('countLikes', () => 0);

// Для выделения активных родительских и дочерних категорий (кнопок) на страницы портфолио
export const useActiveBtnCategoryPortfolio = () =>
  useState<{ parent: string; child: string }>('activePortfolioCategory', () => ({
    parent: 'all',
    child: 'Все',
  }));

// Для показа / скрытия поделиться в соц.сетях во всплывающих окнах портфолио
export const useIsShowSoc = () => useState<boolean>('isShowSoc', () => false);
