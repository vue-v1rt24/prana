import type { TypeBlogFull } from '@/types/blog-page/blogHome.types';

export const useQueryOne = async (slug: string) => {
  // Получение ссылки на API
  const { graphqlUrl } = useRuntimeConfig().public;

  // Запрос на получение одной записи блога по слагу
  const queryBlog = {
    query: `
      {
        blogBy(uri: "${slug}") {
          metaTags {
            metaTitle
            metaDescription
          }
          blogId
          title
          date
          content
          blogCategories {
            nodes {
              name
            }
          }
          blogViewHome {
            blogKolichestvoProsmotrovStati
            blogByloPolezno
          }
          blogViewCatVideo {
            izobrazhenieVideo {
              node {
                mediaItemUrl
              }
            }
            ssylkaNaVideo
            blogVybereteOtzyv {
              nodes {
                slug
                homePreview {
                  izobrazhenie {
                    node {
                      mediaItemUrl
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  };

  // Получение данных
  const { data: article } = await useFetch(graphqlUrl, {
    query: queryBlog,

    transform(data) {
      const d = data as TypeBlogFull;

      //
      return {
        metaTitle: d.data.blogBy.metaTags.metaTitle,
        metaDesc: d.data.blogBy.metaTags.metaDescription,
        id: d.data.blogBy.blogId,
        title: d.data.blogBy.title,
        date: d.data.blogBy.date,
        content: d.data.blogBy.content,
        contentVideo: d.data.blogBy.blogViewCatVideo,
        categories: d.data.blogBy.blogCategories.nodes,
        countView: d.data.blogBy.blogViewHome.blogKolichestvoProsmotrovStati,
        blogByloPolezno: d.data.blogBy.blogViewHome.blogByloPolezno,
      };
    },
  });

  //
  return {
    article: article.value,
  };
};
