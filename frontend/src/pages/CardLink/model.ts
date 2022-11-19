import { createEffect, createEvent, createStore, sample } from "effector";
import { createForm } from "effector-react-form";
import api from "../../scripts/api";

export const $user = createStore({});

export const cardLinkForm = createForm();

export const cardLinkFormSubmit = createEvent<any>();

const loginFx = createEffect((values: any) => api("linkCard", values));

sample({
    clock: cardLinkFormSubmit,
    source: cardLinkForm.$values,
    fn: (source, clock) => source,
    target: loginFx
});

sample({
    clock: loginFx.doneData,
    // fn: data => data
    target: $user
});