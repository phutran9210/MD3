import { ADD_COMMENT_SUCCESS } from "../../actions/modal";

const initialState = {
  latestComment: null,
  answerId: null,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        latestComment: action.payload.commentText,
        answerId: action.payload.answer_id,
      };
    default:
      return state;
  }
};

export default commentReducer;
