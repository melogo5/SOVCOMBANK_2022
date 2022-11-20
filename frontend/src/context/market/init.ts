import { sample } from "effector";
import { $user } from "../user";
import {
  loadMarketsFx,
  $markets,

  exchangeSelect,
  $exchange,
  exchangeOrdersFx,
  $exchangeOrders,
  exchangeDataFx,
  $exchangeData,

  createOrderForm,
  createOrderFormChangeType,
  createOrderFx,

  currencyListFx,
  $currencyList
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

sample({
  source: exchangeOrdersFx.doneData,
  target: $exchangeOrders
});

// запрос инфы о бирже для выбранной пары валют
sample({
  clock: exchangeSelect,
  filter: exchange => Boolean(exchange),
  target: exchangeDataFx
});

sample({
  source: exchangeDataFx.doneData,
  target: $exchangeData
});

// форма создяния заявки
// расчёт курса
sample({
  clock: createOrderForm.onChangeFieldBrowser,
  source: { values: createOrderForm.$values, meta: createOrderForm.$meta },
  filter: ({ values }, clock) => values.from > 0 && values.to > 0,
  fn: ({ values, meta }, clock) => {
    console.log(meta)
    const rate = (values.to / values.from);
    return { ...meta, rate };
  },
  target: createOrderForm.$meta
});

sample({
  clock: createOrderForm.onChangeFieldBrowser,
  source: { values: createOrderForm.$values, meta: createOrderForm.$meta },
  filter: ({ values }, clock) => !values.from || !values.to,
  fn: ({ values, meta }, clock) => ({ ...meta, rate: 0 }),
  target: createOrderForm.$meta
});

// смена типа заявки
sample({
  clock: createOrderFormChangeType,
  source: createOrderForm.$meta,
  fn: (meta, type) => ({ ...meta, type }),
  target: createOrderForm.$meta
});

// смена биржи
sample({
  clock: createOrderForm.$meta,
  source: $exchange,
  filter: (marketId, meta) => Boolean(marketId) && meta.marketId !== marketId,
  fn: (marketId, meta) => ({ ...meta, marketId }),
  target: createOrderForm.$meta
});

// юзер
sample({
  clock: createOrderForm.$meta,
  source: $user,
  filter: (user, meta) => user !== null && meta.userId !== user.id,
  fn: (user, meta) => ({ ...meta, userId: user!.id }),
  target: createOrderForm.$meta
});

// после создания заявки можно перегрузить список созданных заявок
// правда юзер не видит свои заявки, так что есть ли в этом смысл?
// sample({
//   clock: createOrderFx.done,
//   fn: ({ params }) => params, // { marketId, userId }
//   target: exchangeOrdersFx
// });

// Список валюты
sample({
  clock: currencyListFx.doneData,
  fn: (result) => {
    return result.data;
  },
  target: $currencyList
});
