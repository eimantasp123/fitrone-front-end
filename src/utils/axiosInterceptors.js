import axios from "axios";

const MOCK_API = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: MOCK_API,
  withCredentials: true,
});

const refreshToken = async () => {
  try {
    await axios.get(`${MOCK_API}/auth/refresh-token`, {
      withCredentials: true,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        if (refreshError.response && refreshError.response.status === 401) {
          console.error("An error occurred while making a request:", error);
          return Promise.reject(refreshError);
        }
        return Promise.reject(refreshError);
      }
    } else {
      return Promise.reject(error);
    }
  },
);

export default axiosInstance;
