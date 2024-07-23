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
        className={`relative py-2 px-4 rounded-lg border transition-all duration-300 ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } hover:border-gray-400  focus-within:hover:border-transparent focus-within:border-transparent focus-within:ring-1 focus-within:ring-secondary bg-backgroundLight`}
      >
        <input
          className="w-full py-1 text-gray-700 bg-transparent leading-tight focus:outline-none focus:ring-0"
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
        />
        {Icon && <Icon className="absolute right-4 bottom-3 text-gray-400" />}
        {showPasswordToggle && (
          <div onClick={togglePasswordVisibility} className="absolute cursor-pointer right-4 bottom-3">
            {type === "password" ? <IoEye className="text-lg text-gray-400" /> : <IoEyeOff className="text-lg text-gray-400" />}
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
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  showPasswordToggle: PropTypes.bool,
  togglePasswordVisibility: PropTypes.func,
  placeholder: PropTypes.string,
};

export default InputField;
