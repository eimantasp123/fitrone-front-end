import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const MobileBottomMenu = ({ navItems }) => {
  return (
    <div className="fixed inset-x-0 bottom-0 md:hidden bg-secondary overflow-hidden flex justify-between items-center">
      {navItems.map(({ path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `transition-colors duration-300 ease-in-out items-center justify-center w-1/4 py-4 flex ${
              isActive ? "bg-secondaryLight text-accent1" : "text-accent2 hover:bg-accent1Light hover:text-accent3"
            }`
          }
        >
          <Icon className="text-2xl" />
        </NavLink>
      ))}
    </div>
  );
};

MobileBottomMenu.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    })
  ).isRequired,
};

export default MobileBottomMenu;
