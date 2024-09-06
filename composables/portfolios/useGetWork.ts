import type { TypeWorkId } from '@/types/home-page/works.types';

export const useGetWork = async (id: number) => {
  // Получение ссылки на API
  const { graphqlUrl } = useRuntimeConfig().public;

  //
  const workQuery = {
    query: `
      {
        portfolioBy(portfolioId: ${id}) {
          databaseId
          metaTags {
            metaTitle
            metaDescription
          }
          fullOutputOfTheWork {
            zagolovok
            fullWorkOpisanieVypolnennojRaboty
            fullWorkDopDescMob
            dopolnitelnoeOpisanieVypolnennojRabotyDlyaMobilnogo
            godSdachi
            fullWorkSajtVypolnennojRaboty
            fullWorkFotoVypolnennojRabotyPc {
              fullWorkFotoVypolnennojRabotyPcIzobrazhenie {
                node {
                  mediaItemUrl
                }
              }
            }
            fullWorkFotoVypolnennojRabotyVMob {
              fullWorkFotoVypolnennojRabotyVMobIzobrazhenie {
                node {
                  mediaItemUrl
                }
              }
            }
            fullWorkKomandaProekta {
              fullWorkKomandaProektaFoto {
                node {
                  mediaItemUrl
                }
              }
              fullWorkKomandaProektaDolzhnost
              fullWorkKomandaProektaImyaFamiliya
            }
            kolichestvoPonravivshimsyaStatya
          }
          portfolioCategories(where: {childless: true}) {
            nodes {
              name
            }
          }
          reviewClient {
            reviewZagruziteFajl {
              node {
                mediaItemUrl
              }
            }
            reviewNazvanieKompanii
            reviewSsylkaNaVideo
          }
        }
      }
  `,
  };

  if (import.meta.server) {
    // Получение данных если есть параметр в адресной строке
    const { data } = await useFetch(graphqlUrl, {
      query: workQuery,

      transform(data) {
        const work = data as TypeWorkId;

        return {
          id: work.data.portfolioBy.databaseId,
          metaTags: work.data.portfolioBy.metaTags,
          ...work.data.portfolioBy.fullOutputOfTheWork,
          categories: work.data.portfolioBy.portfolioCategories.nodes,
          review: work.data.portfolioBy.reviewClient,
        };
      },
    });

    return data.value;
  } else {
    // Получение данных по клику
    const data = await $fetch<TypeWorkId>(graphqlUrl, {
      query: workQuery,
    });

    return {
      id: data.data.portfolioBy.databaseId,
      metaTags: data.data.portfolioBy.metaTags,
      ...data.data.portfolioBy.fullOutputOfTheWork,
      categories: data.data.portfolioBy.portfolioCategories.nodes,
      review: data.data.portfolioBy.reviewClient,
    };
  }
};
