import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import searchTextReducer from "./searchReducer";
import loginUsers from "./loginUserReducer";
import postsReducer from "./postsReducer";
import get1PostReducer from "./get1PostReducer";
import commentReducer from "./modalReducer";
import getAnswerReducer from "./getAnswerReducer";
export default combineReducers({
  usersReducer,
  searchTextReducer,
  loginUsers,
  postsReducer,
  get1PostReducer,
  commentReducer,
  getAnswerReducer,
});
