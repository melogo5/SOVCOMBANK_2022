import { createEffect, createStore, createEvent } from "effector";
import { createForm } from "effector-react-form";
import api from "../../scripts/api";
import { ListOptions, ListService } from "../types";
import { LoadOrdersRequest } from "./types";

export const $markets = createStore<ListOptions>([]);

export const loadMarketsFx = createEffect<void, ListService>(() => api("markets/list"));

export const $exchange = createStore<string>(""); // выбранная пара валют
export const exchangeSelect = createEvent<string>(); // выбрать пару валют

export const $exchangeOrders = createStore<Array<any> | null>([]);
export const exchangeOrdersFx = createEffect<LoadOrdersRequest, Array<any>>(request => api("markets/orders", request));

export const $exchangeData = createStore<any | null>(null);
export const exchangeDataFx = createEffect<string, any>(marketId => api("markets/get", { marketId }));

export const createOrderFx = createEffect<any, any>(request => api("markets/create", request));
export const createOrderForm = createForm({
  name: "form-create-order",
  onSubmit: ({ values, meta }) => {
    console.log('meta', values, meta)
    const { userId, marketId, type, rate } = meta;
    const amount = values.from;
    createOrderFx({ userId, marketId, type, rate, amount, secondamount: values.to }); //currency
  },
  initialMeta: {
    type: "buy",
    userId: undefined,
    marketId: undefined,
    rate: 0
  }
});

export const createOrderFormChangeType = createEvent<"buy" | "sell">();
