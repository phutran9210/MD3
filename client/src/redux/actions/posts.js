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

export const sendAnswer = createActions({
  getSendAnswerRequest: (question_id, newAnswer) => ({
    question_id,
    newAnswer,
  }),
  getSendAnswerSuccess: (payload) => payload,
  getSendAnswerFailure: (error) => error,
});

export const sendComment = createActions({
  getSendCommentRequest: (question_id, answer_id, comment) => ({
    question_id,
    answer_id,
    comment,
  }),
  getSendCommentSuccess: (payload) => payload,
  getSendCommentFailure: (error) => error,
});

export const getBodyQuestion = createActions({
  getBodyQuestionRequest: (payload) => payload,
  getBodyQuestionSuccess: (payload) => payload,
  getBodyQuestionFailure: (error) => error,
});
