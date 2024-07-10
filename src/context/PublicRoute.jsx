import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./AuthContext";
import Spinner from "../components/Spinner";

const PublicRoute = () => {
  const { user, authChecking } = useContext(AuthContext);

  if (authChecking) {
    return <Spinner />;
  }

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
