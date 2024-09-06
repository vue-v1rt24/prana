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

// Отзыв полной страницы (страница видео)
export type TypeReviewSingle = {
  data: {
    portfolioBy: {
      databaseId: number;
      slug: string;
      date: string;
      title: string;
      metaTags: {
        metaTitle: string;
        metaDescription: string;
      };
      reviewClient: {
        reviewIzobrazhenieDlyaVideo: {
          node: {
            mediaItemUrl: string;
          };
        };
        reviewSsylkaNaVideo: string;
        reviewTekst: string;
      };
      fullOutputOfTheWork: {
        zagolovok: string;
        kolichestvoPonravivshimsyaStatya: number | null;
        fullWorkKolichestvoProsmotrov: number | null;
      };
      homePreview: {
        izobrazhenie: {
          node: {
            mediaItemUrl: string;
          };
        };
      };
    };
  };
};
