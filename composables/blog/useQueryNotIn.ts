import type { TypeAllNotIn, TypeTransformBlog } from '@/types/blog-page/blogHome.types';

export const useQueryNotIn = async (id: number) => {
  // Получение ссылки на API
  const { graphqlUrl } = useRuntimeConfig().public;

  // Получение всех записей блога исключая одну по id
  const queryAllNotInBlogs = {
    query: `
    {
      blogs(where: {notIn: "${id}"}) {
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

  //
  const { data } = await useFetch(graphqlUrl, {
    query: queryAllNotInBlogs,

    transform(data) {
      const d = data as TypeAllNotIn;
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
        blogs,
      };
    },
  });

  //
  return {
    blogsAllNotIn: data.value?.blogs,
  };
};
