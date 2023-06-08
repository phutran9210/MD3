import { createAction, createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const searchText = createActions({
  searchTextRequest: (payload) => payload,
  searchTextSuccess: (payload) => payload,
  searchTextFailure: (error) => error,
});
