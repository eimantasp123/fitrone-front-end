import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { IoCloseSharp, IoCheckmarkSharp } from "react-icons/io5";

const PasswordStrengthIndicator = ({ password = "" }) => {
  const [strength, setStrength] = useState({
    length: false,
    number: false,
    letter: false,
    uppercase: false,
    symbol: false,
  });

  useEffect(() => {
    setStrength({
      length: password.length >= 8,
      number: /\d/.test(password),
      uppercase: /[A-Z]/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  return (
    <div className="mx-4">
      <p className="text-sm font-medium">Password required:</p>
      <ul className="mt-2 flex items-center gap-5">
        <li className="flex items-center">
          {strength.length ? (
            <IoCheckmarkSharp className="text-green-700" />
          ) : (
            <IoCloseSharp className="text-red-500" />
          )}

          <span className="ml-2 mt-[-2px] text-sm leading-none">
            [8+ chars]
          </span>
        </li>
        <li className="flex items-center">
          {strength.number ? (
            <IoCheckmarkSharp className="text-green-700" />
          ) : (
            <IoCloseSharp className="text-red-500" />
          )}
          <span className="ml-2 mt-[-2px] text-sm leading-none">[0-9]</span>
        </li>
        <li className="flex items-center">
          {strength.uppercase ? (
            <IoCheckmarkSharp className="text-green-700" />
          ) : (
            <IoCloseSharp className="text-red-500" />
          )}
          <span className="ml-2 mt-[-2px] text-sm leading-none">[A-Z]</span>
        </li>
        <li className="flex items-center">
          {strength.symbol ? (
            <IoCheckmarkSharp className="text-green-700" />
          ) : (
            <IoCloseSharp className="text-red-500" />
          )}
          <span className="ml-2 mt-[-2px] text-sm leading-none">[@-#]</span>
        </li>
      </ul>
    </div>
  );
};
PasswordStrengthIndicator.propTypes = {
  password: PropTypes.string,
};

export default PasswordStrengthIndicator;
