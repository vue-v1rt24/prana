export const articleSingleModalQuery = (id: string) => {
  return `
      {
        portfolioBy(portfolioId: ${id}) {
          databaseId
          slug
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
  `;
};
