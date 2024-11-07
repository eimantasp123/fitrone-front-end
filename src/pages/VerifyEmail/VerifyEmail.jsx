import {
  HStack,
  PinInput,
  PinInputField,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AuthContext from "../../context/AuthContext";
import { showCustomToast } from "../../hooks/showCustomToast";
import { useTranslation } from "react-i18next";

export default function ResetPasswordForm() {
  const { t } = useTranslation("auth");
  const { verifyEmail, userEmail, successMessage, resendEmailVerifyCode } =
    useContext(AuthContext);
  const [code, setCode] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const { colorMode } = useColorMode();

  const { execute: verifyEmailHandler, loading } = verifyEmail;
  const { execute: resendEmailVerifyCodeHandler, loading: resendCodeLoading } =
    resendEmailVerifyCode;
  const onSubmit = async () => {
    const details = {
      email: userEmail,
      code,
    };
    await verifyEmailHandler(details);
  };

  useEffect(() => {
    setIsFormValid(code.length === 6);
  }, [code]);

  const resendVerifyCode = async () => {
    const response = await resendEmailVerifyCodeHandler();
    console.log(response);
    if (response) {
      showCustomToast({
        title: `Verification email code resend successfully to ${response.email}`,
        status: "success",
      });
    }
  };

  const numberOfFields = 6;

  return (
    <>
      <Helmet>
        <title>{t("verifyEmail.title")}</title>
      </Helmet>
      <div className="flex h-full w-full max-w-md flex-col items-center justify-center px-6 text-textPrimary">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-semibold lg:text-3xl">
            {t("verifyEmail.title")}
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
            <PinInput onChange={(value) => setCode(value)} placeholder="•">
              {Array.from({ length: numberOfFields }).map((_, index) => (
                <PinInputField
                  sx={{
                    borderColor:
                      colorMode === "light"
                        ? "light.borderPrimary"
                        : "dark.borderLight", // Apply border color based on color mode
                    _hover: {
                      borderColor:
                        colorMode === "light"
                          ? "light.textPrimary"
                          : "dark.primaryLight", // Apply border color with primary color
                    },
                    _focus: {
                      borderColor:
                        colorMode === "light"
                          ? "light.textPrimary"
                          : "dark.primary", // Apply border color with focus color
                      boxShadow: `0 0 0 0.8px ${colorMode === "light" ? "var(--chakra-colors-light-textPrimary)" : "var(--chakra-colors-dark-primaryLight)"}`, // Apply box shadow with focus color
                    },
                  }}
                  key={index}
                />
              ))}
            </PinInput>
          </HStack>
        </div>

        <p className="mt-4 text-center text-sm text-textSecondary">
          {t("verifyEmail.description")}
        </p>

        <button
          className={`text-secondary hover:bg-accent1Dark focus:shadow-outline mt-10 w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-stone-800 shadow transition-all duration-300 ease-in-out hover:shadow-custom-light focus:outline-none ${
            !isFormValid || loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          type="submit"
          onClick={onSubmit}
          disabled={!isFormValid || loading}
        >
          {loading ? <Spinner size="sm" /> : `${t("login.verify")}`}
        </button>

        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-textSecondary">
          <p>{t("login.didNotReceive")}</p>
          <p
            className="cursor-pointer font-semibold text-textPrimary"
            onClick={resendVerifyCode}
          >
            {resendCodeLoading
              ? `${t("login.sending")}`
              : `${t("login.resend")}`}
          </p>
        </div>
      </div>
    </>
  );
}
