import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Spinner from "../components/common/Spinner";

export const PrivateRoute = () => {
  const { isAuthenticated, authChecking } = useContext(AuthContext);

  if (authChecking) {
    return <Spinner />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicRoute = () => {
  const { isAuthenticated, authChecking } = useContext(AuthContext);

  if (authChecking) {
    return <Spinner />;
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
