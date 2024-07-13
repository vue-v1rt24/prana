export const useChildrenActiveMenu = () => {
  const route = useRoute();
  const blogChildrenActiveMenu = () => useState(() => false);

  watchEffect(() => {
    if (route.path.includes('blog')) {
      blogChildrenActiveMenu().value = true;
    } else {
      blogChildrenActiveMenu().value = false;
    }
  });

  //
  return {
    blogChildrenActiveMenu,
  };
};
