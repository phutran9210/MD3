import { createSelector } from "reselect";

export const usersState$ = (state) => state.usersReducer.data;
export const searchTextRedux = (state) => state.searchTextReducer.data;
export const postState = (state) => state.postsReducer.dataPosts;
export const onePost = (state) => state.get1PostReducer.data;
export const commentUser = (state) => state.commentReducer;
export const rawData = (state) => state.getAnswerReducer.dataAnswers;

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

export const formattedData = createSelector(rawData, (data) => {
  return data.map((item) => {
    const commentAuthorUsernames = item.comment_author_usernames
      ? item.comment_author_usernames.split(",")
      : [];
    const commentBodies = item.comment_bodies
      ? item.comment_bodies.split(",")
      : [];

    const comments = commentAuthorUsernames.map((username, index) => {
      return {
        username: username,
        body: commentBodies[index],
      };
    });

    return {
      username: item.answer_author_username,
      body: item.answer_body,
      answer_id: item.answer_id,
      comments: comments,
    };
  });
});
