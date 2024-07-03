// Это файл для хранения локальных данных. Своя Pinia

// Для хранения названия темы
export const useTheme = () => useState<'light' | 'dark'>('theme', () => 'light');
