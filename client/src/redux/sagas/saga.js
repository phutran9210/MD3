import { call, put, takeLatest, select, takeEvery } from "redux-saga/effects";
import * as actions from "../actions/users";
import * as api from "../../api/UsersCallApi";
import * as login from "../actions/loginUser";
import { ADD_COMMENT, addCommentSuccess } from "../actions/modal";
import * as getPostData from "../actions/posts";
import { message } from "antd";
function* getUserSaga(action) {
  try {
    const users = yield call(api.fetchUsers);

    yield put(actions.getUsers.getUsersSuccess(users.data));
  } catch (error) {
    console.log(error);
    yield put(actions.getUsers.getUsersFailure(error));
  }
}

function* createUserSaga(action) {
  try {
    const response = yield call(api.fetchCreateUser, action.payload);
    console.log("đây là gì ?", action.payload);
    yield put(actions.createUser.createUserSuccess(response.data));

    if (response.status === 201) {
      message.success("User created successfully");
    }
  } catch (error) {
    console.log(error);
    if (error.response.data === "Username is already taken") {
      message.error("Tên đăng nhập đã được sử dụng");
    } else if (error.response.data === "Email is already taken") {
      message.error("Email đã được sử dụng");
    }
    yield put(actions.createUser.createUserFailure(error));
  }
}

function* loginedUsers(action) {
  try {
    const response = yield call(api.fetchLogin, action.payload);

    const { userID } = response.data;

    localStorage.setItem("loggedUser", JSON.stringify(userID));
  } catch (error) {
    yield put(login.loginUser.loginUserFailure(error));
  }
}

function* updateRole(action) {
  console.log("đây là payload", action.payload);
  try {
    const response = yield call(api.fetchUpdateRole, action.payload);
    console.log("Phản hồi sau khi cập nhật vai trò:", response);
    yield put(actions.setRoleUser.setRoleUserSuccess(response.data));
  } catch (error) {
    yield put(actions.setRoleUser.setRoleUserFailure(error));
  }
}

function* getPostDataSaga(action) {
  try {
    const respone = yield call(api.fetchPosts);
    console.log("đây là saga", respone.data);
    yield put(getPostData.getPosts.getPostsSuccess(respone.data));
  } catch (error) {
    yield put(getPostData.getPosts.getPostsFailure(error));
  }
}

function* get1PostSaga(action) {
  try {
    // const timestamp = new Date().getTime();
    const respone = yield call(api.fetch1Post, action.payload);

    yield put(getPostData.get1Post.get1PostSuccess(respone.data));
  } catch (error) {
    yield put(getPostData.get1Post.get1PostFailure(error));
  }
}

function* sendAnswerSaga(action) {
  console.log("saga", action);
  try {
    const { question_id, newAnswer } = action.payload;

    const response = yield call(api.fetchSendAnswer, question_id, newAnswer);
    if (response.status === 201) {
      message.success("Thành công");
    }
    yield put(getPostData.sendAnswer.getSendAnswerSuccess(response.data));
  } catch (error) {
    yield put(getPostData.sendAnswer.getSendAnswerFailure(error));
  }
}

function* handleAddComment(action) {
  const { commentText, answer_id } = action.payload;
  console.log("saga", action.payload);

  yield put(
    addCommentSuccess({ commentText: commentText, answer_id: answer_id })
  );
}

function* sendCommentSaga(action) {
  try {
    console.log("saga", action.payload.comment);
    const { question_id, answer_id, comment } = action.payload;
    const response = yield call(api.fetchSendComment, question_id, answer_id, {
      comment,
    });
  } catch (error) {
    yield put(getPostData.sendComment.getSendCommentFailure(error));
  }
}

function* getAnswerSaga(action) {
  try {
    const question_id = action.payload;

    const response = yield call(api.fetchGetAnswer, question_id);
    yield put(
      getPostData.getBodyQuestion.getBodyQuestionSuccess(response.data)
    );
  } catch (error) {
    yield put(getPostData.sendAnswer.getBodyQuestionFailure(error));
  }
}

function* mySaga() {
  yield takeLatest(actions.getUsers.getUsersRequest, getUserSaga);
  yield takeLatest(actions.createUser.createUserRequest, createUserSaga);
  yield takeLatest(actions.setRoleUser.setRoleUserRequest, updateRole);

  yield takeLatest(login.loginUser.loginUserRequest, loginedUsers);

  yield takeLatest(getPostData.getPosts.getPostsRequest, getPostDataSaga);

  yield takeLatest(getPostData.get1Post.get1PostRequest, get1PostSaga);

  yield takeLatest(getPostData.sendAnswer.getSendAnswerRequest, sendAnswerSaga);

  yield takeLatest(
    getPostData.sendComment.getSendCommentRequest,
    sendCommentSaga
  );

  yield takeLatest(
    getPostData.getBodyQuestion.getBodyQuestionRequest,
    getAnswerSaga
  );

  yield takeEvery(ADD_COMMENT, handleAddComment);
}

export default mySaga;
