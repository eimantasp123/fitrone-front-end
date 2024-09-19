import PropTypes from "prop-types";
import { BsInfoCircle } from "react-icons/bs";

export default function SuccessulAlert({
  successMessage = "",
  description = "",
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 rounded-lg border border-borderColor bg-backgroundSecondary p-6 text-center shadow-custom-light2">
      <BsInfoCircle className="text-lg text-textPrimary" />
      <div className="font-semibold text-textPrimary">{successMessage}</div>
      <div className="font-normal text-textSecondary">{description}</div>
    </div>
  );
}

SuccessulAlert.propTypes = {
  successMessage: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
