import { createEffect, createEvent, createStore, sample } from "effector";
import { createForm } from "effector-react-form";
import { ICard } from "../../interfaces";
import api from "../../scripts/api";

export const $cards = createStore<ICard[]>([]);
export const $activeCard = createStore<ICard | null>(null);

export const cardLinkForm = createForm();
export const cardLinkFormSubmit = createEvent<any>();

export const cardLinkFx = createEffect((values: any) => api("cards/append", values));

export const cardListFx = createEffect((values: {userId: string}) => api("cards/list", values));
export const cardSelectFx = createEffect((values: {cardId: string}) => api("cards/select", values));