import { useFormContext } from "react-hook-form";
import { IoCloseCircleSharp, IoEye } from "react-icons/io5";
import PropTypes from "prop-types";

const InputField = ({
  name,
  label,
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
        className={`relative py-2 px-4 rounded-lg border transition-all duration-300 ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } hover:border-transparent hover:ring-2 hover:ring-blue-400 focus-within:border-transparent focus-within:ring-2 focus-within:ring-blue-500`}
      >
        <label
          className="block text-gray-700 text-sm font-semibold"
          htmlFor={name}
        >
          {label}
        </label>
        <input
          className="w-full text-gray-700 leading-tight focus:outline-none"
          id={name}
          type={type}
          placeholder={placeholder || label}
          {...register(name)}
        />
        {Icon && <Icon className="absolute right-4 bottom-3 text-gray-700" />}
        {showPasswordToggle && (
          <div
            onClick={togglePasswordVisibility}
            className="absolute cursor-pointer right-4 bottom-3"
          >
            {type === "password" ? (
              <IoEye className="text-lg text-gray-700" />
            ) : (
              <IoCloseCircleSharp className="text-lg text-gray-700" />
            )}
          </div>
        )}
      </div>
      {errors[name] && (
        <div className="flex pl-2 mt-[-6px] mb-[-2px]">
          <span className="text-red-500 text-[13px]">
            {errors[name].message}
          </span>
        </div>
      )}
    </>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  showPasswordToggle: PropTypes.bool,
  togglePasswordVisibility: PropTypes.func,
  placeholder: PropTypes.string,
};

export default InputField;
