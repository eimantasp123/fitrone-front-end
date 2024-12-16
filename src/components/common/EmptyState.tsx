import React from "react";
import { VscEmptyWindow } from "react-icons/vsc";
import CustomButton from "./CustomButton";

interface EmptyStateProps {
  title: string;
  description: string;
  onClickFirstButton?: () => void;
  onClickSecondButton?: () => void;
  firstButtonText?: string;
  secondButtonText?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  onClickFirstButton,
  onClickSecondButton,
  firstButtonText,
  secondButtonText,
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 p-2 pt-28">
      <VscEmptyWindow className="text-4xl" />
      <h1 className="text-md font-medium text-textPrimary">{title}</h1>
      <p className="text-center text-sm text-textSecondary">{description}</p>
      <div className="mt-4 flex items-center gap-4">
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
