import { NavLink as RouterNavLink } from "react-router-dom";
import PropTypes from "prop-types";

const SidebarNavLink = ({ to = "/", icon: Icon, text, onClick }) => {
  return (
    <RouterNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `relative flex items-center gap-3 rounded-lg py-[13px] pl-4 transition-colors duration-300 ease-in-out lg:mx-2 lg:py-[7px] 3xl:py-[10px] ${
          isActive
            ? "border-primary bg-primary text-black hover:bg-primaryDark"
            : "hover:bg-[#313131] hover:text-white lg:text-[#a7a7a7]"
        } relative overflow-hidden`
      }
    >
      <div className="flex items-center gap-3">
        <Icon className="mb-[-1px] text-lg" />
        <span className="text-[15px]">{text}</span>
      </div>
    </RouterNavLink>
  );
};

SidebarNavLink.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  isActiveColor: PropTypes.string,
  isHoverColor: PropTypes.string,
  bgColor: PropTypes.string,
  onClick: PropTypes.func,
};

export default SidebarNavLink;
