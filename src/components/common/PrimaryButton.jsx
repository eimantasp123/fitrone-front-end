import PropTypes from "prop-types";

export default function PrimaryButton({
  text,
  type = "button",
  onClick,
  className = "",
  children,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${className} bg-primary ${
        disabled ? "cursor-not-allowed bg-primaryLight dark:bg-primaryDark" : ""
      } mt-4 rounded-lg py-2 text-sm font-medium text-secondary transition-colors duration-300 ease-in-out hover:bg-primaryLight dark:hover:bg-primaryDark`}
    >
      {children || text}
    </button>
  );
}

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};
