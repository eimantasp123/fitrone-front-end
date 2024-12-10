import { showCustomToast } from "@/hooks/showCustomToast";
import { cleanAll } from "@/services/reduxSlices/Meals/mealDetailsSlice";
import { useAppDispatch } from "@/store";
import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import { setUserDetails } from "../services/reduxSlices/Profile/personalDetailsSlice";
import axiosInstance from "../utils/axiosInterceptors";
import { cleanAllIngredients } from "@/services/reduxSlices/Ingredients/ingredientsDetailsSlice";

const AuthContext = createContext();
const MOCK_API = import.meta.env.VITE_API_URL;
const API = axios.create({
  baseURL: MOCK_API,
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [is2FAStep, setIs2FAStep] = useState(false);
  const [userId, setUserId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [userEmail, setUserEmail] = useState("example@gmail.com");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const isAutenticated = localStorage.getItem("authenticated") === "true";
      if (!isAutenticated) {
        setIsAuthenticated(false);
        setAuthChecking(false);
        return;
      }
      try {
        const response = await axiosInstance.get("/auth/user");
        dispatch(setUserDetails(response.data.user));
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          setIsAuthenticated(false);
          dispatch(setUserDetails(null));
        }
      } finally {
        setAuthChecking(false);
      }
    };

    checkAuth();
  }, [dispatch, authChecking]);

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
      localStorage.setItem("authenticated", true);
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
    localStorage.setItem("authenticated", true);
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
      localStorage.setItem("authenticated", true);
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
      localStorage.setItem("authenticated", true);
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
    localStorage.setItem("authenticated", true);
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
  const logout = useAsync(async () => {
    await axiosInstance.post("/auth/logout");
    dispatch(setUserDetails(null));
    dispatch(cleanAll());
    dispatch(cleanAllIngredients());
    localStorage.removeItem("authenticated");
    setAuthChecking(true);
  });

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
