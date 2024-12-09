import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { FieldError, useFormContext } from "react-hook-form";

interface NumberInputsProps extends InputProps {
  name: string;
  label?: string;
  type?: "number";
  icon?: React.ElementType;
  required?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  value?: string | number;
}

const NumberInputs: FC<NumberInputsProps> = ({
  name,
  label,
  value,
  type = "text",
  icon: Icon = null,
  required = false,
  placeholder,
  isDisabled = false,
  ...rest
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  // Handle numeric input sanitization
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Replace commas with dots and allow only numeric characters or a single dot
    inputValue = inputValue.replace(",", ".").replace(/[^0-9.]/g, "");

    // Ensure only one dot is present
    const parts = inputValue.split(".");
    if (parts.length > 2) {
      inputValue = parts[0] + "." + parts.slice(1).join("");
    }

    // Update the value in the form state
    setValue(name, inputValue, { shouldValidate: true });
  };

  return (
    <FormControl
      isInvalid={!!errors[name as keyof typeof errors]}
      isRequired={required}
    >
      {label && (
        <FormLabel
          htmlFor={name}
          marginBottom={1}
          fontSize="13px"
          fontWeight="normal"
        >
          {label}
        </FormLabel>
      )}
      <InputGroup>
        <Input
          id={name}
          type="text"
          defaultValue={value}
          autoFocus={false}
          {...register(name, {
            validate: (val) =>
              !isNaN(parseFloat(val)) || "Please enter a valid number",
          })}
          onChange={handleInputChange}
          placeholder={placeholder}
          isDisabled={isDisabled}
          {...rest}
        />
        {Icon && (
          <div className="absolute right-3 top-1/2 z-20 -translate-y-1/2">
            <Icon
              className={`text-sm ${isDisabled ? "opacity-40" : "opacity-100"}`}
            />
          </div>
        )}
      </InputGroup>
      <FormErrorMessage fontSize={13} marginTop={1}>
        {(errors[name as keyof typeof errors] as FieldError)?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default NumberInputs;
