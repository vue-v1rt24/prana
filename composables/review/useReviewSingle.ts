import type { TypeReviewSingle } from '@/types/reviews.types';

export const useReviewSingle = async (title: string) => {
  // Получение ссылки на API
  const { graphqlUrl } = useRuntimeConfig().public;

  // Запрос
  const querySingle = {
    query: `
      {
        portfolioBy(uri: "${title}") {
          databaseId
          slug
          date
          title
          metaTags {
            metaTitle
            metaDescription
          }
          reviewClient {
            reviewIzobrazhenieDlyaVideo {
              node {
                mediaItemUrl
              }
            }
            reviewSsylkaNaVideo
            reviewTekst
          }
          fullOutputOfTheWork {
            zagolovok
            kolichestvoPonravivshimsyaStatya
            fullWorkKolichestvoProsmotrov
          }
          homePreview {
            izobrazhenie {
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
  const { data: dataReview, error } = await useFetch<TypeReviewSingle>(graphqlUrl, {
    query: querySingle,
  });

  //
  return {
    dataReview: dataReview.value?.data.portfolioBy,
  };
};
