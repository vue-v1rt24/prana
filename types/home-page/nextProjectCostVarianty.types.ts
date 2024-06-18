export type TypeUslugi = {
  nextProjectCostUslugaRepeatNazvanie: string;
  nextProjectCostUslugaRepeatOpisanie: string;
};

export type TypeNextProjectCostVarianty = {
  nextProjectCostUslugiRepeatIzbrazhenie: {
    node: {
      mediaItemUrl: string;
    };
  };
  nextProjectCostUslugiRepeatNazvanie: string;
  nextProjectCostVariantyRepeatOpisanie: string;
  uslugi: TypeUslugi[];
};
