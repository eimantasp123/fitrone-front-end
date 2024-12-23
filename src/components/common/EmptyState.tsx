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
    <div className="mt-2 flex h-[78vh] w-[94%] flex-col items-center justify-center gap-1 rounded-2xl border-[1.5px] border-dashed border-primary bg-background text-center dark:bg-backgroundSecondary md:mt-1 md:w-[98%] 3xl:h-[70vh]">
      <VscEmptyWindow className="mb-4 text-4xl" />
      <h1 className="text-md font-medium text-textPrimary">{title}</h1>
      <p className="text-center text-sm text-textSecondary">{description}</p>
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
