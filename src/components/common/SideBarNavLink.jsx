import { NavLink as RouterNavLink } from "react-router-dom";
import PropTypes from "prop-types";

const SidebarNavLink = ({ to = "/", icon: Icon, text, onClick, object }) => {
  return (
    <RouterNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `relative flex items-center gap-3 rounded-lg py-[13px] pl-4 transition-colors duration-300 ease-in-out lg:mx-2 lg:py-[9px] 3xl:py-[13px] ${
          isActive
            ? "border-primary bg-[#212121] text-white hover:bg-[#212121]"
            : "hover:bg-[#313131] hover:text-white lg:text-[#a7a7a7]"
        } relative overflow-hidden`
      }
    >
      <div className="flex items-center gap-3">
        <Icon className="mb-[-1px] text-lg" />
        <span className="text-[15px]">{text}</span>
        {object && object.length > 0 && (
          <span className="absolute right-4 top-[21px] size-2 rounded-full bg-primary lg:top-[17px] 3xl:top-[20px]" />
        )}
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
  object: PropTypes.array,
};

export default SidebarNavLink;
