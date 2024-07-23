import { useFormContext } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import PropTypes from "prop-types";

const InputFieldWithBorder = ({
  name,
  label = "",
  type = "text",
  placeholder = "",
  disabled = false,
  showPasswordToggle = false,
  togglePasswordVisibility = null,
  Icon,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleFocus = (event) => {
    if (type === "date") {
      event.target.showPicker(); // This will trigger the date picker to show
    }
  };

  return (
    <>
      <div className="relative py-2">
        <div className="flex justify-between mb-1 md:mb-1">
          <label className="block text-gray-500 text-sm" htmlFor={name}>
            {label}
          </label>
        </div>
        <div className="relative">
          <input
            className={`w-full text-gray-700 transition-all duration-300 ease-in-out border p-3 rounded-lg  leading-tight outline-none  ${
              !disabled ? " bg-backgroundLight focus-within:border-[#000] border-[#8f8f8f80]" : "border-gray-300 bg-transparent"
            }`}
            id={name}
            type={type}
            placeholder={placeholder || label}
            {...register(name)}
            disabled={disabled}
            onFocus={handleFocus}
          />
          {Icon && (
            <div className="absolute text-sm right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Icon />
            </div>
          )}
          {showPasswordToggle && !disabled && (
            <div
              onClick={togglePasswordVisibility}
              className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2"
            >
              {type === "password" ? (
                <IoEye className="text-lg transition-all duration-700 ease-in-out text-gray-500" />
              ) : (
                <IoEyeOff className="text-lg transition-all duration-700 ease-in-out text-gray-500" />
              )}
            </div>
          )}
        </div>
        {errors[name] && (
          <div className="flex mt-[-6px] mb-[-2px]">
            <span className="text-red-500 text-[13px]">{errors[name].message}</span>
          </div>
        )}
      </div>
    </>
  );
};

InputFieldWithBorder.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  showPasswordToggle: PropTypes.bool,
  togglePasswordVisibility: PropTypes.func,
  Icon: PropTypes.elementType,
};

export default InputFieldWithBorder;
