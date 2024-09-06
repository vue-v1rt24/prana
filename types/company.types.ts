// Типизация ответа с сервера
export type TypeAllData = {
  data: {
    pageBy: {
      metaTags: {
        metaTitle: string;
        metaDescription: string;
      };
      company: {
        companySkachatPrezentacziyuKompanii: {
          node: {
            mediaItemUrl: string;
          };
        };
        companyOpisanieKompanii: string;
        companyIzobrazhenieVideoV1920: {
          node: {
            mediaItemUrl: string;
          };
        };
        companyIzobrazhenieVideoV768: {
          node: {
            mediaItemUrl: string;
          };
        };
        companyIzobrazhenieVideoV360: {
          node: {
            mediaItemUrl: string;
          };
        };
        companyVideo: string;
        komanda: {
          companyKomandaFoto: {
            node: {
              mediaItemUrl: string;
            };
          };
          fotoPoNavedeniyuCompanyKomanda: {
            node: {
              mediaItemUrl: string;
            };
          };
          companyKomandaImyaIFamiliya: string;
          companyKomandaDolzhnost: string;
        }[];
        companyIzobrazhenieKomandy: {
          node: {
            mediaItemUrl: string;
          };
        };
      };
    };
  };
};
