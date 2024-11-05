// PasswordInput.tsx
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  useColorMode,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface PasswordInputProps {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
}

const PasswordInput: FC<PasswordInputProps> = ({
  name,
  label,
  required = false,
  placeholder,
  isDisabled,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
          fontSize="13px"
          marginBottom={0}
          fontWeight="normal"
        >
          {label}
        </FormLabel>
      )}
      <InputGroup>
        <Input
          id={name}
          placeholder={placeholder}
          sx={inputStyles}
          fontSize={15}
          isDisabled={isDisabled}
          type={showPassword ? "text" : "password"}
          {...register(name)}
          {...rest}
        />
        <div className="absolute right-1 top-1/2 z-20">
          <IconButton
            isDisabled={isDisabled}
            aria-label="Toggle Password Visibility"
            icon={
              showPassword ? (
                <IoEyeOff className={`text-[15px]`} />
              ) : (
                <IoEye className={`text-[15px]`} />
              )
            }
            onClick={togglePasswordVisibility}
            variant="ghost"
            size="sm"
            sx={{
              top: "50%",
              transform: "translateY(-50%)",
              _hover: {
                bg: colorMode === "dark" ? "dark.hover" : "light.hover",
              },
            }}
          />
        </div>
      </InputGroup>
      <FormErrorMessage fontSize={13} marginTop={1}>
        {(errors[name as keyof typeof errors] as FieldError)?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default PasswordInput;
