import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:6688",
  withCredentials: true,
});

async function refreshToken() {
  const token = Cookies.get("token");

  if (!token) {
    return;
  }

  const response = await api.post("/refresh-token");
  const newToken = response.data.newToken;

  if (newToken) {
    Cookies.set("token", newToken);
  }
}

api.interceptors.request.use(async (config) => {
  await refreshToken();

  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
