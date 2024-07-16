import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../../utils/validationSchema";
import InputField from "../../components/common/InputField";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import ErrorAlert from "../../components/common/ErrorAlert";
import SuccessulAlert from "../../components/common/SuccessulAlert";
import PasswordStrengthIndicator from "../../components/common/PasswordStrenghtIndicator";
import FormButton from "../../components/common/FormButton";

export default function ResetPasswordForm() {
  const [passwordVisibleFirst, setPasswordVisibleFirst] = useState(false);
  const [passwordVisibleSecond, setPasswordVisibleSecond] = useState(false);
  const { resetPassword, handleSignIn, successMessage } = useContext(AuthContext);
  const methods = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });
  const { token } = useParams();
  const password = methods.watch("password");
  const confirmPassword = methods.watch("confirmPassword");

  const { execute: resetNewPassword, loading, error, clearError } = resetPassword;

  const onSubmit = async (data) => {
    await resetNewPassword(token, data.password);
  };

  useEffect(() => {
    clearError();
    return () => clearError();
  }, [clearError]);

  return (
    <div className="w-full max-w-md h-screen flex flex-col justify-center px-6 lg:p-6">
      <div className="text-center mb-10">
        <img src="/logoIcon.png" alt="Logo" className="w-24 h-24 mx-auto flex items-center justify-center" />
        <h2 className="text-4xl font-bold">Reset Password</h2>
      </div>
      {successMessage ? (
        <>
          <SuccessulAlert
            successMessage={successMessage}
            description="Password reset successfully. You can now log in with your new password."
          />
          <div className="text-center mt-10">
            <span onClick={handleSignIn} className="text-gray-800 cursor-pointer font-semibold">
              Back to Login
            </span>
          </div>
        </>
      ) : (
        <FormProvider {...methods}>
          <form className="gap-3 flex flex-col" onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField
              name="password"
              label="New Password"
              placeholder="••••••••••"
              type={passwordVisibleFirst ? "text" : "password"}
              showPasswordToggle={true}
              togglePasswordVisibility={() => setPasswordVisibleFirst(!passwordVisibleFirst)}
            />
            <PasswordStrengthIndicator password={password} />
            <InputField
              name="confirmPassword"
              label="Confirm New Password"
              placeholder="••••••••••"
              type={passwordVisibleSecond ? "text" : "password"}
              showPasswordToggle={true}
              togglePasswordVisibility={() => setPasswordVisibleSecond(!passwordVisibleSecond)}
            />
            <div className="mt-2">
              <FormButton isFormValid={password && confirmPassword} loading={loading}>
                Reset Password
              </FormButton>
              <ErrorAlert error={error} clearError={clearError} />
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
}
