import { useFormContext } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import PropTypes from "prop-types";

const InputField = ({
  name,
  type = "text",
  icon: Icon = null,
  showPasswordToggle = false,
  togglePasswordVisibility = null,
  placeholder = "",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div
        className={`relative px-4 rounded-md border transition-colors duration-300 ${
          errors[name] ? "border-red-500" : "border-borderColor"
        } hover:border-textSecondary  focus-within:hover:border-textPrimary focus-within:border-textSecondary focus-within:ring-1 focus-within:ring-textSecondary `}
      >
        <input
          className="w-full py-4  lg:py-3 placeholder:text-textSecondary text-textPrimary bg-transparent leading-tight focus:outline-none focus:ring-0"
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
        />
        {Icon && <Icon className="absolute right-4 bottom-[14px] text-textSecondary" />}
        {showPasswordToggle && (
          <div onClick={togglePasswordVisibility} className="absolute cursor-pointer right-4 bottom-3">
            {type === "password" ? (
              <IoEye className="text-lg text-textSecondary" />
            ) : (
              <IoEyeOff className="text-lg text-textSecondary" />
            )}
          </div>
        )}
      </div>
      {errors[name] && (
        <div className="flex pl-2 mt-[-6px] mb-[-2px]">
          <span className="text-red-500 text-[13px]">{errors[name].message}</span>
        </div>
      )}
    </>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  showPasswordToggle: PropTypes.bool,
  togglePasswordVisibility: PropTypes.func,
  placeholder: PropTypes.string,
};

export default InputField;
