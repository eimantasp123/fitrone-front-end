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
      className={`w-full ${className} bg-primary ${
        disabled ? "cursor-not-allowed bg-primaryDark" : ""
      } mt-4 rounded-full py-2 text-sm font-semibold text-stone-800 transition-colors duration-300 ease-in-out hover:bg-primaryDark`}
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
