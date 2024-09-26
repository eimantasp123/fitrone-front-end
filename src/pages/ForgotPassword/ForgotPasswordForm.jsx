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
import { Helmet } from "react-helmet";

export default function ForgotPasswordForm() {
  const {
    forgotPassword,
    handleSignIn,
    successMessage,
    userEmail,
    clearMessages,
  } = useContext(AuthContext);
  const methods = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const email = methods.watch("email");

  const {
    execute: forgotPasswordSubmit,
    loading,
    error,
    clearError,
  } = forgotPassword;

  const onSubmit = async (data) => {
    await forgotPasswordSubmit(data.email);
  };

  useEffect(() => {
    clearError();
    return () => clearError();
  }, [clearError]);

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <div className="flex w-full max-w-md flex-col justify-center px-6 text-textPrimary">
        <div className="mb-10 text-center">
          {/* <img src="/logo-dark.png" alt="Logo" className="w-[130px] h-auto mx-auto mb-10 flex items-center justify-center" /> */}
          <h2 className="text-2xl font-bold lg:text-3xl">Forgot Password</h2>
          <p className="mt-2">Enter your details to proceed further</p>
        </div>
        {successMessage ? (
          <>
            <SuccessulAlert
              successMessage={successMessage}
              description={
                <>
                  An email is on the way to <strong>{userEmail}</strong> with
                  instructions for resetting your password.
                </>
              }
            />
            <div className="mt-10 text-center">
              <span
                onClick={clearMessages}
                className="cursor-pointer text-textPrimary"
              >
                Did not receive an email after 2 min?{" "}
                <span className="font-semibold transition-colors duration-200 ease-in-out hover:text-textSecondary">
                  Resend
                </span>
              </span>
            </div>
          </>
        ) : (
          <FormProvider {...methods}>
            <form
              className="flex flex-col gap-3"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <InputField
                name="email"
                label="Email"
                placeholder="email@gmail.com"
                type="email"
                icon={MdEmail}
              />
              <div className="pt-3">
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
            <div className="mt-10 text-center">
              <span
                onClick={handleSignIn}
                className="cursor-pointer font-semibold text-textPrimary"
              >
                Back to Login
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
