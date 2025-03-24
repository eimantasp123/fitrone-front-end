import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { FC } from "react";
import { FieldError, useFormContext } from "react-hook-form";

interface CustomTextareaProps extends TextareaProps {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  height?: number;
}

const CustomTextarea: FC<CustomTextareaProps> = ({
  name,
  label,
  required = false,
  height = 70,
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
          marginBottom={0}
          fontSize="13px"
          fontWeight="normal"
          marginBlockEnd={1}
        >
          {label}
        </FormLabel>
      )}
      <Textarea
        id={name}
        height={height}
        rounded={"8px"}
        {...register(name)}
        placeholder={placeholder}
        isDisabled={isDisabled}
        {...rest}
      />
      <FormErrorMessage fontSize={13} marginTop={1}>
        {(errors[name as keyof typeof errors] as FieldError)?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default CustomTextarea;
