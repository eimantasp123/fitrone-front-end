import { Checkbox } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CustomCheckbox = ({ label, isChecked, onChange, ...props }) => {
  return (
    <Checkbox
      size="md"
      isChecked={isChecked}
      onChange={onChange}
      sx={{
        "& .chakra-checkbox__control[data-checked]": {
          bg: "#1A1A1D",
          borderColor: "#1A1A1D",
          _hover: { bg: "#1A1A1D", borderColor: "#1A1A1D" },
        },
        "& .chakra-checkbox__control": {
          borderColor: "#d1d5db",
          borderStyle: "solid",
          borderWidth: "1px",
        },
      }}
      {...props}
    >
      <span className="text-sm">{label}</span>
    </Checkbox>
  );
};

CustomCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomCheckbox;
