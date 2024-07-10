// Один отзыв
export type TypeReview = {
  databaseId: number;
  slug: string;
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
    reviewsVRazvernutomVide: boolean;
  };
  portfolioCategories: {
    nodes: {
      name: string;
    }[];
  };
};

// Типизация получения всех отзывов
export type TypeAllReviews = {
  data: {
    portfolios: {
      nodes: TypeReview[];
    };
  };
};
