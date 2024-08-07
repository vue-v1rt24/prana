export type TypeContactFormat = {
  nomerTelefona: string;
  nomerTelefonaMenedzhment: string;
  otdelRazrabotki: string;
  settingPochta: string;
  telegramLink: string;
  vkLink: string;
  whatsappLink: string;
  yutub: string;
};

export type TypeContacts = {
  data: {
    settingsSitePage: {
      settingsSite: TypeContactFormat;
    };
  };
};
