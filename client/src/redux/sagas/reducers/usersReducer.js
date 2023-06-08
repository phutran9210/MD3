import {
  getUsers,
  getType,
  createUser,
  setRoleUser,
} from "../../actions/users";

// const INIT_STATE = {
//   users: {
//     isLoading: false,
//     data: [],
//   },
//   user: {
//     isLoading: false,
//     dataUser: [],
//   },
// };

const INIT_STATE = {
  isLoading: false,
  data: [],
  user: {
    isLoading: false,
    dataUser: [],
  },
};

export default function usersReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case getType(getUsers.getUsersRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getUsers.getUsersSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getUsers.getUsersFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(createUser.createUserSuccess):
      return {
        ...state,
        isLoading: false,
        data: [...state.data, ...action.payload],
      };
    case getType(setRoleUser.setRoleUserSuccess):
      return {
        ...state,
        user: {
          ...state.user,
          dataUser: action.payload,
        },
      };

    default:
      return state;
  }
}
