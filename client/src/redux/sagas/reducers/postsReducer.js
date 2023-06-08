import { getType, getPosts } from "../../actions/posts";

const INIT_STATE = {
  posts: {
    isLoading: false,
    dataPosts: [],
  },
};

export default function postsReducer(state = INIT_STATE.posts, action) {
  switch (action.type) {
    case getType(getPosts.getPostsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getPosts.getPostsSuccess):
      return {
        ...state,
        isLoading: false,
        dataPosts: action.payload,
      };
    case getType(getPosts.getPostsFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
