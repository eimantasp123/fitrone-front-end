import { useColorMode } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Password strength indicator component
interface PasswordStrengthIndicatorProps {
  password?: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
}) => {
  const { t } = useTranslation("auth");
  const [strength, setStrength] = useState<number>(0);
  const [strengthText, setStrengthText] = useState<string>("");
  const { colorMode } = useColorMode();

  const getStrengthText = useCallback(
    (strength: number): string => {
      switch (strength) {
        case 0:
          return t("passwordStrengthIndicator.default");
        case 1:
          return t("passwordStrengthIndicator.toWeak");
        case 2:
          return t("passwordStrengthIndicator.weak");
        case 3:
          return t("passwordStrengthIndicator.medium");
        case 4:
          return t("passwordStrengthIndicator.strong");
        case 5:
          return t("passwordStrengthIndicator.veryStrong");
        default:
          return t("passwordStrengthIndicator.default");
      }
    },
    [t],
  );

  useEffect(() => {
    const calculateStrenght = (password: string) => {
      let strengthScore = 0;

      if (password.length >= 8) strengthScore++;
      if (/[A-Z]/.test(password)) strengthScore++;
      if (/[a-z]/.test(password)) strengthScore++;
      if (/\d/.test(password)) strengthScore++;
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strengthScore++;

      setStrength(strengthScore);
      setStrengthText(getStrengthText(strengthScore));
    };
    if (password) {
      calculateStrenght(password);
    } else {
      setStrength(0);
      setStrengthText(t("passwordStrengthIndicator.default"));
    }
  }, [password, t, setStrength, setStrengthText, getStrengthText]);

  const getBarColor = (index: number): string => {
    if (index <= strength - 1) {
      if (strength < 3) return "bg-red-500";
      if (strength < 5) return "bg-yellow-500";
      return "bg-green-500";
    }
    return `${colorMode === "light" ? "bg-neutral-300" : "bg-neutral-700"}`;
  };

  return (
    <div className="flex flex-col">
      <p className="mb-2 text-[13px] font-medium text-textPrimary">
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
      <p className="text-[13px] leading-tight text-textSecondary">
        {t("passwordStrengthIndicator.description")}
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;
