import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useError from "../context/useError";

const useFormHandler = (schema, onSubmit) => {
  const { clearError } = useError();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    clearError();
  }, [clearError]);

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};

export default useFormHandler;
