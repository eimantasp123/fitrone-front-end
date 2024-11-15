import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Switch,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { showCustomToast } from "../../hooks/showCustomToast";
import {
  request2FA,
  updatePersonalDetails,
  verify2FA,
} from "../../services/reduxSlices/Profile/personalDetailsSlice";
import { useEditPhoneNumberSchema } from "../../utils/validationSchema";
import CustomInput from "../common/NewCharkaInput";

// TwoFactorAuth component
const TwoFactorAuth = () => {
  const { t } = useTranslation("profileSettings");
  const {
    details: user,
    updateDetailsLoading,
    verify2FALoading,
  } = useSelector((state) => state.personalDetails);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const dispatch = useDispatch();
  const schema = useEditPhoneNumberSchema();
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const action = user.is2FAEnabled
    ? t("2fa.modal.disable")
    : t("2fa.modal.enable");
  const phone = methods.watch("phone");

  // Set form data when user details are fetched from the server
  useEffect(() => {
    if (user) {
      methods.reset({
        phone: user.phone,
      });
    }
  }, [user, methods]);

  // Toggle Two-Factor Authentication
  const handleToggle = async () => {
    if (!user.is2FAEnabled && !methods.watch("phone")) {
      // Check if phone number is provided before enabling 2FA
      showCustomToast({
        status: "error",
        title: t("2fa.error.title"),
        description: t("2fa.error.pleaseProvideNumber"),
      });
      return;
    } else {
      await dispatch(request2FA()).unwrap();
      setShowModal(true);
    }
  };

  // Verify 2FA code and enable/disable 2FA
  const handleVerificationSubmit = async () => {
    await dispatch(verify2FA({ code: verificationCode })).unwrap();
    setShowModal(false);
    setVerificationCode("");
  };

  // Update phone number
  const onSubmit = async (data) => {
    await dispatch(updatePersonalDetails({ phone: data.phone })).unwrap();
    setEditMode(false);
  };

  // Resend verification code
  const handleResendCode = async () => {
    setResendLoading(true);
    await dispatch(request2FA()).unwrap();
    setResendLoading(false);
  };

  // Disable edit mode
  const handelDisabledEditMode = () => {
    setEditMode(false);
    methods.reset({ phone: user.phone || "" });
    methods.clearErrors();
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setVerificationCode("");
  };

  return (
    <div className="flex w-full flex-col rounded-lg border border-borderLight bg-background p-6 shadow-custom-dark2 dark:border-borderDark dark:bg-backgroundSecondary sm:p-8 xl:flex-col">
      <div className="flex flex-col gap-5">
        <FormProvider {...methods}>
          <div className="w-full">
            <div className="mb-5 flex items-center justify-between gap-10 text-sm text-textPrimary">
              {user.is2FAEnabled ? (
                <p>
                  <Trans
                    i18nKey="2fa.enableDescription"
                    ns="profileSettings"
                    components={{ 1: <strong /> }}
                  />
                </p>
              ) : (
                <p>
                  <Trans
                    i18nKey="2fa.disableDescription"
                    ns="profileSettings"
                    components={{ 1: <strong /> }}
                  />
                </p>
              )}
              <Switch isChecked={user.is2FAEnabled} onChange={handleToggle} />
            </div>
            <div className="">
              <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
                {!editMode ? (
                  <p className="text-sm text-textSecondary">
                    {methods.watch("phone")
                      ? `${t("2fa.currentNumber")}: ${methods.watch("phone")}`
                      : `${t("2fa.noPhoneNumber")}`}
                  </p>
                ) : (
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="flex w-full flex-col gap-3"
                  >
                    <div className="lg:w-[80%]">
                      <CustomInput
                        name="phone"
                        type="phone"
                        label={t("2fa.phoneNumber")}
                        placeholder="+000"
                        isDisabled={!editMode}
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        className="mt-2 w-[180px] cursor-pointer rounded-lg border border-borderPrimary bg-primary px-6 py-2 text-sm text-textPrimary transition-colors duration-300 ease-in-out hover:bg-primaryLight dark:text-black dark:hover:bg-primaryDark"
                        type="submit"
                        disabled={
                          !methods.watch("phone") ||
                          methods.formState.isSubmitting
                        }
                      >
                        {updateDetailsLoading ? (
                          <Spinner size="sm" />
                        ) : (
                          `${t("2fa.saveNumber")}`
                        )}
                      </button>
                      <button
                        className="mt-2 cursor-pointer rounded-lg py-2 pl-3 text-sm text-textPrimary lg:px-6"
                        type="button"
                        onClick={handelDisabledEditMode}
                      >
                        {t("2fa.cancel")}
                      </button>
                    </div>
                  </form>
                )}
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-secondary dark:text-blac mt-2 cursor-pointer rounded-lg bg-black/90 px-6 py-2 text-sm text-white transition-colors duration-300 ease-in-out hover:bg-black/75 dark:bg-white dark:text-black dark:hover:bg-white/75"
                    type="button"
                  >
                    {!editMode
                      ? `${methods.watch("phone") ? `${t("2fa.editNumber")}` : `${t("2fa.addNumber")}`}`
                      : `${t("2fa.saveNumber")}`}
                  </button>
                )}
              </div>
            </div>
          </div>
        </FormProvider>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        size={{ base: "xs", md: "lg" }}
      >
        <ModalOverlay />
        <ModalContent sx={{ padding: "1.5rem", borderRadius: "0.5rem" }}>
          <h2 className="p-1 font-medium">{t("2fa.modal.title")}</h2>
          <ModalCloseButton />
          <ModalBody style={{ padding: "5px" }}>
            <p className="mb-4 text-sm text-textSecondary">
              <Trans
                i18nKey="2fa.modal.verificationMessage"
                ns="profileSettings"
                values={{ phone, action }}
                components={{ strong: <strong /> }}
              />
            </p>
            <div className="flex w-full flex-col items-center gap-5 md:flex-row">
              <input
                className="`w-full w-full rounded-lg border border-borderPrimary bg-transparent px-3 py-[9px] leading-tight text-textPrimary placeholder-placeholder outline-none transition-all duration-300 ease-in-out focus-within:border-borderPrimary dark:border-borderLight md:w-[50%]"
                id="verificationCode"
                type="text"
                placeholder={t("2fa.modal.inputPlaceholder")}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <div className="flex w-full items-center gap-3 md:w-[70%] md:justify-end">
                <button
                  className="bg-accent1 w-full cursor-pointer rounded-lg bg-primary px-6 py-2 text-sm text-black transition-colors duration-300 ease-in-out hover:bg-primaryLight dark:hover:bg-primaryDark"
                  onClick={handleVerificationSubmit}
                  disabled={verify2FALoading}
                >
                  {verify2FALoading ? (
                    <Spinner size="sm" />
                  ) : (
                    `${t("2fa.modal.verify")}`
                  )}
                </button>
                <button
                  className="bg-secondary text-text1 w-full cursor-pointer rounded-lg px-6 py-2 text-sm"
                  onClick={handleCloseModal}
                >
                  {t("2fa.modal.cancel")}
                </button>
              </div>
            </div>
            <button
              className="mt-3 cursor-pointer pl-2 text-[13px] font-medium text-textSecondary"
              onClick={handleResendCode}
              disabled={resendLoading}
            >
              {resendLoading ? (
                <Spinner size="sm" />
              ) : (
                `${t("2fa.modal.resend")}`
              )}
            </button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TwoFactorAuth;
