export const widgetWorkQuery = `
{
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
            date
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
            portfolioCategories(where: {childless: true}) {
              nodes {
                name
                taxonomyName
              }
            }
          }
        }
      }
    }
  }
}
`;
