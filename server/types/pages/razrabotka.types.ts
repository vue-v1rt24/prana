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
        razrabotkaOneScreenRunImg: {
          node: {
            mediaItemUrl: string;
          };
        };
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
  };
};
