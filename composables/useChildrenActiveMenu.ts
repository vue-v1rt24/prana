// Даём активный класс родительскому пункту меню на его внутренних страницах

export const useChildrenActiveMenu = () => {
  const route = useRoute();
  const blogChildrenActiveMenu = () => useState(() => false);
  const reviewChildrenActiveMenu = () => useState(() => false);
  const servicesChildrenActiveMenu = () => useState(() => false);

  watchEffect(() => {
    // Для внутренних страниц блога
    if (route.path.includes('blog')) {
      blogChildrenActiveMenu().value = true;
    } else {
      blogChildrenActiveMenu().value = false;
    }

    // Для внутренних страниц отзывов
    if (route.path.includes('reviews')) {
      reviewChildrenActiveMenu().value = true;
    } else {
      reviewChildrenActiveMenu().value = false;
    }

    // Для внутренних страниц services
    if (['/razrabotka', '/branding', '/foto-video'].includes(route.path)) {
      servicesChildrenActiveMenu().value = true;
    } else {
      servicesChildrenActiveMenu().value = false;
    }
  });

  //
  return {
    blogChildrenActiveMenu,
    reviewChildrenActiveMenu,
    servicesChildrenActiveMenu,
  };
};
