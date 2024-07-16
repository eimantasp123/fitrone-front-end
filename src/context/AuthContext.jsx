import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAsync from "../hooks/useAsync";
import * as authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [is2FAStep, setIs2FAStep] = useState(false);
  const [userId, setUserId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [resetUserEmail, setResetUserEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await authService.getUser();
        if (data.code === "REFRESH_TOKENS") {
          const refreshedData = await authService.refreshToken();
          setUser(refreshedData);
          setIsAuthenticated(true);
        } else if (data.code === "NO_TOKENS") {
          return;
        } else {
          setUser(data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setIsAuthenticated(false);
          setUser(null);
        }
      } finally {
        setAuthChecking(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await authService.refreshToken();
      } catch (error) {
        console.error("Error refreshing token:", error.response.data.message);
      }
    }, 14 * 60 * 1000); // Every 14 minutes

    return () => clearInterval(interval);
  }, []);

  const clearMessages = () => {
    setSuccessMessage(null);
    setResetUserEmail("");
  };

  const login = useAsync(async (email, password, signal) => {
    const data = await authService.login(email, password, signal);
    clearMessages();
    if (data.is2FA) {
      setUserId(data.userId);
      setIs2FAStep(true);
    } else {
      setUser(data);
      setIsAuthenticated(true);
      navigate("/dashboard", { replace: true });
    }
  });

  const verifyLogin = useAsync(async (userId, code, signal) => {
    const data = await authService.verifyLogin(userId, code, signal);
    clearMessages();
    setIs2FAStep(false);
    setUser(data);
    setIsAuthenticated(true);
    navigate("/dashboard", { replace: true });
  });

  const resendCode = useAsync(async (userId, signal) => {
    await authService.resendCode(userId, signal);
  });

  const forgotPassword = useAsync(async (email, signal) => {
    const data = await authService.forgotPassword(email, signal);
    setSuccessMessage(data.message);
    setResetUserEmail(data.email);
  });

  const resetPassword = useAsync(async (token, password, signal) => {
    const data = await authService.resetPassword(token, password, signal);
    setSuccessMessage(data.message);
  });

  const handleGoogleLogin = useAsync(async (tokenResponse, signal) => {
    const responseData = await authService.handleGoogleLogin(tokenResponse, signal);
    setUser(responseData);
    setIsAuthenticated(true);
    navigate("/dashboard", { replace: true });
  });

  const handleFacebookLogin = useAsync(async (data, signal) => {
    const responseData = await authService.handleFacebookLogin(data, signal);
    setUser(responseData);
    setIsAuthenticated(true);
    navigate("/dashboard", { replace: true });
  });

  const register = useAsync(async (data, signal) => {
    const responseData = await authService.register(data, signal);
    setSuccessMessage(responseData.message);
  });

  const logout = useAsync(async (signal) => {
    await authService.logout(signal);
    setUser(null);
    setIsAuthenticated(false);
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        is2FAStep,
        userId,
        authChecking,
        resetUserEmail,
        successMessage,
        isAuthenticated,
        login,
        register,
        verifyLogin,
        forgotPassword,
        resetPassword,
        logout,
        resendCode,
        handleGoogleLogin,
        handleFacebookLogin,
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
