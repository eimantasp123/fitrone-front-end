interface SignUpPromptProps {
  handleSignUp: () => void;
  message: string;
  linkText: string;
  className?: string;
}

const SignUpPrompt = ({
  handleSignUp,
  message,
  linkText,
  className,
}: SignUpPromptProps) => {
  return (
    <div className={`text-center text-sm ${className}`}>
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

export default SignUpPrompt;
