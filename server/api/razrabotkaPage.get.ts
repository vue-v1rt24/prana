import { requestFetch } from '../utils/requestFetch';
import { razrabotkaQuery } from '../queriesGraphQl/razrabotka';
import type { TypeRazrabotka } from '../types/razrabotka.types';

export default defineEventHandler(async (event) => {
  const { data } = await requestFetch<TypeRazrabotka>(razrabotkaQuery);

  return {
    metaTags: data.pageBy.metaTags,
    oneScreen: {
      title: data.pageBy.razrabotkaPage.razrabotkaZagolovok,
      desc: data.pageBy.razrabotkaPage.razrabotkaOpisanie,
      instruments: data.pageBy.razrabotkaPage.razrabotkaNaChyomRazrabatyvaem.nodes,
      runText: data.pageBy.razrabotkaPage.razrabotkaOneScreenTekstBegushhejStroki,
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
