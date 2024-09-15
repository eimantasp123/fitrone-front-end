import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import ErrorAlert from "../../components/common/ErrorAlert";
import { HStack, PinInput, PinInputField, Spinner } from "@chakra-ui/react";
import useCustomToast from "../../hooks/useCustomToast";
import { useColorMode } from "@chakra-ui/react";

export default function ResetPasswordForm() {
  const { verifyEmail, userEmail, successMessage, resendEmailVerifyCode } = useContext(AuthContext);
  const [code, setCode] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const customToast = useCustomToast();
  const { colorMode } = useColorMode();

  const { execute: verifyEmailHandler, loading, error: verifyEmailError, clearError: clearVerifyError } = verifyEmail;
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
    <div className="w-full h-full  text-textPrimary max-w-md flex flex-col justify-center items-center px-2 md:px-6 lg:p-6">
      <div className="text-center">
        {/* <img src="/logo-dark.png" alt="Logo" className="w-[130px] h-auto mx-auto mb-10 flex items-center justify-center" /> */}
        <h2 className="text-2xl lg:text-3xl font-semibold mb-2">Verify your email</h2>
        <p className=" mt-2">{successMessage}</p>
        <div className="flex justify-center items-center">
          <div className="border border-borderColor shadow-custom-light3 mt-4 mb-8 py-2 px-6 rounded-full">{userEmail}</div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <HStack>
          <PinInput
            onChange={(value) => setCode(value)}
            placeholder="•"
            focusBorderColor={colorMode === "light" ? "light.primaryDark" : "dark.borderPrimary"}
          >
            {/* <PinInputField /> */}
            {Array.from({ length: numberOfFields }).map((_, index) => (
              <PinInputField
                key={index}
                sx={{
                  borderColor: colorMode === "light" ? "gray.400" : "dark.borderLight",
                  _hover: {
                    borderColor: colorMode === "light" ? "gray.600" : "dark.borderPrimary",
                  },
                }}
              />
            ))}
          </PinInput>
        </HStack>
      </div>

      <p className="text-center text-textSecondary text-sm mt-4">Enter the 6-digit code sent to your email</p>

      <button
        className={`bg-primary text-stone-800 text-sm mt-10 text-secondary shadow transition-all hover:shadow-custom-light hover:bg-accent1Dark duration-300 ease-in-out font-semibold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline w-full ${
          !isFormValid || loading ? "opacity-50 cursor-not-allowed" : ""
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

      <div className="flex text-textSecondary items-center text-sm justify-center mt-4 gap-2">
        <p>Didn&apos;t receive the code in 1 minute?</p>
        <p className="cursor-pointer text-textPrimary font-semibold" onClick={resendVerifyCode}>
          {resendCodeLoading ? "Sending..." : "Resend code"}
        </p>
      </div>
    </div>
  );
}
