// Эти типизации возможно придётся переписать, если добавятся данные вакансий (vacancies)
export type TypeContactFormat = {
  nomerTelefona: string;
  nomerTelefonaMenedzhment: string;
  otdelRazrabotki: string;
  otdelRazrabotkiVtorojNomer: string;
  settingPochta: string;
  telegramLink: string;
  vkLink: string;
  whatsappLink: string;
  yutub: string;
  behansLink: string;
  rutubLink: string;
  workspaceLink: string;
  dprofileLink: string;
};

export type TypeContacts = {
  data: {
    settingsSitePage: {
      settingsSite: TypeContactFormat;
    };
  };
};
