import PropTypes from "prop-types";

const SignUpPrompt = ({ handleSignUp, message, linkText, className = "" }) => {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-gray-500">
        {message}{" "}
        <span onClick={handleSignUp} className="text-secondary cursor-pointer font-semibold">
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
