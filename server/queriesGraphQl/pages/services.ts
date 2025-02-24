export const servicesQuery = `
{
  pageBy(pageId: 2746) {
    metaTags {
      metaTitle
      metaDescription
    }
    pageServices {
      pageServicesIzobrazhenie {
        node {
          mediaItemUrl
          altText
        }
      }
      pageServicesRepeatUslugi {
        izobrazhenie {
          node {
            altText
            mediaItemUrl
          }
        }
        zagolovok
        opisanie
        pageServicesRepeatUslugiSsylkaNaStraniczu
      }
      pageServicesVidzhetRejtingaYandeksa
    }
  }
}
`;
