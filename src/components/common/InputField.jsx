import { useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";

const InputField = ({
  name,
  label = "",
  type = "text",
  placeholder = "",
  disabled = false,
  showPasswordToggle = false,
  togglePasswordVisibility = null,
  icon: Icon = null,
  required = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { colorMode } = useColorMode();

  // Handle conditional classes for input styling
  const getInputClassNames = () => {
    // Base classes
    let classNames = `w-full  text-textPrimary  border transition-colors duration-300 ease-in-out px-4 py-[12px] rounded-md leading-tight outline-none`;

    // Disabled state
    if (disabled) {
      classNames += ` bg-background text-stone-500 cursor-not-allowed  ${
        colorMode === "light" ? "border-[#d4d4d4]" : "border-[#272727]"
      } `;
    }

    if (errors[name]) {
      classNames += ` border-red-500 placeholder:text-stone-500 focus:border-red-500 bg-border `;
    } else {
      if (colorMode === "light") {
        classNames += ` bg-transparent border-[#b6b6b6] placeholder-stone-500 focus:border-textPrimary`;
      } else {
        classNames += ` bg-background border-[#494949] placeholder-stone-500 focus:border-[#e6e6e6]`;
      }
    }

    return classNames;
  };

  return (
    <>
      {/* Input field */}
      <div className="">
        {/* Label */}
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

        {/* Input element */}
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

          {/* Icon field */}
          {Icon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 transform text-textSecondary">
              <Icon />
            </div>
          )}

          {/* Password visibility toggle */}
          {showPasswordToggle && !disabled && (
            <div
              onClick={togglePasswordVisibility}
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

        {/* Error message */}
        {errors[name] && (
          <div className="flex">
            <span className="mt-1 text-[13px] text-red-500">
              {errors[name].message}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  showPasswordToggle: PropTypes.bool,
  togglePasswordVisibility: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.elementType,
  onChange: PropTypes.func,
  value: PropTypes.string,
  required: PropTypes.bool,
};

export default InputField;
