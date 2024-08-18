import { NavLink as RouterNavLink } from "react-router-dom";
import PropTypes from "prop-types";

const SidebarNavLink = ({
  to = "/",
  icon: Icon,
  text,
  isActiveColor = " bg-[#e9e9e91f]  text-accent1",
  isHoverColor = "hover:bg-[#c9c9c91d] text-text1 ",
  bgColor = "",
  onClick,
}) => {
  return (
    <RouterNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `transition-colors duration-300 ease-in-out items-center 
          py-[9px] pl-5 gap-3 flex  ${isActive ? isActiveColor : isHoverColor} ${bgColor} relative overflow-hidden`
      }
    >
      <div className="flex gap-3 items-center">
        <Icon className="text-lg " />
        <span className="text-base">{text}</span>
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
