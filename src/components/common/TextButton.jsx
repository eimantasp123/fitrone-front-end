import { useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function TextButton({
  type = "button",
  text = "Text Buton",
  className = "",
  icon = null,
  onClick = null,
}) {
  const { colorMode } = useColorMode();
  return (
    <button
      type={type}
      className={`bg-backgroundSecondary ${className} rounded-full ${icon ? "flex items-center" : ""} px-6 py-2 ${colorMode === "dark" ? "hover:bg-neutral-800" : "hover:bg-neutral-200"} text-sm font-semibold text-textPrimary transition-all duration-300 ease-in-out`}
      onClick={onClick}
    >
      {icon && icon}
      <span>{text}</span>
    </button>
  );
}

TextButton.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.element,
};
