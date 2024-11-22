import { Spinner } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface FormButtonProps {
  isFormValid: boolean | string;
  loading: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const FormButton: FC<FormButtonProps> = ({
  isFormValid,
  loading,
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={`mt-[-10px] bg-primary text-sm text-stone-800 ${className} focus:shadow-outline w-full rounded-lg px-4 py-3 font-semibold shadow transition-all duration-300 ease-in-out hover:bg-primaryLight hover:shadow-custom-light focus:outline-none ${
        !isFormValid || loading ? "cursor-not-allowed opacity-50" : ""
      }`}
      type="submit"
      onClick={onClick}
      disabled={!isFormValid || loading}
    >
      {loading ? <Spinner size="sm" /> : children}
    </button>
  );
};

export default FormButton;
