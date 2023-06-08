import { createAction, createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const loginUser = createActions({
  loginUserRequest: (payload) => payload,
  loginUserSuccess: (payload) => payload,
  loginUserFailure: (error) => error,
});
