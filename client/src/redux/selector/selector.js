import { createSelector } from "reselect";

export const usersState$ = (state) => state.usersReducer.data;
export const searchTextRedux = (state) => state.searchTextReducer.data;
export const postState = (state) => state.postsReducer.dataPosts;
export const onePost = (state) => state.get1PostReducer.data;

export const finedUser = createSelector(
  usersState$,
  searchTextRedux,
  (users, data) => {
    const lowercaseData = data.toLowerCase();
    return users.filter((user) => {
      const lowercaseUsername = user.username.toLowerCase();
      return lowercaseUsername.includes(lowercaseData);
    });
  }
);
