import axios from "axios";
import api from "./jwtAccessToken";
const url = "http://localhost:6688";

export const fetchUsers = () => axios.get(`${url}/api/v1/users`);

export const fetchCreateUser = (payload) =>
  axios.post(`${url}/api/v1/users/register`, payload);

export const fetchUpdateRole = (payload) =>
  axios.post(`${url}/api/v1/users/updaterole`, payload);

export const fetchLogin = (payload) =>
  axios.post(`${url}/api/v1/users/login`, payload);

export const fetchPosts = (payload) => axios.get(`${url}/posts`, payload);

export const fetch1Post = (question_id) =>
  axios.get(`${url}/posts/${question_id}`);
