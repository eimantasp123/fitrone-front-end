import { showCustomToast } from "@/hooks/showCustomToast";
import { useAppDispatch } from "@/store";
import API from "@/utils/API";
import prefetchDashboardAndOtherData from "@/utils/prefetchData";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import { setUserDetails } from "../services/reduxSlices/Profile/personalDetailsSlice";
import axiosInstance, { fetchCsrfToken } from "../utils/axiosInterceptors";

const AuthContext = createContext();

/**
 *  AuthProvider component
 */
export const AuthProvider = ({ children }) => {
  const [is2FAStep, setIs2FAStep] = useState(false);
  const [userId, setUserId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [userEmail, setUserEmail] = useState("example@gmail.com");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = localStorage.getItem("authenticated") === "true";
      if (!isAuth) {
        setIsAuthenticated(false);
        setAuthChecking(false);
        queryClient.clear();
        return;
      }
      try {
        if (isAuthenticated) return;
        const response = await axiosInstance.get("/auth/user");
        dispatch(setUserDetails(response.data.user));
        setIsAuthenticated(true);
        setAuthChecking(false);
        localStorage.setItem("authenticated", "true");
        if (response.data.user && response.data.user.plan !== "base") {
          prefetchDashboardAndOtherData(queryClient);
        }
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 401
        ) {
          setIsAuthenticated(false);
          dispatch(setUserDetails(null));
        }
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.status === 429
        ) {
          showCustomToast({
            status: "error",
            description: error.response.data,
          });
        }
      } finally {
        setAuthChecking(false);
      }
    };

    checkAuth();
  }, [dispatch, authChecking, queryClient, isAuthenticated, navigate]);

  // Fetch CSRF token
  useEffect(() => {
    fetchCsrfToken();
  }, []);

  // Clear messages function
  const clearMessages = () => {
    setSuccessMessage(null);
    setUserEmail("");
  };

  // Login function
  const login = useAsync(async (email, password, signal, config) => {
    const response = await API.post(
      "/auth/login",
      { email, password },
      { signal, ...config },
    );
    clearMessages();
    if (response.data.is2FA) {
      setUserId(response.data.userId);
      setIs2FAStep(true);
    } else {
      localStorage.setItem("authenticated", "true");
      setAuthChecking(true);
    }
  });

  // Verify login function
  const verifyLogin = useAsync(async (userId, code, signal, config) => {
    const response = await API.post(
      "/auth/verify-login",
      { userId, code },
      { signal, ...config },
    );
    clearMessages();
    setIs2FAStep(false);
    dispatch(setUserDetails(response.data));
    localStorage.setItem("authenticated", "true");
    setAuthChecking(true);
  });

  // Resend code function
  const resendCode = useAsync(async (userId, signal, config) => {
    const response = await API.post(
      "/auth/resend-code",
      { userId },
      { signal, ...config },
    );
    return response.data;
  });

  // Forgot password function
  const forgotPassword = useAsync(async (email, signal, config) => {
    const response = await API.post(
      "/auth/forgot-password",
      { email },
      {
        signal,
        ...config,
      },
    );
    setSuccessMessage(response.data.message);
    setUserEmail(response.data.email);
    showCustomToast({
      status: "success",
      description: response.data.description,
    });
  });

  // Reset password function
  const resetPassword = useAsync(async (token, data, signal, config) => {
    const response = await API.post(
      `/auth/reset-password/${token}`,
      { data },
      { signal, ...config },
    );
    setSuccessMessage(response.data.message);
  });

  // Google login function
  const handleGoogleLogin = useAsync(async (tokenResponse, signal, config) => {
    const token = tokenResponse.access_token;
    const response = await API.post(
      "/auth/google",
      {},
      {
        signal,
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.data.is2FA) {
      setUserId(response.data.userId);
      setIs2FAStep(true);
    } else {
      localStorage.setItem("authenticated", "true");
      setAuthChecking(true);
    }
  });

  // Facebook login function
  const handleFacebookLogin = useAsync(async (details, signal, config) => {
    const response = await API.post(
      "/auth/facebook",
      {},
      {
        signal,
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${details.accessToken}`,
        },
      },
    );
    if (response.data.is2FA) {
      setUserId(response.data.userId);
      setIs2FAStep(true);
    } else {
      localStorage.setItem("authenticated", "true");
      setAuthChecking(true);
    }
  });

  // Register email function
  const registerEmail = useAsync(async (data, signal, config) => {
    const response = await API.post("/auth/register-email", data, {
      signal,
      ...config,
    });
    if (response.data) {
      setSuccessMessage(response.data.message);
      setUserEmail(response.data.email);
      navigate("/verify-email");
    }
  });

  // Verify email function
  const verifyEmail = useAsync(async (data, signal, config) => {
    await API.post("/auth/verify-email", data, { signal, ...config });
    navigate("/register-done");
  });

  // Complete registration function
  const completeRegistration = useAsync(async (data, signal, config) => {
    await API.post("/auth/complete-registration", data, { signal, ...config });
    localStorage.setItem("authenticated", "true");
    setAuthChecking(true);
  });

  // Resend email verify code function
  const resendEmailVerifyCode = useAsync(async (signal, config) => {
    const response = await API.post(
      "/auth/resend-email-verify-code",
      {
        email: userEmail,
      },
      { signal, ...config },
    );
    return response.data;
  });

  // Logout function
  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      dispatch(setUserDetails(null));
      queryClient.clear();
      localStorage.removeItem("authenticated");
      setAuthChecking(true);
    } catch {
      localStorage.removeItem("authenticated");
      setAuthChecking(true);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        is2FAStep,
        userId,
        authChecking,
        userEmail,
        successMessage,
        isAuthenticated,
        login,
        registerEmail,
        verifyLogin,
        completeRegistration,
        forgotPassword,
        verifyEmail,
        resetPassword,
        resendEmailVerifyCode,
        logout,
        resendCode,
        handleGoogleLogin,
        handleFacebookLogin,
        clearMessages,
        setIsAuthenticated,
        setAuthChecking,
        handleSignUp: () => {
          navigate("/register");
          clearMessages();
        },
        handleForgotPassword: () => {
          navigate("/forgot-password");
          clearMessages();
        },
        handleSignIn: () => {
          navigate("/login");
          clearMessages();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
