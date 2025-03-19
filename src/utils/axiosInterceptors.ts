import axios from "axios";
import API from "./API";

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
    window.location.href = "/login";
    return Promise.reject(error);
  }
};

// Helper function to read CSRF token from cookies
export const getCsrfTokenFromCookie = () => {
  const csrfToken = localStorage.getItem("csrfToken"); // Assuming CSRF token is stored in local storage
  return csrfToken;
};

// Helper function to fetch CSRF token
export const fetchCsrfToken = async () => {
  try {
    const { data } = await API.get("/csrf-token");
    localStorage.setItem("csrfToken", data.csrfToken);
    return data.csrfToken;
  } catch (error) {
    console.warn("Failed to fetch CSRF token:", error);
  }
};

// Request interceptor to set the Accept-Language header
axiosInstance.interceptors.request.use((config) => {
  const preferredLanguage = localStorage.getItem("i18nextLng") || "en"; // Assuming language is stored in local storage
  config.headers["Accept-Language"] = preferredLanguage;

  const csrfToken = getCsrfTokenFromCookie(); // Read from cookies
  if (csrfToken) {
    config.headers["x-csrf-token"] = csrfToken; // Attach CSRF token in headers
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 Unauthorized and the request has not been retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // If CSRF token is invalid (403 Forbidden), refresh token and retry request
    if (
      error.response?.status === 403 &&
      error.response.data?.error.code === "EBADCSRFTOKEN" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newCsrfToken = await fetchCsrfToken();

      if (newCsrfToken) {
        originalRequest.headers["x-csrf-token"] = newCsrfToken; // Attach new token
        return API(originalRequest); // Retry request
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
