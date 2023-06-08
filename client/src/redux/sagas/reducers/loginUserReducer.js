import { getType, loginUser } from "../../actions/loginUser";

const INIT_STATE = {
  userInfo: {
    isLoading: false,
    userData: null,
  },
};

export default function loginUsers(state = INIT_STATE.userInfo, action) {
  switch (action.type) {
    case getType(loginUser.loginUserRequest):
      return {
        ...state,
        isLoading: true,
        userData: action.payload,
      };
    case getType(loginUser.loginUserSuccess):
      return {
        ...state,
        isLoading: false,
        userData: action.payload,
      };
    case getType(loginUser.loginUserFailure):
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
