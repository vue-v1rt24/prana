// Категории
export type TypeCat = {
  name: string;
  taxonomyName: string;
};

// Одна работа
export type TypePortfolio = {
  databaseId: number;
  slug: string;
  homePreview: {
    izobrazhenie: {
      node: {
        mediaItemUrl: string;
      };
    };
    zagolovok: string;
    vyborText: boolean;
    zagolovokHover: string;
    homePreviewTextTekst: string;
    vyborVideo: boolean;
    video: {
      node: {
        mediaItemUrl: string;
      };
    } | null;
  };
  portfolioCategories: {
    nodes: TypeCat[];
  };
};

// Список работ
export type TypePortfolios = {
  data: {
    portfolios: {
      nodes: TypePortfolio[];
    };
  };
};
