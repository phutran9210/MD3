import { searchText, getType } from "../../actions/search.js";
const INIT_STATE = {
  searchText: {
    data: "",
  },
};

export default function searchTextReducer(
  state = INIT_STATE.searchText,
  action
) {
  switch (action.type) {
    case getType(searchText.searchTextRequest):
      return {
        ...state,
        data: action.payload,
      };
    case getType(searchText.searchTextSuccess):
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
}
