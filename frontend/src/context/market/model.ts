import { createEffect, createStore, createEvent } from "effector";
import api from "../../scripts/api";
import { ListOptions, ListService } from "../types";
import { LoadOrdersRequest } from "./types";

export const $markets = createStore<ListOptions>([]);

export const loadMarketsFx = createEffect<void, ListService>(() => api("markets/list"));

export const $exchange = createStore<string>(""); // выбранная пара валют
export const exchangeSelect = createEvent<string>(); // выбрать пару валют
export const exchangeOrdersFx = createEffect((request: LoadOrdersRequest) => api("markets/select", request));
