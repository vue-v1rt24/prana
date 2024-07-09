// Типизация получения всех отзывов
export type TypeAllReviews = {
  data: {
    portfolios: {
      nodes: {
        reviewClient: {
          reviewNazvanieKompanii: string;
          reviewLogoKompanii: {
            node: {
              mediaItemUrl: string;
            };
          };
          reviewOpisanieKompanii: string;
          reviewZagruziteFajl: {
            node: {
              mediaItemUrl: string;
            };
          };
          reviewIzobrazhenieDlyaVideo: {
            node: {
              mediaItemUrl: string;
            };
          };
          ssylkaNaVideo: string;
          reviewTekst: string;
          reviewsVRazvernutomVide: boolean;
        };
        portfolioCategories: {
          nodes: {
            name: string;
          }[];
        };
      }[];
    };
  };
};
