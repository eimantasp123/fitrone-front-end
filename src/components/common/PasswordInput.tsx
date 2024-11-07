import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
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
            size="sm"
            sx={{
              top: "50%",
              transform: "translateY(-50%)",
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
