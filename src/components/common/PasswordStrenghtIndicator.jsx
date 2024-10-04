import { useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const PasswordStrengthIndicator = ({ password = "" }) => {
  const [strength, setStrength] = useState(0);
  const [strengthText, setStrengthText] = useState("");
  const { colorMode } = useColorMode();

  useEffect(() => {
    const calculateStrenght = (password) => {
      let strengthScore = 0;

      if (password.length >= 8) strengthScore++;
      if (/[A-Z]/.test(password)) strengthScore++;
      if (/[a-z]/.test(password)) strengthScore++;
      if (/\d/.test(password)) strengthScore++;
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strengthScore++;
      setStrength(strengthScore);
      setStrengthText(getStrengthText(strengthScore));
    };
    calculateStrenght(password);
  }, [password]);

  const getBarColor = (index) => {
    if (index <= strength - 1) {
      if (strength < 3) return "bg-red-500";
      if (strength < 5) return "bg-yellow-500";
      return "bg-green-500";
    }
    return `${colorMode === "light" ? "bg-neutral-300" : "bg-neutral-700"}`;
  };

  const getStrengthText = (strength) => {
    switch (strength) {
      case 0:
        return "Password strength";
      case 1:
        return "Too weak";
      case 2:
        return "Weak";
      case 3:
        return "Medium";
      case 4:
        return "Strong";
      case 5:
        return "Very Strong";
      default:
        return "Password strength";
    }
  };

  return (
    <div className="flex flex-col">
      <p className="mb-2 text-sm font-medium text-textPrimary">
        {strengthText}
      </p>
      {/* Strength Bars */}
      <div className="mb-2 flex gap-1">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`h-1 w-full ${getBarColor(index)} rounded-md`}
          ></div>
        ))}
      </div>
      {/* Instructional text */}
      <p className="text-sm text-textSecondary">
        Password must have at least 8 characters, symbols, uppercase and
        lowercase letters. Never reuse old passwords.
      </p>
    </div>
  );
};
PasswordStrengthIndicator.propTypes = {
  password: PropTypes.string,
};

export default PasswordStrengthIndicator;
