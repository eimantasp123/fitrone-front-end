import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const MobileBottomMenu = ({ navItems }) => {
  return (
    <div className="fixed z-40  inset-x-0 bottom-0 shadow-custom-light3 bg-backgroundLight lg:hidden border m-4 rounded-full overflow-hidden flex justify-between items-center">
      {navItems.map(({ path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `transition-colors duration-300 ease-in-out items-center justify-center w-1/4 py-4 flex ${
              isActive ? "bg-secondary text-accent1" : "text-secondary hover:bg-[#c7c7c777]  hover:text-accent3"
            }`
          }
        >
          <Icon className="text-lg md:text-xl" />
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
