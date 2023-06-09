import { getType, sendAnswer } from "../../actions/posts";

const INIT_STATE = {
  sendAnswer: {
    isLoading: false,
    data: null,
    error: null,
  },
};

export default function sendAnswerReducer(
  state = INIT_STATE.sendAnswer,
  action
) {
  switch (action.type) {
    case getType(sendAnswer.getSendAnswerRequest):
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case getType(sendAnswer.getSendAnswerSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(sendAnswer.getSendAnswerFailure):
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
