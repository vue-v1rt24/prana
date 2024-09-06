import type { TypeQuery, TypeTransformBlog } from '@/types/blog-page/blogHome.types';

export const useQuery = async () => {
  // Получение ссылки на API
  const { graphqlUrl } = useRuntimeConfig().public;

  // Запрос на получение всех данных
  const blogQuery = {
    query: `
    {
      blogCategories {
        nodes {
          name
          count
        }
      }
      blogs(first: 100) {
        nodes {
          databaseId
          slug
          date
          blogViewHome {
            blogIzobrazhenie {
              node {
                mediaItemUrl
              }
            }
            blogZagolovok
            blogOpisanie
          }
          blogCategories {
            nodes {
              name
            }
          }
        }
      }
    }
  `,
  };

  // Получение данных
  const { data: blogs } = await useFetch(graphqlUrl, {
    query: blogQuery,

    transform(data) {
      const d = data as TypeQuery;
      const blogs: TypeTransformBlog[] = [];

      for (const item of d.data.blogs.nodes) {
        blogs.push({
          id: item.databaseId,
          slug: item.slug,
          date: item.date,
          image: item.blogViewHome.blogIzobrazhenie.node.mediaItemUrl,
          title: item.blogViewHome.blogZagolovok,
          desc: item.blogViewHome.blogOpisanie,
          categories: item.blogCategories.nodes,
        });
      }

      return {
        categories: d.data.blogCategories.nodes,
        blogs,
      };
    },
  });

  //
  return {
    blogs: blogs.value,
  };
};
