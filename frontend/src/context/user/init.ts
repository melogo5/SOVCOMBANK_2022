import { sample } from "effector";

import {
  $user,
  $userBalance,

  registrationForm,
  registrationFormSubmit,
  registrationFx,

  loginForm,
  loginFormSubmit,
  loginFx,

  userReviewSubmit,
  userReviewFx,

  getUsers,
  getUsersFx,
  changebalanceFx
} from "./model";

// register
sample({
  clock: registrationFormSubmit,
  source: registrationForm.$values,
  fn: (source, clock) => source,
  target: registrationFx
});

sample({
  clock: registrationFx.doneData,
  // fn: data => data
  target: $user
});

// login
sample({
  clock: loginFormSubmit,
  source: loginForm.$values,
  fn: (source, clock) => source,
  target: loginFx
});

sample({
  clock: loginFx.doneData,
  // fn: data => data
  target: $user
});

// review
sample({
  clock: userReviewSubmit,
  source: {},
  fn: (source, clock) => {
    return clock;
  },
  target: userReviewFx
});

// get users
sample({
  clock: getUsers,
  source: {},
  fn: (source, clock) => {
    return clock;
  },
  target: getUsersFx
});

// changeBalance
sample({
  clock: changebalanceFx.doneData,
  fn: (result) => {
    console.log(result);
    return result.balance;
  },
  target: $userBalance
});