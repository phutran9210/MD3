import { getType, get1Post } from "../../actions/posts";

const INIT_STATE = {
  postData: {
    isLoading: false,
    data: [],
  },
};

export default function get1PostReducer(state = INIT_STATE.postData, action) {
  switch (action.type) {
    case getType(get1Post.get1PostRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(get1Post.get1PostSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(get1Post.get1PostFailure):
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
