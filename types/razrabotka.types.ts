export type TypeOneScreen = {
  title: string;
  desc: string;
  instruments: {
    mediaItemUrl: string;
  }[];
  runText: string;
};

export type TypeRazrabotkaVarianty = {
  variants: {
    razrabotkaVariantyZagolovok: string;
    razrabotkaVariantyOpisanie: string;
    razrabotkaVariantyIzobrazheniyaInstrumentov: {
      razrabotkaVariantyIzobrazheniyaInstrumentovIzobrazhenie: {
        node: {
          mediaItemUrl: string;
        };
      };
    }[];
  }[];
  runText: string;
};

export type TypeKakMyRabotaemVarianty = {
  kakMyRabotaemVariantyZagolovok: string;
  kakMyRabotaemVariantyOpisanie: string;
  kakMyRabotaemVariantyIzobrazhenie: {
    node: {
      mediaItemUrl: string;
    };
  };
};

export type TypeRazrabotka = {
  oneScreen: TypeOneScreen;
  razrabotkaVarianty: TypeRazrabotkaVarianty;
  kakMyRabotaemVarianty: TypeKakMyRabotaemVarianty[];
};
