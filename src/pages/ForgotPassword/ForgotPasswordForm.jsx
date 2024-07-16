import { useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { forgotPasswordSchema } from "../../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../components/common/InputField";
import AuthContext from "../../context/AuthContext";
import ErrorAlert from "../../components/common/ErrorAlert";
import SuccessulAlert from "../../components/common/SuccessulAlert";
import FormButton from "../../components/common/FormButton";

export default function ForgotPasswordForm() {
  const { forgotPassword, handleSignUp, handleSignIn, successMessage, resetUserEmail } = useContext(AuthContext);
  const methods = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const email = methods.watch("email");

  const { execute: forgotPasswordSubmit, loading, error, clearError } = forgotPassword;

  const onSubmit = async (data) => {
    await forgotPasswordSubmit(data.email);
  };

  useEffect(() => {
    clearError();
    return () => clearError();
  }, [clearError]);

  return (
    <div className="w-full max-w-md h-screen flex flex-col justify-center px-6 lg:p-6">
      <div className="text-center mb-10">
        <img src="/logoIcon.png" alt="Logo" className="w-24 h-24 mx-auto flex items-center justify-center" />
        <h2 className="text-4xl font-bold">Forgot Password</h2>
        <p className="text-gray-500 mt-2">Enter your details to proceed further</p>
      </div>
      {successMessage ? (
        <SuccessulAlert
          successMessage={successMessage}
          description={
            <>
              An email is on the way to <strong>{resetUserEmail}</strong> with instructions for resetting your password.
            </>
          }
        />
      ) : (
        <FormProvider {...methods}>
          <form className="gap-3 flex flex-col" onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField name="email" label="Email" placeholder="email@gmail.com" type="email" icon={MdEmail} />
            <div className="pt-2">
              <FormButton isFormValid={email} loading={loading}>
                Send Reset Link
              </FormButton>
              <ErrorAlert error={error} clearError={clearError} />
            </div>
          </form>
        </FormProvider>
      )}

      {!successMessage && (
        <>
          <div className="text-center mt-10">
            <span onClick={handleSignIn} className="text-secondary cursor-pointer font-semibold">
              Back to Login
            </span>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-500">
              Don&apos;t have an account yet?{" "}
              <span onClick={handleSignUp} className="text-secondary cursor-pointer font-medium">
                Sign Up
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
