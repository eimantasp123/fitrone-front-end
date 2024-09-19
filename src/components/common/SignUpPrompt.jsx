import PropTypes from "prop-types";

const SignUpPrompt = ({ handleSignUp, message, linkText, className = "" }) => {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-textPrimary">
        {message}{" "}
        <span
          onClick={handleSignUp}
          className="cursor-pointer font-semibold text-textPrimary transition-colors duration-300 ease-in-out hover:text-textSecondary"
        >
          {linkText}
        </span>
      </p>
    </div>
  );
};

SignUpPrompt.propTypes = {
  handleSignUp: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SignUpPrompt;
