export type TypeServices = {
  data: {
    pageBy: {
      metaTags: {
        metaTitle: string;
        metaDescription: string;
      };
      pageServices: {
        pageServicesIzobrazhenie: {
          node: {
            mediaItemUrl: string;
            altText: string;
          };
        };
        pageServicesRepeatUslugi: {
          izobrazhenie: {
            node: {
              altText: string;
              mediaItemUrl: string;
            };
          };
          zagolovok: string;
          opisanie: string;
          pageServicesRepeatUslugiSsylkaNaStraniczu: string;
        }[];
        pageServicesVidzhetRejtingaYandeksa: string;
      };
    };
  };
};
