import { getType, getBodyQuestion } from "../../actions/posts";

const INIT_STATE = {
  posts: {
    isLoading: false,
    dataAnswers: [],
  },
};

export default function getAnswerReducer(state = INIT_STATE.posts, action) {
  switch (action.type) {
    case getType(getBodyQuestion.getBodyQuestionRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getBodyQuestion.getBodyQuestionSuccess):
      return {
        ...state,
        isLoading: false,
        dataAnswers: action.payload,
      };
    case getType(getBodyQuestion.getBodyQuestionFailure):
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
