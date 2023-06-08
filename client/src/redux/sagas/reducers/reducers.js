import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import searchTextReducer from "./searchReducer";
import loginUsers from "./loginUserReducer";
import postsReducer from "./postsReducer";
import get1PostReducer from "./get1PostReducer";
export default combineReducers({
  usersReducer,
  searchTextReducer,
  loginUsers,
  postsReducer,
  get1PostReducer,
});
