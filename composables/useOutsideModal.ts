export const useOutsideModal = () => {
  // Дополнительные данные передаваемые в форму
  const dopDate = () => useState<Record<string, string[]>>('dopDate', () => ({}));

  // Открытие модального окна
  const isOpenModal = () => useState('isOpenModal', () => false);

  // Показ/Скрытие кнопок в модальном окне
  const isVisibleBtnProject = () => useState('isVisibleBtnProject', () => false);

  // Флаг, что форма отправлена (передаётся в другие компоненты, как emit)
  const isSendFormSuccess = () => useState('sendFormSuccess', () => false);

  //
  return {
    dopDate,
    isOpenModal,
    isVisibleBtnProject,
    isSendFormSuccess,
  };
};
