import { sample } from "effector";
import { $user } from "../user";
import {
  loadMarketsFx,
  $markets,

  exchangeSelect,
  $exchange,
  exchangeOrdersFx
} from "./model";

sample({
  source: loadMarketsFx.doneData,
  fn: data => data.map(({ id, name }) => ({ value: id, label: name })),
  target: $markets
});

// выбор пары валют для обмена
sample({
  source: exchangeSelect,
  target: $exchange
});

// запрос списка лотов для выбранной пары валют
sample({
  clock: exchangeSelect,
  source: $user,
  filter: (user, exchange) => Boolean(exchange && user),
  fn: (user, exchange) => ({ marketId: exchange, userId: user!.id }),
  target: exchangeOrdersFx
});
