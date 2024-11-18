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

interface CustomInputProps extends InputProps {
  name: string;
  label?: string;
  type?: string;
  icon?: React.ElementType;
  required?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: FC<CustomInputProps> = ({
  name,
  label,
  value,
  onChange,
  type = "text",
  icon: Icon = null,
  required = false,
  placeholder,
  isDisabled,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
          type={type}
          value={value}
          {...(register(name),
          {
            onChange: (e) => {
              if (onChange) {
                onChange(e);
              }
            },
          })}
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

export default CustomInput;
