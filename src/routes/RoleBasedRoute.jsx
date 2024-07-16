import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Spinner from "../components/common/Spinner";

export const TrainerRoute = () => {
  const { user, isAuthenticated, authChecking } = useContext(AuthContext);

  if (authChecking) {
    return <Spinner />;
  }

  return isAuthenticated && user.role === "trainer" ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export const AdminRoute = () => {
  const { user, isAuthenticated, authChecking } = useContext(AuthContext);

  if (authChecking) {
    return <Spinner />;
  }

  return isAuthenticated && user.role === "admin" ? <Outlet /> : <Navigate to="/dashboard" replace />;
};
