
import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BACKEND}`,
  withCredentials: true, // Cho phép gửi cookie lên backend
});

// Interceptor để xử lý lỗi 401 và retry
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Gọi refresh token trước
        await instance.post('/refresh-token');
        // Nếu thành công, retry request gốc
        return instance(originalRequest);
      } catch (refreshError) {
        // Nếu refresh fail, reject
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default instance;
