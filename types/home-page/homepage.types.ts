import { type TypeMeta } from '@/types/global.types';
import { type TypeService } from '@/types/home-page/services.types';
import { type TypeNextProjectCostVarianty } from '@/types/home-page/nextProjectCostVarianty.types';

export type TypeHome = {
  data: {
    pageBy: {
      metaTags: TypeMeta;
      contentHomePage: {
        zagoovok: string;
        podzagolook: string;

        nextProjectCostZagolovok: string;
        nextProjectCostOpisanie: string;
        sphereVarianty: {
          nazvanie: string;
        }[];
        nextProjectCostVarianty: TypeNextProjectCostVarianty[];

        howWorkCardProcent: string;
        howWorkCardProcentTitle: string;
        howWorkCardProcentRepeat: {
          howWorkCardProcentRepeatLogos: {
            node: {
              mediaItemUrl: string;
            };
          };
        }[];
        howWorkCardRepeat: {
          howWorkCardRepeatTitle: string;
          howWorkCardRepeatDesc: string;
          howworkcardrepeatimg: {
            node: {
              mediaItemUrl: string;
            };
          };
        }[];
      };
    };
    services: {
      nodes: TypeService[];
    };
    serviceCategories: {
      nodes: {
        name: string;
      }[];
    };
  };
};
