import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavItem = ({ to, icon: Icon, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 py-2 px-4 duration-200 ease-in-out rounded-lg transition-colors ${
            isActive
              ? " shadow-custom-light2  bg-backgroundLight   text-secondary"
              : "text-secondary hover:bg-text2 hover:bg-opacity-20"
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
};

export default NavItem;
