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
      razrabotkaOneScreenRunImg {
        node {
          mediaItemUrl
        }
      }
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
}
`;
