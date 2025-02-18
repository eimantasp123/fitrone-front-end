import React from "react";
import { VscEmptyWindow } from "react-icons/vsc";
import CustomButton from "./CustomButton";
import { BiMessageError } from "react-icons/bi";

interface EmptyStateProps {
  title: string;
  description: string;
  onClickFirstButton?: () => void;
  onClickSecondButton?: () => void;
  firstButtonText?: string | null;
  secondButtonText?: string;
  className?: string;
  height?: string;
  status?: "default" | "error" | "warning" | "success";
  marginButton?: string;
  iconShow?: boolean;
  disabledFirstButton?: boolean;
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
  height = "h-[78vh] 3xl:h-[70vh]",
  status = "default",
  marginButton = "mb-8",
  disabledFirstButton = false,
  iconShow = true,
}) => {
  const getIcon = () => {
    switch (status) {
      case "error":
        return <BiMessageError className="mb-2 text-2xl text-red-500" />;
      case "warning":
        return <BiMessageError className="text-warning mb-4 text-3xl" />;
      case "success":
        return <BiMessageError className="text-success mb-4 text-3xl" />;
      default:
        return <VscEmptyWindow className="mb-4 text-3xl" />;
    }
  };
  return (
    <div
      className={`mt-2 flex ${height} ${className} ${marginButton} w-[94%] flex-col items-center justify-center gap-1 rounded-2xl border-[1.5px] border-dashed border-primary bg-background px-6 text-center dark:bg-backgroundSecondary md:mt-1 md:w-[98%]`}
    >
      {iconShow && getIcon()}
      <h1 className="text-md font-medium text-textPrimary">{title}</h1>
      <p className="max-w-[900px] px-6 text-center text-sm text-textSecondary">
        {description}
      </p>
      <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
        {firstButtonText && (
          <CustomButton
            onClick={onClickFirstButton}
            type={secondButtonText ? "dark" : "primary"}
            text={firstButtonText}
            disabled={disabledFirstButton}
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
