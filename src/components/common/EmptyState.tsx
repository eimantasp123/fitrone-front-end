import React from "react";
import { VscEmptyWindow } from "react-icons/vsc";
import CustomButton from "./CustomButton";
import { BiMessageError } from "react-icons/bi";

interface EmptyStateProps {
  title: string;
  description: string;
  onClickFirstButton?: () => void;
  onClickSecondButton?: () => void;
  firstButtonText?: string;
  secondButtonText?: string;
  className?: string;
  height?: string;
  status?: "default" | "error" | "warning" | "success";
}

// Coments for update

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  onClickFirstButton,
  onClickSecondButton,
  firstButtonText,
  secondButtonText,
  className = "",
  height = "h-[78vh]",
  status = "default",
}) => {
  const getIcon = () => {
    switch (status) {
      case "error":
        return <BiMessageError className="mb-4 text-4xl text-red-500" />;
      case "warning":
        return <BiMessageError className="text-warning mb-4 text-4xl" />;
      case "success":
        return <BiMessageError className="text-success mb-4 text-4xl" />;
      default:
        return <VscEmptyWindow className="mb-4 text-4xl" />;
    }
  };
  return (
    <div
      className={`mt-2 flex ${height} ${className} mb-8 w-[94%] flex-col items-center justify-center gap-1 rounded-2xl border-[1.5px] border-dashed border-primary bg-background text-center dark:bg-backgroundSecondary md:mt-1 md:w-[98%] 3xl:h-[70vh]`}
    >
      {getIcon()}
      <h1 className="text-md font-medium text-textPrimary">{title}</h1>
      <p className="px-6 text-center text-sm text-textSecondary">
        {description}
      </p>
      <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
        {firstButtonText && (
          <CustomButton
            onClick={onClickFirstButton}
            type={secondButtonText ? "dark" : "primary"}
            text={firstButtonText}
          />
        )}
        {secondButtonText && (
          <CustomButton
            onClick={onClickSecondButton}
            type="primary"
            text={secondButtonText}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
