// Получение данных страницы
export type TypeRazrabotka = {
  data: {
    pageBy: {
      metaTags: {
        metaTitle: string;
        metaDescription: string;
      };
      razrabotkaPage: {
        razrabotkaZagolovok: string;
        razrabotkaOpisanie: string;
        razrabotkaNaChyomRazrabatyvaem: {
          nodes: {
            mediaItemUrl: string;
          }[];
        };
        razrabotkaOneScreenTekstBegushhejStroki: string;
        razrabotkaVarianty: {
          razrabotkaVariantyZagolovok: string;
          razrabotkaVariantyOpisanie: string;
          razrabotkaVariantyIzobrazheniyaInstrumentov: {
            razrabotkaVariantyIzobrazheniyaInstrumentovIzobrazhenie: {
              node: {
                mediaItemUrl: string;
              };
            };
          }[];
        }[];
        razrabotkaTwoScreenTekstBegushhejStroki: string;
        kakMyRabotaemVarianty: {
          kakMyRabotaemVariantyZagolovok: string;
          kakMyRabotaemVariantyOpisanie: string;
          kakMyRabotaemVariantyIzobrazhenie: {
            node: {
              mediaItemUrl: string;
            };
          };
        }[];
        kakMyRabotaemVariantyTekstBegushhejStroki: string;
      };
    };

    //////// Для категорий и работ
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
            }[];
          };
        };
      }[];
    };
  };
};
