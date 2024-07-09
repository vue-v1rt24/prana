import type { TypeAllReviews } from '@/types/reviews.types';

export const useReviewAll = async () => {
  // Получение ссылки на API
  const { graphqlUrl } = useRuntimeConfig().public;

  // Запрос
  const queryAll = {
    query: `
    {
      portfolios {
        nodes {
          reviewClient {
            reviewNazvanieKompanii
            reviewLogoKompanii {
              node {
                mediaItemUrl
              }
            }
            reviewOpisanieKompanii
            reviewZagruziteFajl {
              node {
                mediaItemUrl
              }
            }
            reviewIzobrazhenieDlyaVideo {
              node {
                mediaItemUrl
              }
            }
            ssylkaNaVideo
            reviewTekst
            reviewsVRazvernutomVide
          }
          portfolioCategories {
            nodes {
              name
            }
          }
        }
      }
    }
    `,
  };

  // Получение данных
  const { data: dataReviews } = await useFetch<TypeAllReviews>(graphqlUrl, {
    query: queryAll,
  });

  //
  return {
    dataReviews: dataReviews.value?.data.portfolios.nodes,
  };
};
