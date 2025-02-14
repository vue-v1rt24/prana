export const requestFetch = async <T>(
  query: string,
  url: string = useRuntimeConfig().public.graphqlUrl,
) => {
  const res: T = await $fetch(url, {
    query: {
      query,
    },
  });

  return res;
};
