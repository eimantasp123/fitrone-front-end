import PropTypes from "prop-types";
import { Spinner } from "@chakra-ui/react";

const FormButton = ({
  isFormValid,
  loading,
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={`mt-[-10px] bg-primary text-sm text-stone-800 ${className} focus:shadow-outline w-full rounded-full px-4 py-3 font-semibold shadow transition-all duration-300 ease-in-out hover:bg-primaryDark hover:shadow-custom-light focus:outline-none ${
        !isFormValid || loading ? "cursor-not-allowed opacity-50" : ""
      }`}
      type="submit"
      onClick={onClick}
      disabled={!isFormValid || loading}
    >
      {loading ? <Spinner size="sm" /> : children}
    </button>
  );
};

FormButton.propTypes = {
  isFormValid: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default FormButton;
