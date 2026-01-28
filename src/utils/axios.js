// Axios này có thêm: Gửi Authorization Header lên backend để kiểm tra token

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/api",
});

// Gán token vào localStorage trước khi gửi request lên backend
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Sau khi backend đã trả về
// Bắt lỗi + tự động refresh access_token khi hết hạn
instance.interceptors.response.use(
  // Trường hợp nếu backend trả về thành công (200): không làm gì thêm, trả response cho component
  (response) => response,
  // Nếu backend trả về lỗi (401, 403, 500 , ...) thì chạy vào đây
  // Kiểm tra có phải token hết hạn không? có cần refresh token không
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // Nếu access_token hết hạn (401/403) thì dùng refresh_token để lấy token mới
    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/admin/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          "http://localhost:3001/api/refresh-token",
          {
            refresh_token: refreshToken,
          },
        );

        const data = res.data;

        if (data.status === "OK" && data.access_token) {
          // Lưu lại access_token mới
          localStorage.setItem("access_token", data.access_token);

          // Gắn token mới vào header và gọi lại request cũ
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

          return instance(originalRequest);
        }

        // Nếu refresh token không hợp lệ
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/admin/login";
        return Promise.reject(error);
      } catch (e) {
        // Gặp lỗi khi gọi API refresh-token
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/admin/login";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
