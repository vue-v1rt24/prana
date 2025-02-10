export const requestFetch = async <T>(
  query: string,
  url: string = useRuntimeConfig().public.graphqlUrl,
) => {
  const res = (await $fetch(url, {
    query: {
      query,
    },
  })) as T;

  return res;
};
