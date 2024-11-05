import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  useColorMode,
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
}

const CustomInput: FC<CustomInputProps> = ({
  name,
  label,
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
  const { colorMode } = useColorMode();

  const inputStyles = {
    bg: colorMode === "dark" ? "dark.backgroundSecondary" : "light.background",
    borderColor: colorMode === "dark" ? "dark.borderLight" : "light.border",
    _focus: {
      borderColor:
        colorMode === "dark" ? "dark.primaryDark" : "light.placeHolder",
      boxShadow: `0 0 0 0.8px ${colorMode === "dark" ? "var(--chakra-colors-dark-primaryDark)" : "var(--chakra-colors-light-placeHolder)"}`,
    },
    _placeholder: {
      color: colorMode === "dark" ? "dark.placeHolder" : "light.placeHolder",
    },
    padding: "21px 16px",
  };

  return (
    <FormControl
      isInvalid={!!errors[name as keyof typeof errors]}
      isRequired={required}
    >
      {label && (
        <FormLabel
          htmlFor={name}
          marginBottom={0}
          fontSize="13px"
          fontWeight="normal"
        >
          {label}
        </FormLabel>
      )}
      <InputGroup>
        <Input
          sx={inputStyles}
          id={name}
          type={type}
          {...register(name)}
          fontSize={15}
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
