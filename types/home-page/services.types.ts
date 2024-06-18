export type TypeService = {
  title: string;
  slug: string;
  servicesContent: {
    kratkoeOpisanieNaGlavnoj: string;
  };
  serviceCategories: {
    nodes: [
      {
        databaseId: number;
      },
    ];
  };
};

//
export type TypeServiceCategories = {
  name: string;
};
