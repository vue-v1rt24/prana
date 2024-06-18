export const isMobile = (): boolean => {
  return /iphone|ipod|ipad|android|blackberry|mini|windows\sce|palm/i.test(
    navigator.userAgent.toLowerCase(),
  );
};
