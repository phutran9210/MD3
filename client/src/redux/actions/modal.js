import { createAction } from "redux-actions";

export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";

export const addComment = createAction("ADD_COMMENT");
export const addCommentSuccess = createAction("ADD_COMMENT_SUCCESS");
