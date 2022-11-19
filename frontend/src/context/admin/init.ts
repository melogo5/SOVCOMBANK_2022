import { sample } from "effector";
import {
  $users,
  getUsersFx,
  userReviewFx
} from "./model";

sample({
  clock: [getUsersFx.doneData, userReviewFx.doneData],
  fn: (result) => result.data,
  target: $users
});
