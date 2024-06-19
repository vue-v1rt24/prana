export const useOutsideModal = () => {
  const isVisibleProjectVariants = () => useState<boolean>('isVisibleProjectVariants', () => false);
  const dopDate = () => useState<Record<string, string[]>>('dopDate', () => ({}));
  const sendFormSuccess = () => {};

  //
  return {
    isVisibleProjectVariants,
    dopDate,
    sendFormSuccess,
  };
};
