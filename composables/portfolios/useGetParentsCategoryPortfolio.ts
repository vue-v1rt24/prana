import type { TypeCatsPortfolio } from '~/types/portfolios.types';

export const useGetParentsCategoryPortfolio = async () => {
  const nuxtApp = useNuxtApp();

  // Получение ссылки на API
  const { graphqlUrl } = useRuntimeConfig().public;

  // Запрос на получения родительских категорий портфолио
  // (нужно для их исключения из тегов карточек)
  const getParentsCategoryPortfolio = {
    query: `
      {
        portfolioCategories(where: {parent: 0}) {
          nodes {
            name
          }
        }
      }
    `,
  };

  const { data: cats } = await useFetch(graphqlUrl, {
    query: getParentsCategoryPortfolio,

    transform(data) {
      const d = data as TypeCatsPortfolio;

      return d.data.portfolioCategories.nodes.reduce(
        (acc, item) => acc.concat(item.name),
        [] as string[],
      );
    },

    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  });

  //
  return { cats };
};
