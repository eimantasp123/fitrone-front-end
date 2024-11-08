import { BsInfoCircle } from "react-icons/bs";

interface SuccessulAlertProps {
  successMessage?: string;
  description?: string | JSX.Element;
}

export default function SuccessulAlert({
  successMessage,
  description,
}: SuccessulAlertProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 rounded-lg border border-borderPrimary bg-backgroundSecondary p-6 text-center shadow-custom-light2">
      <BsInfoCircle className="text-lg text-textPrimary" />
      <div className="font-semibold text-textPrimary">{successMessage}</div>
      {description && (
        <div className="font-normal text-textSecondary">{description}</div>
      )}
    </div>
  );
}
