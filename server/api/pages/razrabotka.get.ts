import { requestFetch } from '~/server/utils/requestFetch';
import { razrabotkaQuery } from '~/server/queriesGraphQl/pages/razrabotka';
import type { TypeRazrabotka } from '~/server/types/pages/razrabotka.types';

export default defineEventHandler(async (event) => {
  const { data } = await requestFetch<TypeRazrabotka>(razrabotkaQuery);

  return {
    metaTags: data.pageBy.metaTags,
    oneScreen: {
      title: data.pageBy.razrabotkaPage.razrabotkaZagolovok,
      desc: data.pageBy.razrabotkaPage.razrabotkaOpisanie,
      instruments: data.pageBy.razrabotkaPage.razrabotkaNaChyomRazrabatyvaem.nodes,
      runImg: data.pageBy.razrabotkaPage.razrabotkaOneScreenRunImg.node.mediaItemUrl,
    },
    razrabotkaVarianty: {
      variants: data.pageBy.razrabotkaPage.razrabotkaVarianty,
      runText: data.pageBy.razrabotkaPage.razrabotkaTwoScreenTekstBegushhejStroki,
    },
    kakMyRabotaemVarianty: {
      variants: data.pageBy.razrabotkaPage.kakMyRabotaemVarianty,
      runText: data.pageBy.razrabotkaPage.kakMyRabotaemVariantyTekstBegushhejStroki,
    },
  };
});
