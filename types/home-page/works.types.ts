type TypeHomePreview = {
  homePreviewTextTekst: string;
  izobrazhenie: {
    node: {
      mediaItemUrl: string;
    };
  };
  video: {
    node: {
      mediaItemUrl: string;
    };
  };
  vyborText: boolean;
  vyborVideo: boolean;
  vyvoditNaGlavnojStraniczy: boolean;
  zagolovok: string;
  zagolovokHover: string;
};

// Типизация получения полной записи работы
type TypeWorkBySlugTransform = {
  zagolovok: string;
  fullWorkOpisanieVypolnennojRaboty: string;
  fullWorkDopDescMob: string;
  dopolnitelnoeOpisanieVypolnennojRabotyDlyaMobilnogo: string;
  godSdachi: string;
  fullWorkSajtVypolnennojRaboty: string;
  fullWorkFotoVypolnennojRabotyPc: {
    fullWorkFotoVypolnennojRabotyPcIzobrazhenie: {
      node: {
        mediaItemUrl: string;
      };
    };
  }[];
  fullWorkFotoVypolnennojRabotyVMob: {
    fullWorkFotoVypolnennojRabotyVMobIzobrazhenie: {
      node: {
        mediaItemUrl: string;
      };
    };
  }[];
  fullWorkKomandaProekta: {
    fullWorkKomandaProektaFoto: {
      node: {
        mediaItemUrl: string;
      };
    };
    fullWorkKomandaProektaDolzhnost: string;
    fullWorkKomandaProektaImyaFamiliya: string;
  }[];
  kolichestvoPonravivshimsyaStatya: number;
};

// Для одной записи работы с id
export type TypeWorkId = {
  data: {
    portfolioBy: {
      databaseId: number;
      metaTags: {
        metaTitle: string;
        metaDescription: string;
      };
      fullOutputOfTheWork: TypeWorkBySlugTransform;
      portfolioCategories: {
        nodes: {
          name: string;
        }[];
      };
      reviewClient: {
        reviewZagruziteFajl: {
          node: {
            mediaItemUrl: string;
          };
        };
        ssylkaNaVideo: string;
        reviewNazvanieKompanii: string;
      };
    };
  };
  databaseId: number;
};

// Для одной записи работы
export type TypeWork = {
  id: number;
  slug?: string;
  categories: { name: string }[];
  review: {
    reviewZagruziteFajl: {
      node: {
        mediaItemUrl: string;
      };
    };
    reviewSsylkaNaVideo: string;
    reviewNazvanieKompanii: string;
  };
} & TypeWorkBySlugTransform;

export type TypeWorkPortfolio = {
  id: number;
  slug?: string;
  categories: { name: string }[];
  review: {
    reviewNazvanieKompanii: string | null;
    reviewZagruziteFajl: {
      node: {
        mediaItemUrl: string;
      };
    };
    reviewSsylkaNaVideo: string | null;
  };
} & TypeWorkBySlugTransform;

export type TypeBlogWork = {
  data: {
    blogs: {
      nodes: {
        databaseId: number;
        slug: string;
        date: string;
        homePreview: TypeHomePreview;
        blogCategories: {
          nodes: {
            name: string;
            taxonomyName: string;
          }[];
        };
      }[];
    };
    portfolios: {
      nodes: {
        databaseId: number;
        slug: string;
        date: string;
        homePreview: TypeHomePreview;
        portfolioCategories: {
          nodes: {
            name: string;
            taxonomyName: string;
          }[];
        };
        fullOutputOfTheWork: TypeWorkBySlugTransform;
      }[];
    };
  };
};

//
export type TypeBlogWorkTransform = {
  id: string;
  databaseId: number;
  slug: string;
  date: string;
  homePreview: TypeHomePreview;
  categories: {
    nodes: {
      name: string;
      taxonomyName: string;
    }[];
  };
  fullOutputOfTheWork: TypeWorkBySlugTransform;
};
