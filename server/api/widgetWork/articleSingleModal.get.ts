import { requestFetch } from '~/server/utils/requestFetch';
import { articleSingleModalQuery } from '~/server/queriesGraphQl/widgetWork/articleSingleModalQuery';
import type { TypeArticleModalServer } from '~/server/types/widgetWork.types';

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  if (!id) return;

  const { data } = await requestFetch<TypeArticleModalServer>(articleSingleModalQuery(id + ''));

  return data;
});
