import { sample } from "effector";

import {
  $activeCard,
  $cards,
  cardLinkForm,
  cardLinkFormSubmit,
  cardLinkFx,
  cardListFx,
  cardSelectFx
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

sample({
  clock: cardListFx.doneData,
  fn: (result) => result,
  target: $cards
});

sample({
  clock: cardSelectFx.doneData,
  fn: (result) => {
    console.log(result);
    return result.card;
  },
  target: $activeCard
});