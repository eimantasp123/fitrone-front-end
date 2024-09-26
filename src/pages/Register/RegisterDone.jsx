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
import { Helmet } from "react-helmet";

export default function RegisterDone() {
  const [passwordVisibleFirst, setPasswordVisibleFirst] = useState(false);
  const [passwordVisibleSecond, setPasswordVisibleSecond] = useState(false);
  const { userEmail, completeRegistration } = useContext(AuthContext);

  const {
    execute: registerUser,
    loading,
    error,
    clearError,
  } = completeRegistration;

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
    <>
      <Helmet>
        <title>Complete Registration</title>
      </Helmet>
      <div className="flex w-full max-w-md flex-col justify-center px-6 text-textPrimary">
        <div className="text-center">
          <h2 className="mb-6 text-2xl font-semibold lg:text-3xl">
            Complete registration
          </h2>
          <div className="flex items-center justify-center">
            <div className="mb-8 rounded-full border border-borderColor px-6 py-2 shadow-custom-light3">
              {userEmail}
            </div>
          </div>
        </div>

        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-3"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <InputField
              name="firstName"
              type="text"
              placeholder="First name"
              icon={FaUser}
            />
            <InputField
              name="lastName"
              type="text"
              placeholder="Last name"
              icon={FaUser}
            />
            <InputField
              name="password"
              type={passwordVisibleFirst ? "text" : "password"}
              placeholder="Password"
              showPasswordToggle={true}
              togglePasswordVisibility={() =>
                setPasswordVisibleFirst(!passwordVisibleFirst)
              }
            />
            <PasswordStrengthIndicator password={password} />
            <InputField
              name="passwordConfirm"
              type={passwordVisibleSecond ? "text" : "password"}
              placeholder="Confirm Password"
              showPasswordToggle={true}
              togglePasswordVisibility={() =>
                setPasswordVisibleSecond(!passwordVisibleSecond)
              }
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
    </>
  );
}
