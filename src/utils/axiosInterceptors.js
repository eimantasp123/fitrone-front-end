import axios from "axios";

const MOCK_API = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: MOCK_API,
  withCredentials: true,
});

const refreshToken = async () => {
  try {
    await axiosInstance.post("/auth/refresh-token");
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

    if (error.response && error.response.status === 403) {
      // Handle 403 error
    }

    if (error.response && error.response.status === 500) {
      // Handle 500 error
    }
    if (error.response && error.response.status === 404) {
      // Handle 404 error
    }

    if (error.response && error.response.status === 400) {
      // Handle 400 error
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
