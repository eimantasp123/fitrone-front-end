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
  const { forgotPassword, handleSignIn, successMessage, userEmail } = useContext(AuthContext);
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
    <div className="w-full max-w-md text-textPrimary flex flex-col justify-center px-2 md:px-6 lg:p-6">
      <div className="text-center mb-10">
        {/* <img src="/logo-dark.png" alt="Logo" className="w-[130px] h-auto mx-auto mb-10 flex items-center justify-center" /> */}
        <h2 className="text-2xl lg:text-3xl  font-bold">Forgot Password</h2>
        <p className=" mt-2">Enter your details to proceed further</p>
      </div>
      {successMessage ? (
        <>
          <SuccessulAlert
            successMessage={successMessage}
            description={
              <>
                An email is on the way to <strong>{userEmail}</strong> with instructions for resetting your password.
              </>
            }
          />
          <div className="text-center mt-10">
            <span onClick={handleSignIn} className="text-textPrimary cursor-pointer ">
              Did not receive an email after 2 min?{" "}
              <span className="font-semibold hover:text-textSecondary transition-colors duration-200 ease-in-out">Resend</span>
            </span>
          </div>
        </>
      ) : (
        <FormProvider {...methods}>
          <form className="gap-3 flex flex-col" onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField name="email" label="Email" placeholder="email@gmail.com" type="email" icon={MdEmail} />
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
          <div className="text-center mt-10">
            <span onClick={handleSignIn} className="text-textPrimary cursor-pointer font-semibold">
              Back to Login
            </span>
          </div>
        </>
      )}
    </div>
  );
}
