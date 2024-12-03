import type { TypeContacts } from '~/types/contacts.types';

export const useContacts = async () => {
  // Получение ссылки на API
  const { graphqlUrl } = useRuntimeConfig().public;

  // Запрос
  const queryContacts = {
    query: `
      {
        settingsSitePage {
          settingsSite {
            nomerTelefona
            nomerTelefonaMenedzhment
            otdelRazrabotki
            otdelRazrabotkiVtorojNomer
            settingPochta
            telegramLink
            vkLink
            whatsappLink
            yutub
            behansLink
            rutubLink
            workspaceLink
            dprofileLink
          }
        }
      }
    `,
  };

  // Получение данных
  const { data: dataContacts } = await useFetch(graphqlUrl, {
    query: queryContacts,

    transform(data) {
      const d = data as TypeContacts;

      return {
        vacancies: null,
        contacts: d.data.settingsSitePage.settingsSite,
      };
    },
  });

  //
  return {
    dataContacts,
  };
};
