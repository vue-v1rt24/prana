import * as FancyboxAll from '@fancyapps/ui';

export const useShowPresentCompany = () => {
  const { Fancybox } = FancyboxAll;

  Fancybox.show([
    {
      src: '/presents_parana_it.pdf',
      type: 'pdf',
      preload: false,
    },
  ]);
};
