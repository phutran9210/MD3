import { createAction, createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const getUsers = createActions({
  getUsersRequest: undefined,
  getUsersSuccess: (payload) => payload,
  getUsersFailure: (error) => error,
});

export const createUser = createActions({
  createUserRequest: (payload) => payload,
  createUserSuccess: (payload) => payload,
  createUserFailure: (error) => error,
});

export const setRoleUser = createActions({
  setRoleUserRequest: (payload) => payload,
  setRoleUserSuccess: (payload) => payload,
  setRoleUserFailure: (err) => err,
});
