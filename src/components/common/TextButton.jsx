import { useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function TextButton({
  type = "button",
  text = "Text Buton",
  className = "",
  icon = null,
  onClick = null,
  primary = false,
}) {
  const { colorMode } = useColorMode();
  return (
    <button
      type={type}
      className={`${className} rounded-full ${icon ? "flex items-center" : ""} px-6 py-2 ${primary ? "bg-primary text-black hover:bg-primaryDark" : `${colorMode === "dark" ? "bg-backgroundSecondary text-textPrimary hover:bg-neutral-800" : "bg-backgroundSecondary hover:bg-neutral-200"}`} text-sm font-semibold transition-all duration-300 ease-in-out`}
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
