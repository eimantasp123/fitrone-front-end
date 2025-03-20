import axios from "axios";
import { fetchCsrfToken, getCsrfTokenFromCookie } from "./axiosInterceptors";

const MOCK_API = import.meta.env.VITE_API_URL;

// Create Axios instance
const API = axios.create({
  baseURL: MOCK_API,
  withCredentials: true, // ✅ Ensures cookies (JWT, CSRF) are sent automatically
});

// Add CSRF token to every request
API.interceptors.request.use((config) => {
  const csrfToken = getCsrfTokenFromCookie();
  if (csrfToken) {
    config.headers["x-csrf-token"] = csrfToken; // ✅ Attach CSRF token in headers
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If CSRF token is invalid (403 Forbidden), refresh token and retry request
    if (
      error.response?.status === 403 &&
      error.response.data?.code === "EBADCSRFTOKEN" &&
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

export default API;
