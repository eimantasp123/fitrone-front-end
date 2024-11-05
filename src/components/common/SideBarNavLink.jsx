import { NavLink as RouterNavLink } from "react-router-dom";
import PropTypes from "prop-types";

const SidebarNavLink = ({ to = "/", icon: Icon, text, onClick }) => {
  return (
    <RouterNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `relative flex items-center gap-3 py-[13px] pl-5 outline-none transition-colors duration-300 ease-in-out lg:py-[10px] ${
          isActive
            ? "border-primary bg-primary text-black"
            : "hover:bg-backgroundSecondary lg:text-textPrimary"
        } relative overflow-hidden`
      }
    >
      <div className="flex items-center gap-3">
        <Icon className="mb-[-1px] text-lg" />
        <span className="text-sm">{text}</span>
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
