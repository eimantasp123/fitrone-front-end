import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import ErrorAlert from "../../components/common/ErrorAlert";
import { HStack, PinInput, PinInputField, Spinner } from "@chakra-ui/react";
import useCustomToast from "../../hooks/useCustomToast";
import { useColorMode } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

export default function ResetPasswordForm() {
  const { verifyEmail, userEmail, successMessage, resendEmailVerifyCode } =
    useContext(AuthContext);
  const [code, setCode] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const customToast = useCustomToast();
  const { colorMode } = useColorMode();

  const {
    execute: verifyEmailHandler,
    loading,
    error: verifyEmailError,
    clearError: clearVerifyError,
  } = verifyEmail;
  const {
    execute: resendEmailVerifyCodeHandler,
    loading: resendCodeLoading,
    error: resendCodeError,
    clearError: clearResendError,
  } = resendEmailVerifyCode;
  const errors = verifyEmailError || resendCodeError;
  const onSubmit = async () => {
    const details = {
      email: userEmail,
      code,
    };
    await verifyEmailHandler(details);
  };

  const clearAllErrors = useCallback(() => {
    clearVerifyError();
    clearResendError();
  }, [clearVerifyError, clearResendError]);

  useEffect(() => {
    clearAllErrors();
    return () => clearAllErrors();
  }, [clearAllErrors]);

  useEffect(() => {
    setIsFormValid(code.length === 6);
  }, [code]);

  const resendVerifyCode = async () => {
    const response = await resendEmailVerifyCodeHandler();
    console.log(response);
    if (response) {
      customToast({
        title: `Verification email code resend successfully to ${response.email}`,
        status: "success",
      });
    }
  };

  const numberOfFields = 6;

  return (
    <>
      <Helmet>
        <title>Verify Email</title>
      </Helmet>
      <div className="flex h-full w-full max-w-md flex-col items-center justify-center px-6 text-textPrimary">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-semibold lg:text-3xl">
            Verify your email
          </h2>
          <p className="mt-2">{successMessage}</p>
          <div className="flex items-center justify-center">
            <div className="mb-8 mt-4 rounded-full border border-borderColor px-6 py-2 shadow-custom-light3">
              {userEmail}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <HStack>
            <PinInput
              onChange={(value) => setCode(value)}
              placeholder="•"
              focusBorderColor={
                colorMode === "light"
                  ? "light.primaryDark"
                  : "dark.borderPrimary"
              }
            >
              {/* <PinInputField /> */}
              {Array.from({ length: numberOfFields }).map((_, index) => (
                <PinInputField
                  key={index}
                  sx={{
                    borderColor:
                      colorMode === "light" ? "gray.400" : "dark.borderLight",
                    _hover: {
                      borderColor:
                        colorMode === "light"
                          ? "gray.600"
                          : "dark.borderPrimary",
                    },
                  }}
                />
              ))}
            </PinInput>
          </HStack>
        </div>

        <p className="mt-4 text-center text-sm text-textSecondary">
          Enter the 6-digit code sent to your email
        </p>

        <button
          className={`text-secondary hover:bg-accent1Dark focus:shadow-outline mt-10 w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-stone-800 shadow transition-all duration-300 ease-in-out hover:shadow-custom-light focus:outline-none ${
            !isFormValid || loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          type="submit"
          onClick={onSubmit}
          disabled={!isFormValid || loading}
        >
          {loading ? <Spinner size="sm" /> : "Verify"}
        </button>

        <div className="w-[90%]">
          <ErrorAlert error={errors} clearError={clearAllErrors} />
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-textSecondary">
          <p>Didn&apos;t receive the code in 1 minute?</p>
          <p
            className="cursor-pointer font-semibold text-textPrimary"
            onClick={resendVerifyCode}
          >
            {resendCodeLoading ? "Sending..." : "Resend code"}
          </p>
        </div>
      </div>
    </>
  );
}
