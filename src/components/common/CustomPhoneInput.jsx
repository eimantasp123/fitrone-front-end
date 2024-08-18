import PropTypes from "prop-types";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../../styles/customPhoneInput.css";
import { FaPhone } from "react-icons/fa";

const CustomPhoneInput = ({ value, onChange, label, placeholder, disabled, Icon = FaPhone, error }) => {
  return (
    <div className="relative py-2">
      <div className="flex justify-between mb-1 md:mb-1">
        <label className="block text-gray-500 text-sm" htmlFor="phone">
          {label}
        </label>
      </div>
      <div className="phone-input-container relative flex">
        <div className="w-full relative">
          <PhoneInput
            international
            defaultCountry="LT"
            value={value}
            onChange={onChange}
            placeholder={placeholder || label}
            disabled={disabled}
            className="PhoneInput"
          />
          {Icon && (
            <div className="absolute text-sm right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Icon />
            </div>
          )}
        </div>
      </div>
      {error && (
        <div className="flex mt-[6px] mb-[-2px]">
          <span className="text-red-500 text-[13px]">{error}</span>
        </div>
      )}
    </div>
  );
};

CustomPhoneInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  Icon: PropTypes.elementType,
  error: PropTypes.string,
};

export default CustomPhoneInput;
