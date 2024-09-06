// Запрос на получение файла PDF
import type { TypeServiceFile } from '~/types/services.types';

export const useQueryFile = async (slug: string) => {
  // Получение ссылки на API
  const { graphqlUrl } = useRuntimeConfig().public;

  // Запрос
  const queryFile = {
    query: `
      {
        serviceBy(slug: "${slug}") {
          servicesContent {
            serviceFile {
              node {
                mediaItemUrl
              }
            }
          }
          databaseId
        }
      }
    `,
  };

  // Получение данных
  const { data: dataServiceFile } = await useFetch(graphqlUrl, {
    query: queryFile,

    transform(data) {
      const d = data as TypeServiceFile;

      return {
        id: d.data.serviceBy.databaseId,
        filePath: d.data.serviceBy.servicesContent.serviceFile.node.mediaItemUrl,
      };
    },
  });

  //
  return {
    dataServiceFile,
  };
};
