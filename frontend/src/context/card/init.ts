import { sample } from "effector";

import {
  cardLinkForm,
  cardLinkFormSubmit,
  cardLinkFx
} from "./model";

sample({
    clock: cardLinkFormSubmit,
    source: cardLinkForm.$values,
    fn: (source, cfg) => {
      return {
        ...source,
        ...cfg
      };
    },
    target: cardLinkFx
});

sample({
    clock: cardLinkFx.doneData,
    fn: data => {
      console.log(data);
    }
});