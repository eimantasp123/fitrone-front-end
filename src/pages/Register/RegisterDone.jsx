import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../components/common/InputField";
import { registerSchema } from "../../utils/validationSchema";
import AuthContext from "../../context/AuthContext";
import ErrorAlert from "../../components/common/ErrorAlert";
import PasswordStrengthIndicator from "../../components/common/PasswordStrenghtIndicator";
import FormButton from "../../components/common/FormButton";

export default function RegisterDone() {
  const [passwordVisibleFirst, setPasswordVisibleFirst] = useState(false);
  const [passwordVisibleSecond, setPasswordVisibleSecond] = useState(false);
  const { userEmail, completeRegistration } = useContext(AuthContext);

  const { execute: registerUser, loading, error, clearError } = completeRegistration;

  const methods = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (details) => {
    const data = {
      ...details,
      email: userEmail,
    };
    await registerUser(data);
  };

  const firstName = methods.watch("firstName");
  const password = methods.watch("password");
  const passwordConfirm = methods.watch("passwordConfirm");

  const isFormValid = userEmail && firstName && password && passwordConfirm;

  useEffect(() => {
    clearError();
    return () => clearError();
  }, [clearError]);

  return (
    <div className="w-full max-w-md flex flex-col justify-center px-2 md:px-6 lg:p-6">
      <div className="text-center">
        <img src="/logoIcon.png" alt="Logo" className="w-24 h-24 mx-auto flex items-center justify-center" />
        <h2 className="text-2xl lg:text-3xl font-semibold mb-6">Complete registration</h2>
        <div className="flex justify-center items-center">
          <div className="border shadow-custom-light3  mb-8 py-2 px-6 rounded-full">{userEmail}</div>
        </div>
      </div>

      <FormProvider {...methods}>
        <form className="flex gap-3 flex-col" onSubmit={methods.handleSubmit(onSubmit)}>
          <InputField name="firstName" type="text" placeholder="First name" icon={FaUser} />

          <InputField name="lastName" type="text" placeholder="Last name" icon={FaUser} />

          <InputField
            name="password"
            type={passwordVisibleFirst ? "text" : "password"}
            placeholder="Password"
            showPasswordToggle={true}
            togglePasswordVisibility={() => setPasswordVisibleFirst(!passwordVisibleFirst)}
          />
          <PasswordStrengthIndicator password={password} />
          <InputField
            name="passwordConfirm"
            type={passwordVisibleSecond ? "text" : "password"}
            placeholder="Confirm Password"
            showPasswordToggle={true}
            togglePasswordVisibility={() => setPasswordVisibleSecond(!passwordVisibleSecond)}
          />

          <div className="mt-3">
            <FormButton isFormValid={isFormValid} loading={loading}>
              Continue
            </FormButton>
          </div>
        </form>
        <ErrorAlert error={error} clearError={clearError} />
      </FormProvider>
    </div>
  );
}
