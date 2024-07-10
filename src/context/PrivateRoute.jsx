import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./AuthContext";
import PropTypes from "prop-types";
import Spinner from "../components/Spinner";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, authChecking } = useContext(AuthContext);

  if (authChecking) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

PrivateRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PrivateRoute;
