import axios from "axios";

const MOCK_API = "http://localhost:5000";
// const MOCK_API = "https://5ce5-85-190-238-82.ngrok-free.app";

const axiosInstance = axios.create({
  baseURL: MOCK_API,
  withCredentials: true,
});

const refreshToken = async () => {
  try {
    await axiosInstance.get("/auth/refresh-token");
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
