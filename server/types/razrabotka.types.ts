export type TypeRazrabotka = {
  data: {
    pageBy: {
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
      };
    };
  };
};
