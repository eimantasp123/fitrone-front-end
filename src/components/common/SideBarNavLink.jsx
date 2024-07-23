import { NavLink as RouterNavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { MdKeyboardArrowRight } from "react-icons/md";

const SidebarNavLink = ({
  to = "/",
  icon: Icon,
  text,
  isActiveColor = " bg-[#c9c9c924] border  text-secondary",
  isHoverColor = "hover:bg-[#c9c9c965] border border-transparent  hover:text-secondary",
  bgColor = "",
  onClick,
}) => {
  return (
    <RouterNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `transition-colors duration-300 ease-in-out items-center 
          py-[10px] pl-5 rounded-full gap-3 flex  ${isActive ? isActiveColor : isHoverColor} ${bgColor} relative overflow-hidden`
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex gap-3 items-center">
            <Icon className="text-lg " />
            <span className="text-base">{text}</span>
          </div>
          <span className={`${isActive ? "" : "hidden"} ml-auto pr-5`}>
            <MdKeyboardArrowRight className="text-xl" />
          </span>
        </>
      )}
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
