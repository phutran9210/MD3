import { createAction, createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const getPosts = createActions({
  getPostsRequest: undefined,
  getPostsSuccess: (payload) => payload,
  getPostsFailure: (error) => error,
});
export const get1Post = createActions({
  get1PostRequest: (payload) => payload,
  get1PostSuccess: (payload) => payload,
  get1PostFailure: (error) => error,
});
