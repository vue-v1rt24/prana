export const useModalMenu = () => {
  const resizeHeightMenu = () => {
    const headerMenu = document.querySelector<HTMLDivElement>('.header__menu')!;

    headerMenu.style.height = '';
    const wh = window.innerHeight - 32;
    const hh = headerMenu.offsetHeight;

    if (wh < hh) {
      headerMenu.style.height = wh - 32 + 'px';
    }
  };

  //
  const addRemoveClassBody = () => {
    document.body.classList.toggle('open_menu');
  };

  //
  const resetMenu = (headerMenuItems: any) => {
    const items = [...headerMenuItems.value.children];

    for (const item of items) {
      item.classList.remove('open');
    }
  };

  //
  return {
    resizeHeightMenu,
    addRemoveClassBody,
    resetMenu,
  };
};
