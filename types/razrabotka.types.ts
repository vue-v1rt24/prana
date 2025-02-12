export type TypeMetaTags = {
  metaTitle: string;
  metaDescription: string;
};

//
export type TypeOneScreen = {
  title: string;
  desc: string;
  instruments: {
    mediaItemUrl: string;
  }[];
  runText: string;
};

//
export type TypeRazrabotkaVariantyItem = {
  razrabotkaVariantyZagolovok: string;
  razrabotkaVariantyOpisanie: string;
  razrabotkaVariantyIzobrazheniyaInstrumentov: {
    razrabotkaVariantyIzobrazheniyaInstrumentovIzobrazhenie: {
      node: {
        mediaItemUrl: string;
      };
    };
  }[];
};

export type TypeRazrabotkaVarianty = {
  variants: TypeRazrabotkaVariantyItem[];
  runText: string;
};

//
export type TypeKakMyRabotaemVariantyItem = {
  kakMyRabotaemVariantyZagolovok: string;
  kakMyRabotaemVariantyOpisanie: string;
  kakMyRabotaemVariantyIzobrazhenie: {
    node: {
      mediaItemUrl: string;
    };
  };
};

export type TypeKakMyRabotaemVarianty = {
  variants: TypeKakMyRabotaemVariantyItem[];
  runText: string;
};

//
export type TypeRazrabotka = {
  metaTags: TypeMetaTags;
  oneScreen: TypeOneScreen;
  razrabotkaVarianty: TypeRazrabotkaVarianty;
  kakMyRabotaemVarianty: TypeKakMyRabotaemVarianty;
};
