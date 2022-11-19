import { createEffect, createEvent, createStore, sample } from "effector";
import { createForm } from "effector-react-form";
import api from "../../scripts/api";

export const cardLinkForm = createForm();

export const cardLinkFormSubmit = createEvent<any>();

export const cardLinkFx = createEffect((values: any) => {
    return api("cards/append", values);
});
