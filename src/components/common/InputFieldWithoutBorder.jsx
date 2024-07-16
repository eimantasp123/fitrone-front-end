import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

const InputFieldWithoutBorder = ({ name, label, type = "text", placeholder = "", disabled = false }) => {
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
        <label className="block text-gray-500 text-sm font-medium mb-1" htmlFor={name}>
          {label}
        </label>
        <input
          className={`w-full text-gray-700 bg-transparent border-gray-300 leading-tight  focus:outline-none `}
          id={name}
          type={type}
          placeholder={placeholder || label}
          {...register(name)}
          disabled={disabled}
          onFocus={handleFocus}
        />
      </div>
      {errors[name] && (
        <div className="flex mt-[-6px] mb-[-2px]">
          <span className="text-red-500 text-[13px]">{errors[name].message}</span>
        </div>
      )}
    </>
  );
};

InputFieldWithoutBorder.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputFieldWithoutBorder;
