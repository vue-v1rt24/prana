// Это файл для хранения локальных данных. Своя Pinia

// Для хранения названия темы
export const useTheme = () => useState<'light' | 'dark'>('theme', () => 'light');

// Для хранения количества отметок понравившимся статьи блога
export const useCountLikes = () => useState<number>('countLikes', () => 0);
