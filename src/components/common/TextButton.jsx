import PropTypes from "prop-types";

export default function TextButton({
  type = "button",
  text = "Text Buton",
  className = "",
  onClick = null,
}) {
  return (
    <button
      type={type}
      className={`bg-secondary ${className} rounded-full px-6 py-2 text-sm font-semibold text-textPrimary transition duration-200 ease-in-out hover:bg-backgroundSecondary`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

TextButton.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
