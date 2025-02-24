import { requestFetch } from '~/server/utils/requestFetch';
import { servicesQuery } from '~/server/queriesGraphQl/pages/services';
import type { TypeServices } from '~/server/types/pages/services.types';

export default defineEventHandler(async (event) => {
  const { data } = await requestFetch<TypeServices>(servicesQuery);

  return data.pageBy;
});
