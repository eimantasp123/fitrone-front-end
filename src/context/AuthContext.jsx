import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";

const AuthContext = createContext();
const MOCK_API = "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [is2FAStep, setIs2FAStep] = useState(false);
  const [userId, setUserId] = useState("");
  const [authChecking, setAuthChecking] = useState(true);
  const [resetUserEmail, setResetUserEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      setAuthChecking(true);
      try {
        const token = cookies.token;
        if (!token) throw new Error("No token found");
        const response = await axios.get(`${MOCK_API}/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setUser(response.data);
      } catch (err) {
        setUser(null);
      } finally {
        setAuthChecking(false);
      }
    };
    checkUserLoggedIn();
  }, [cookies]);

  const closeErrorModalHandler = () => {
    setError(null);
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        `${MOCK_API}/auth/refresh-token`,
        {},
        { withCredentials: true }
      );
      const newAccessToken = response.data.accessToken;
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;
      setUser(response.data.user);
    } catch (err) {
      setUser(null);
    }
  };

  const handleSignUp = () => {
    navigate("/register");
    clearMessages();
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
    clearMessages();
  };

  const handleSignIn = () => {
    navigate("/login", { replace: true });
    clearMessages();
  };

  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
    setResetUserEmail("");
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${MOCK_API}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setError(null);
      if (response.data.userId && !response.data.role) {
        setUserId(response.data.userId);
        setIs2FAStep(true);
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const verifyLogin = async (userId, code) => {
    try {
      setLoading(true);
      await axios.post(
        `${MOCK_API}/auth/verify-login`,
        { userId, code },
        { withCredentials: true }
      );
      setError(null);
      setIs2FAStep(false);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      const response = await axios.post(`${MOCK_API}/auth/forgot-password`, {
        email,
      });
      setSuccessMessage(response.data.message);
      setResetUserEmail(response.data.email);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${MOCK_API}/auth/reset-password`, {
        token,
        password,
      });
      setSuccessMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      await axios.post(
        `${MOCK_API}/auth/google`,
        {
          token: response.access_token,
        },
        { withCredentials: true }
      );

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const handleFacebookLogin = async (response) => {
    try {
      await axios.post(
        `${MOCK_API}/auth/facebook`,
        {
          accessToken: response.accessToken,
          userID: response.userID,
        },
        { withCredentials: true }
      );
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const register = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(`${MOCK_API}/auth/register`, data);
      setSuccessMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${MOCK_API}/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Error logging out: ", err);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        successMessage,
        handleGoogleLogin,
        refreshToken,
        handleFacebookLogin,
        verifyLogin,
        closeErrorModalHandler,
        handleSignUp,
        handleSignIn,
        handleForgotPassword,
        authChecking,
        resetUserEmail,
        is2FAStep,
        setError,
        clearMessages,
        forgotPassword,
        resetPassword,
        userId,
        logout,
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
