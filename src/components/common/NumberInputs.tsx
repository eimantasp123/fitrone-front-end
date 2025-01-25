import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputProps,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { Controller, FieldError, useFormContext } from "react-hook-form";

interface NumberInputsProps extends InputProps {
  name: string;
  label?: string;
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
  icon: Icon = null,
  required = false,
  placeholder,
  isDisabled = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // Parse function to sanitize input and trim trailing zeros
  const parse = (value: string) => {
    if (!value) return "";
    const sanitizedValue = value.replace(",", ".").replace(/[^0-9.]/g, "");

    // Prevent multiple decimal points
    const [integer, decimal] = sanitizedValue.split(".");
    if (decimal?.length > 2) {
      return `${integer}.${decimal.slice(0, 2)}`;
    }
    return sanitizedValue;
  };

  return (
    <FormControl isInvalid={!!errors[name]} isRequired={required}>
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
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <NumberInput
              sx={{ width: "100%" }}
              value={
                field.value !== undefined && field.value !== null
                  ? field.value
                  : ""
              }
              onChange={(valueString) => field.onChange(parse(valueString))}
              isDisabled={isDisabled}
              min={0}
            >
              <NumberInputField id={name} placeholder={placeholder} />
            </NumberInput>
          )}
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
