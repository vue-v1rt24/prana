import * as FancyboxAll from '@fancyapps/ui';
const { Fancybox } = FancyboxAll;
import '@fancyapps/ui/dist/fancybox/fancybox.css';

export default defineNuxtPlugin((nuxtApp) => {
  // Все глобальные настройки
  // console.log(Fancybox.defaults);

  Fancybox.defaults.autoFocus = false;
  Fancybox.defaults.dragToClose = false;

  Fancybox.defaults.tpl = {
    ...Fancybox.defaults.tpl,
    // Меняем кнопку закрытия в inline типе глобально
    /* closeButton:
      '<bottom class="close_modal" data-fancybox-close=""><img src="/img/close.svg" alt=""></bottom>', */
  };

  Fancybox.defaults.l10n = {
    ...Fancybox.defaults.l10n,
    CLOSE: 'Закрыть',
    TOGGLE_FULLSCREEN: 'Во весь экран',
    TOGGLE_ZOOM: 'Увеличить',
  };
});
