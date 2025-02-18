export type TypeWorkAll = {
  node: {
    databaseId: number;
    name: string;
    count: number;
    portfolios: {
      nodes: {
        databaseId: number;
        slug: string;
        date: string;
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
          video: { node: { mediaItemUrl: string } } | null;
        };
        portfolioCategories: {
          nodes: {
            name: string;
            taxonomyName: string;
          }[];
        };
      }[];
    };
  };
};

//
export type TypeWork = {
  databaseId: number;
  slug: string;
  date: string;
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
    video: { node: { mediaItemUrl: string } } | null;
  };
  portfolioCategories: {
    nodes: {
      name: string;
      taxonomyName: string;
    }[];
  };
};
