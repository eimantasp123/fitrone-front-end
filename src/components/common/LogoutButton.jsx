import { MdLogout } from "react-icons/md";
import PropTypes from "prop-types";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import SidebarNavLink from "./SideBarNavLink";
import { Spinner } from "@chakra-ui/react";

const LogoutButton = ({ hover = false, isActiveColor, isHoverColor, bgColor }) => {
  const { logout } = useContext(AuthContext);

  const { execute: executeLogout, loading: logoutLoading } = logout;

  const handleLogout = async () => {
    try {
      await executeLogout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <SidebarNavLink
      onClick={handleLogout}
      icon={MdLogout}
      text={logoutLoading ? <Spinner size="sm" /> : "Log Out"}
      hover={hover}
      isActiveColor={isActiveColor}
      isHoverColor={isHoverColor}
      bgColor={bgColor}
      disabled={logoutLoading}
      loading={logoutLoading}
    />
  );
};

LogoutButton.propTypes = {
  hover: PropTypes.bool,
  isActiveColor: PropTypes.string,
  isHoverColor: PropTypes.string,
  bgColor: PropTypes.string,
};

export default LogoutButton;
