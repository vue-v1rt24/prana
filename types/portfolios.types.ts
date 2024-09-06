// Категории
export type TypeCat = {
  name: string;
  count: number;
  children: {
    nodes: { name: string; count: number }[];
  };
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
    nodes: {
      name: string;
    }[];
  };
};

// Список работ
export type TypePortfolios = {
  data: {
    portfolios: {
      nodes: TypePortfolio[];
    };
    portfolioCategories: {
      nodes: TypeCat[];
    };
  };
};

// Получение родительских категорий
export type TypeCatsPortfolio = {
  data: {
    portfolioCategories: {
      nodes: { name: string }[];
    };
  };
};
