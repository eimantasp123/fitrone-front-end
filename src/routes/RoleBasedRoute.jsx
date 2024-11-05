import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Spinner from "../components/common/Spinner";
import { useSelector } from "react-redux";

export const SupplierRoute = () => {
  const { details: user } = useSelector((state) => state.personalDetails);
  const { isAuthenticated, authChecking } = useContext(AuthContext);

  if (authChecking) {
    return <Spinner />;
  }

  return isAuthenticated && user.role === "supplier" ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

export const AdminRoute = () => {
  const { user, isAuthenticated, authChecking } = useContext(AuthContext);

  if (authChecking) {
    return <Spinner />;
  }

  return isAuthenticated && user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace />
  );
};
