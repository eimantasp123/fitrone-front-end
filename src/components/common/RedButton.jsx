import { Spinner } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function RedButton({
  updateLoading,
  width = "",
  type = "submit",
  text = "Red Button",
}) {
  return (
    <button
      style={{ width: `${width}` }}
      type={type}
      className="rounded-full bg-red-600 px-6 py-2 text-sm text-white transition-colors duration-200 ease-in-out hover:bg-red-400"
    >
      {updateLoading ? <Spinner size="sm" /> : `${text}`}
    </button>
  );
}

RedButton.propTypes = {
  updateLoading: PropTypes.bool.isRequired,
  width: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
};
