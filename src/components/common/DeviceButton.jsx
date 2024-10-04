// import { useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function DeviceButton({ text, onClick }) {
  //   const { colorMode } = useColorMode();
  return (
    <button
      onClick={onClick}
      className={`w-full text-nowrap rounded-full border border-borderPrimary bg-background px-14 py-2 text-sm transition-colors duration-200 ease-in-out hover:bg-backgroundSecondary`}
    >
      {text}
    </button>
  );
}

DeviceButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
