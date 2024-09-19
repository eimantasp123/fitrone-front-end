import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavItem = ({
  to,
  icon: Icon,
  label,
  isActiveLink = " bg-backgroundLight shadow-custom-dark2  text-secondary",
  NotActive = "text-secondary  hover:bg-text2 hover:bg-opacity-20",
}) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-4 py-2 transition-colors duration-200 ease-in-out ${
            isActive ? isActiveLink : NotActive
          }`
        }
      >
        <Icon className="text-xl" />
        {label}
      </NavLink>
    </li>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  isActiveLink: PropTypes.string,
  NotActive: PropTypes.string,
};

export default NavItem;
