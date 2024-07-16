import PropTypes from "prop-types";
import { Spinner } from "@chakra-ui/react";

const FormButton = ({ isFormValid, loading, children, className = "" }) => {
  return (
    <button
      className={` bg-accent1Dark text-secondary mt-[-10px] ${className} shadow transition-all hover:shadow-custom-light hover:bg-accent1 duration-200 ease-in-out font-semibold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full ${
        !isFormValid || loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      type="submit"
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
};

export default FormButton;
