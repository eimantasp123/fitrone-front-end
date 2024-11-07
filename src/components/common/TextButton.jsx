import PropTypes from "prop-types";

export default function TextButton({
  type = "button",
  text = "Text Buton",
  className = "",
  icon = null,
  onClick = null,
  primary = false,
}) {
  return (
    <button
      type={type}
      className={`${className} rounded-full ${icon ? "flex items-center" : ""} px-6 py-2 ${primary ? "bg-primary text-black hover:bg-primaryDark" : "bg-backgroundSecondary hover:bg-neutral-200 dark:bg-backgroundSecondary dark:text-textPrimary dark:hover:bg-neutral-800"} text-sm font-semibold transition-all duration-300 ease-in-out`}
      onClick={onClick}
    >
      {icon && icon}
      <span className="text-nowrap">{text}</span>
    </button>
  );
}

TextButton.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.element,
  primary: PropTypes.bool,
};
