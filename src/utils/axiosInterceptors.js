import axios from "axios";

const MOCK_API = import.meta.env.VITE_API_URL;
// const MOCK_API = "http://localhost:5000/api/v1";

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

// Request interceptor to set the Accept-Language header
axiosInstance.interceptors.request.use((config) => {
  const preferredLanguage = localStorage.getItem("i18nextLng") || "en"; // Assuming language is stored in local storage
  config.headers["Accept-Language"] = preferredLanguage;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
