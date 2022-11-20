import { createEffect, createEvent, createStore } from "effector";
import { createForm } from "effector-react-form";
import api from "../../scripts/api";
import { UserDescriptor } from "./types";

export const $user = createStore<UserDescriptor | null>(null);
export const $userBalance = createStore<number>(0);

// register
export const registrationForm = createForm();

export const registrationFormSubmit = createEvent<any>();

export const registrationFx = createEffect((values: any) => api("users/register", values));

// login
export const loginForm = createForm();
export const loginFormSubmit = createEvent<any>();
export const loginFx = createEffect((values: any) => api("users/login", values));

// review
export const userReviewSubmit = createEvent<any>();
export const userReviewFx = createEffect((values: any) => api("users/review", values));

// getUsers
export const getUsers = createEvent<any>();
export const getUsersFx = createEffect((values: any) => api("users/review", values));

// getUsers
export const getBalanceFx = createEffect((values: any) => api("users/balanceGet", values));
export const changebalanceFx = createEffect((values: any) => api("users/balanceChange", values));
