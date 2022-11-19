import { createEffect, createStore } from "effector";
import api from "../../scripts/api";

export const $users = createStore([]);
export const getUsersFx = createEffect(() => api('users/list'));

export type UserReviewRequest = { id: string; type: "approve" | "decline" };
export const userReviewFx = createEffect((request: UserReviewRequest) => api('users/review', request));
