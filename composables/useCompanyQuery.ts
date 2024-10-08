// Запрос для страницы "О компании"

import type { TypeAllData } from '@/types/company.types';

export const useCompanyQuery = async () => {
  // Получение ссылки на API
  const { graphqlUrl } = useRuntimeConfig().public;

  // Запрос
  const queryCompany = {
    query: `
    {
      pageBy(pageId: 36) {
        metaTags {
          metaTitle
          metaDescription
        }
        company {
          companySkachatPrezentacziyuKompanii {
            node {
              mediaItemUrl
            }
          }
          companyOpisanieKompanii
          companyIzobrazhenieVideoV1920 {
            node {
              mediaItemUrl
            }
          }
          companyIzobrazhenieVideoV768 {
            node {
              mediaItemUrl
            }
          }
          companyIzobrazhenieVideoV360 {
            node {
              mediaItemUrl
            }
          }
          companyVideo
          komanda {
            companyKomandaFoto {
              node {
                mediaItemUrl
              }
            }
            fotoPoNavedeniyuCompanyKomanda {
              node {
                mediaItemUrl
              }
            }
            companyKomandaImyaIFamiliya
            companyKomandaDolzhnost
          }
          companyIzobrazhenieKomandy {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
    `,
  };

  // Получение данных
  const { data: dataCompany } = await useFetch(graphqlUrl, {
    query: queryCompany,

    transform(data) {
      const d = data as TypeAllData;

      return {
        mateTags: d.data.pageBy.metaTags,
        file: d.data.pageBy.company.companySkachatPrezentacziyuKompanii?.node.mediaItemUrl,
        descCompany: d.data.pageBy.company.companyOpisanieKompanii,
        imagePeopleCompany: d.data.pageBy.company.companyIzobrazhenieKomandy?.node.mediaItemUrl,
        image1920: d.data.pageBy.company.companyIzobrazhenieVideoV1920?.node.mediaItemUrl,
        image768: d.data.pageBy.company.companyIzobrazhenieVideoV768?.node.mediaItemUrl,
        image360: d.data.pageBy.company.companyIzobrazhenieVideoV360?.node.mediaItemUrl,
        videoCompany: d.data.pageBy.company.companyVideo,
        comands: d.data.pageBy.company.komanda,
      };
    },
  });

  //
  return {
    dataCompany,
  };
};
