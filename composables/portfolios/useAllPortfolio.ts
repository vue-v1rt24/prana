import type { TypePortfolios } from '~/types/portfolios.types';

export const useAllPortfolio = async () => {
  // Получение ссылки на API
  const { graphqlUrl } = useRuntimeConfig().public;

  // Запрос на получение всех данных портфолио
  const portfolios = {
    query: `
    {
      portfolios(first: 100) {
        nodes {
          databaseId
          slug
          homePreview {
            izobrazhenie {
              node {
                mediaItemUrl
              }
            }
            zagolovok
            vyborText
            zagolovokHover
            homePreviewTextTekst
            vyborVideo
            video {
              node {
                mediaItemUrl
              }
            }
          }
          portfolioCategories {
            nodes {
              name
            }
          }
        }
      }
      portfolioCategories(where: {parent: 0}) {
        nodes {
          name
          count
          children {
            nodes {
              name
              count
            }
          }
        }
      }
    }
  `,
  };

  const { data: articles } = await useFetch(graphqlUrl, {
    query: portfolios,

    transform(data) {
      const d = data as TypePortfolios;
      const portfolios = d.data.portfolios.nodes;
      const categories = d.data.portfolioCategories.nodes;
      const countAllInCategoryArticle = categories.reduce((acc, item) => acc + item.count, 0);

      return {
        portfolios,
        categories,
        countAllInCategoryArticle,
      };
    },
  });

  //
  return { articles };
};
