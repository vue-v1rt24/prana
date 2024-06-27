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
