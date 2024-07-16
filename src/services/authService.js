import axiosInstance from "../utils/axiosInterceptors";

export const login = async (email, password, signal) => {
  const response = await axiosInstance.post("/auth/login", { email, password }, { signal });
  return response.data;
};

export const verifyLogin = async (userId, code, signal) => {
  const response = await axiosInstance.post("/auth/verify-login", { userId, code }, { signal });
  return response.data;
};

export const resendCode = async (userId, signal) => {
  await axiosInstance.post("/auth/resend-code", { userId }, { signal });
};

export const forgotPassword = async (email, signal) => {
  const response = await axiosInstance.post("/auth/forgot-password", { email }, { signal });
  return response.data;
};

export const resetPassword = async (token, password, signal) => {
  const response = await axiosInstance.post("/auth/reset-password", { token, password }, { signal });
  return response.data;
};

export const handleGoogleLogin = async (tokenResponse, signal) => {
  const response = await axiosInstance.post("/auth/google", { token: tokenResponse.access_token }, { signal });
  return response.data;
};

export const handleFacebookLogin = async (data, signal) => {
  const response = await axiosInstance.post(
    "/auth/facebook",
    {
      accessToken: data.accessToken,
      userID: data.userID,
    },
    { signal }
  );
  return response.data;
};

export const register = async (data, signal) => {
  const response = await axiosInstance.post("/auth/register", data, { signal });
  return response.data;
};

export const logout = async (signal) => {
  await axiosInstance.post("/auth/logout", {}, { signal });
};

export const getUser = async () => {
  const response = await axiosInstance.get("/auth/user", { withCredentials: true });
  return response.data;
};

export const refreshToken = async () => {
  const response = await axiosInstance.get("/auth/refresh-token", { withCredentials: true });
  return response.data;
};
