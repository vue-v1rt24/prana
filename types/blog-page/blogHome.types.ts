// Один блог
export type TypeBlog = {
  databaseId: number;
  slug: string;
  date: string;
  blogViewHome: {
    blogIzobrazhenie: {
      node: {
        mediaItemUrl: string;
      };
    };
    blogZagolovok: string;
    blogOpisanie: string;
  };
  blogCategories: {
    nodes: {
      name: string;
    }[];
  };
};

// Категории раздела блога
export type TypeBlogCategories = {
  name: string;
  count: number;
  children: {
    nodes: { name: string; count: number }[];
  };
};

// Типизация полученных данных из админки
export type TypeQuery = {
  data: {
    blogs: {
      nodes: TypeBlog[];
    };
    blogCategories: {
      nodes: TypeBlogCategories[];
    };
  };
};

// Типизация изменённого типа TypeBlog
export type TypeTransformBlog = {
  id: number;
  slug: string;
  date: string;
  image: string;
  title: string;
  desc: string;
  categories: { name: string }[];
};

// Типизация полной статьи
export type TypeBlogFull = {
  data: {
    blogBy: {
      metaTags: {
        metaTitle: string;
        metaDescription: string;
      };
      blogId: number;
      title: string;
      date: string;
      content: string;
      blogCategories: {
        nodes: {
          name: string;
        }[];
      };
      blogViewHome: {
        blogKolichestvoProsmotrovStati: number;
        blogByloPolezno: number;
      };
      blogViewCatVideo: {
        izobrazhenieVideo: {
          node: {
            mediaItemUrl: string;
          };
        };
        ssylkaNaVideo: string;
        opisanieVideo: string;
        blogVybereteOtzyv: {
          nodes: {
            slug: string;
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
    };
  };
};

// Типизация статей блога
export type TypeAllNotIn = {
  data: {
    blogs: {
      nodes: TypeBlog[];
    };
  };
};

// Типизация статьи блога видео
export type TypeVideo = {
  izobrazhenieVideo: {
    node: {
      mediaItemUrl: string;
    };
  };
  ssylkaNaVideo: string;
  opisanieVideo: string;
  blogVybereteOtzyv: {
    nodes: {
      homePreview: {
        izobrazhenie: {
          node: {
            mediaItemUrl: string;
          };
        };
      };
      slug: string;
    }[];
  };
};

// Типизация работы на странице видео
export type TypeLinkProject = {
  homePreview: {
    izobrazhenie: {
      node: {
        mediaItemUrl: string;
      };
    };
  };
  slug: string;
};
