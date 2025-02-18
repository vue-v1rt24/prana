import { requestFetch } from '~/server/utils/requestFetch';
import { widgetWorkQuery } from '~/server/queriesGraphQl/widgetWork/widgetWorkQuery';
import type { TypeWidgetWork } from '~/server/types/widgetWork.types';

export default defineEventHandler(async (event) => {
  const { data } = await requestFetch<TypeWidgetWork>(widgetWorkQuery);

  return data.portfolioCategories.edges;
});
