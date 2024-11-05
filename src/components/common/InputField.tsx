import { useColorMode } from "@chakra-ui/react";
import { ComponentType, FC } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface InputFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  showPasswordToggle?: boolean;
  togglePasswordVisibility?: () => void;
  icon?: ComponentType;
  required?: boolean;
}

const InputField: FC<InputFieldProps> = ({
  name,
  label,
  type,
  placeholder,
  disabled = false,
  showPasswordToggle = false,
  togglePasswordVisibility,
  icon: Icon = null,
  required = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { colorMode } = useColorMode();

  // Handle conditional classes for input styling
  const getInputClassNames = (): string => {
    let classNames = `w-full text-textPrimary bg-background border transition-colors duration-300 ease-in-out px-4 py-[12px] rounded-md leading-tight outline-none`;

    if (disabled) {
      classNames += ` bg-background text-stone-500 cursor-not-allowed ${
        colorMode === "light" ? "border-[#d4d4d4]" : "border-[#272727]"
      } `;
    }

    if (errors[name as keyof typeof errors]) {
      classNames += ` border-red-500 placeholder:text-stone-500 focus:border-red-500 bg-border `;
    } else {
      classNames +=
        colorMode === "light"
          ? ` bg-transparent border-[#b6b6b6] placeholder-stone-500 focus:border-textPrimary`
          : ` bg-background border-[#494949] placeholder-stone-500 focus:border-[#e6e6e6]`;
    }

    return classNames;
  };

  return (
    <div>
      {label && (
        <div className="flex justify-between">
          <label
            className="mb-2 block pl-1 text-sm text-textPrimary"
            htmlFor={name}
          >
            {label}
            <span className="text-red-600"> {required && "*"}</span>
          </label>
        </div>
      )}

      <div className="relative">
        <input
          className={getInputClassNames()}
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          disabled={disabled}
          onKeyPress={(event) => {
            if (type === "text" && /[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />

        {Icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 transform text-textSecondary">
            <Icon />
          </div>
        )}

        {showPasswordToggle && !disabled && (
          <div
            onClick={
              togglePasswordVisibility ? togglePasswordVisibility : undefined
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
          >
            {type === "password" ? (
              <IoEye className="text-lg text-textPrimary transition-all duration-700 ease-in-out" />
            ) : (
              <IoEyeOff className="text-lg text-textPrimary transition-all duration-700 ease-in-out" />
            )}
          </div>
        )}
      </div>

      {errors[name as keyof typeof errors] && (
        <div className="flex">
          <span className="mt-1 text-[13px] text-red-500">
            {(errors[name as keyof typeof errors] as FieldError).message}
          </span>
        </div>
      )}
    </div>
  );
};

export default InputField;
