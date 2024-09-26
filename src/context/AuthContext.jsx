import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAsync from "../hooks/useAsync";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserDetails } from "../services/reduxSlices/Profile/personalDetailsSlice";
import axiosInstance from "../utils/axiosInterceptors";

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
  const dispatch = useDispatch();

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
  const login = useAsync(async (email, password) => {
    const response = await API.post("/auth/login", { email, password });
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
  const verifyLogin = useAsync(async (userId, code) => {
    const response = await API.post("/auth/verify-login", { userId, code });
    clearMessages();
    setIs2FAStep(false);
    dispatch(setUserDetails(response.data));
    localStorage.setItem("authenticated", true);
    setAuthChecking(true);
  });

  // Resend code function
  const resendCode = useAsync(async (userId) => {
    const response = await API.post("/auth/resend-code", { userId });
    return response.data;
  });

  // Forgot password function
  const forgotPassword = useAsync(async (email) => {
    const response = await API.post("/auth/forgot-password", { email });
    setSuccessMessage(response.data.message);
    setUserEmail(response.data.email);
  });

  // Reset password function
  const resetPassword = useAsync(async (token, data) => {
    const response = await API.post(`/auth/reset-password/${token}`, { data });
    setSuccessMessage(response.data.message);
  });

  // Google login function
  const handleGoogleLogin = useAsync(async (tokenResponse) => {
    const token = tokenResponse.access_token;
    const response = await API.post(
      "/auth/google",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
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
  const handleFacebookLogin = useAsync(async (details) => {
    const response = await API.post(
      "/auth/facebook",
      {},
      { headers: { Authorization: `Bearer ${details.accessToken}` } },
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
  const registerEmail = useAsync(async (data) => {
    const response = await API.post("/auth/register-email", data);
    if (response.data) {
      setSuccessMessage(response.data.message);
      setUserEmail(response.data.email);
      navigate("/verify-email");
    }
  });

  // Verify email function
  const verifyEmail = useAsync(async (data) => {
    await API.post("/auth/verify-email", data);
    navigate("/register-done");
  });

  // Complete registration function
  const completeRegistration = useAsync(async (data) => {
    await API.post("/auth/complete-registration", data);
    localStorage.setItem("authenticated", true);
    setAuthChecking(true);
  });

  // Resend email verify code function
  const resendEmailVerifyCode = useAsync(async () => {
    const response = await API.post("/auth/resend-email-verify-code", {
      email: userEmail,
    });
    return response.data;
  });

  // Logout function
  const logout = useAsync(async () => {
    await axiosInstance.post("/auth/logout");
    dispatch(setUserDetails(null));
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
