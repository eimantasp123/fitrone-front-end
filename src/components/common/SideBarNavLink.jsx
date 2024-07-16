import { NavLink as RouterNavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

const SidebarNavLink = ({
  to = "/",
  icon: Icon,
  text,
  hover = false,
  isActiveColor = "bg-accent3 text-accent1 ",
  isHoverColor = "hover:bg-secondaryLight text-accent2",
  bgColor = "",
  onClick = null,
  disabled = false,
  loading = false,
}) => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  if (onClick) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`transition-colors duration-300 ease-in-out items-center ${
          hover ? "py-3 pl-5 " : "py-3 justify-center"
        } rounded-lg gap-3 flex ${isHoverColor} ${bgColor} relative overflow-hidden ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {!loading && <Icon className="text-xl text-surface" />}
        {isLargeScreen ? (
          <span className="text-base">{text}</span>
        ) : (
          <span
            className={`absolute left-14 whitespace-nowrap text-base transition-transform duration-300 ease-in-out transform ${
              hover ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 pointer-events-none translate-x-full"
            }`}
          >
            {text}
          </span>
        )}
      </button>
    );
  }

  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `transition-colors duration-300 ease-in-out items-center ${
          hover ? "py-3 pl-5 " : "py-3 justify-center"
        } rounded-lg gap-3 flex ${isActive ? isActiveColor : isHoverColor} ${bgColor} relative overflow-hidden`
      }
    >
      <Icon className="text-xl text-surface" />
      {isLargeScreen ? (
        <span className="text-base">{text}</span>
      ) : (
        <span
          className={`absolute left-14 whitespace-nowrap text-base transition-transform duration-300 ease-in-out transform ${
            hover ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 pointer-events-none translate-x-full"
          }`}
        >
          {text}
        </span>
      )}
    </RouterNavLink>
  );
};

SidebarNavLink.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  hover: PropTypes.bool.isRequired,
  isActiveColor: PropTypes.string,
  isHoverColor: PropTypes.string,
  bgColor: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export default SidebarNavLink;
