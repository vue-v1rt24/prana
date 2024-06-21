export const useOutsideModal = () => {
  const isVisibleProjectVariants = () => useState<boolean>('isVisibleProjectVariants', () => false);
  const dopDate = () => useState<Record<string, string[]>>('dopDate', () => ({}));
  const isOpenModal = () => useState('isOpenModal', () => false);
  const sendFormSuccess = () => {};

  //
  return {
    isVisibleProjectVariants,
    dopDate,
    isOpenModal,
    sendFormSuccess,
  };
};
