export type TypeUslugi = {
  nextProjectCostUslugaRepeatNazvanie: string;
  nextProjectCostUslugaRepeatOpisanie: string;
  selected: boolean;
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
