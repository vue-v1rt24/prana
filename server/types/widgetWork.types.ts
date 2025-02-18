// Для категорий и работ
export type TypeWidgetWork = {
  data: {
    portfolioCategories: {
      edges: {
        node: {
          databaseId: number;
          name: string;
          count: number | null;
          portfolios: {
            nodes: {
              databaseId: number;
              slug: string;
              homePreview: {
                izobrazhenie: {
                  node: {
                    mediaItemUrl: string;
                  };
                };
                zagolovok: string;
                vyborText: boolean;
                zagolovokHover: string;
                homePreviewTextTekst: string;
                vyborVideo: boolean;
                video: string | null;
              };
              portfolioCategories: {
                nodes: {
                  name: string;
                  taxonomyName: string;
                }[];
              };
            }[];
          };
        };
      }[];
    };
  };
};

//////////////////////
// Получение одной записи для модального окна на сервере
export type TypeArticleModal = {
  portfolioBy: {
    databaseId: null;
    slug: string;
    fullOutputOfTheWork: {
      zagolovok: string;
      fullWorkOpisanieVypolnennojRaboty: string;
      fullWorkDopDescMob: string | null;
      dopolnitelnoeOpisanieVypolnennojRabotyDlyaMobilnogo: string | null;
      godSdachi: string;
      fullWorkSajtVypolnennojRaboty: string;
      fullWorkFotoVypolnennojRabotyPc: {
        fullWorkFotoVypolnennojRabotyPcIzobrazhenie: {
          node: {
            mediaItemUrl: string;
          };
        };
      }[];
      fullWorkFotoVypolnennojRabotyVMob: {
        fullWorkFotoVypolnennojRabotyVMobIzobrazhenie: {
          node: {
            mediaItemUrl: string;
          };
        };
      }[];
      fullWorkKomandaProekta: {
        fullWorkKomandaProektaFoto: {
          node: {
            mediaItemUrl: string;
          };
        };
        fullWorkKomandaProektaDolzhnost: string;
        fullWorkKomandaProektaImyaFamiliya: string;
      }[];
      kolichestvoPonravivshimsyaStatya: number;
    };
    portfolioCategories: {
      nodes: {
        name: string;
      }[];
    };
    reviewClient: {
      reviewZagruziteFajl: string | null;
      reviewNazvanieKompanii: string | null;
      reviewSsylkaNaVideo: string | null;
    };
  };
};

// Получение одной записи для модального окна
export type TypeArticleModalServer = {
  data: TypeArticleModal;
};
