import { createEffect, createEvent, createStore } from "effector";
import { createForm } from "effector-react-form";
import api from "../../scripts/api";

export const $user = createStore<{ name: string, id: string, user?: boolean, admin?: boolean, email?: string, phone?: string } | null>(null);

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