import Spinner from "@/components/common/Spinner";
import { useAppSelector } from "@/store";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export const SupplierRoute: React.FC = () => {
  const { details: user } = useAppSelector((state) => state.personalDetails);
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

export const AdminRoute: React.FC = () => {
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
