export const razrabotkaQuery = `
{
  pageBy(pageId: 2663) {
    metaTags {
      metaTitle
      metaDescription
    }
    razrabotkaPage {
      razrabotkaZagolovok
      razrabotkaOpisanie
      razrabotkaNaChyomRazrabatyvaem {
        nodes {
          mediaItemUrl
        }
      }
      razrabotkaOneScreenTekstBegushhejStroki
      razrabotkaVarianty {
        razrabotkaVariantyZagolovok
        razrabotkaVariantyOpisanie
        razrabotkaVariantyIzobrazheniyaInstrumentov {
          razrabotkaVariantyIzobrazheniyaInstrumentovIzobrazhenie {
            node {
              mediaItemUrl
            }
          }
        }
      }
      razrabotkaTwoScreenTekstBegushhejStroki
      kakMyRabotaemVarianty {
        kakMyRabotaemVariantyZagolovok
        kakMyRabotaemVariantyOpisanie
        kakMyRabotaemVariantyIzobrazhenie {
          node {
            mediaItemUrl
          }
        }
      }
      kakMyRabotaemVariantyTekstBegushhejStroki
    }
  }
  
  ######### Получение категорий и работ
  portfolioCategories(where: {include: [65, 66, 67, 68, 69]}) {
    edges {
      node {
        databaseId
        name
        count
        portfolios(last: 15) {
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
          }
        }
      }
    }
  }
}
`;
