// Axios này có thêm: Gửi Authorization Header lên backend để kiểm tra token

import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3001/api",
});

// Gán token trước khi gửi request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Bắt lỗi
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("access_token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  },
);

export default instance;
