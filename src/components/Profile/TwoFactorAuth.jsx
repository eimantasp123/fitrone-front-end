import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Switch,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaPhone } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useCustomToast from "../../hooks/useCustomToast";
import {
  request2FA,
  updatePersonalDetails,
  verify2FA,
} from "../../services/reduxSlices/Profile/personalDetailsSlice";
import { editPhoneNumberSchema } from "../../utils/validationSchema";
import InputField from "../common/InputField";

// TwoFactorAuth component
const TwoFactorAuth = () => {
  const {
    details: user,
    updateDetailsLoading,
    verify2FALoading,
  } = useSelector((state) => state.personalDetails);
  const [enabled, setEnabled] = useState(() => user?.is2FAEnabled ?? false);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const dispatch = useDispatch();
  const customToast = useCustomToast();
  const methods = useForm({
    resolver: yupResolver(editPhoneNumberSchema),
  });

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
    if (!enabled) {
      // Check if phone number is provided before enabling 2FA
      if (!methods.watch("phone")) {
        customToast({
          title: "Error",
          description:
            "Please provide a phone number before enabling Two-Factor Authentication.",
          status: "error",
        });
        return;
      }
      setShowModal(true);

      try {
        await dispatch(request2FA()).unwrap();
      } catch (error) {
        customToast({
          title: "Error",
          description: error.message,
          status: "error",
        });
      }
    } else {
      setShowModal(true);
      try {
        await dispatch(request2FA()).unwrap();
      } catch (error) {
        customToast({
          title: "Error",
          description: error.message,
          status: "error",
        });
      }
    }
  };

  // Verify 2FA code and enable/disable 2FA
  const handleVerificationSubmit = async () => {
    try {
      await dispatch(
        verify2FA({ code: verificationCode, enable: !enabled }),
      ).unwrap();
      setEnabled(!enabled);
      customToast({
        title: "Success",
        description: `Two-Factor Authentication ${!enabled ? "enabled" : "disabled"} successfully.`,
        status: "success",
      });
      setShowModal(false);
      setVerificationCode("");
    } catch (error) {
      customToast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    }
  };

  // Update phone number
  const onSubmit = async (data) => {
    try {
      await dispatch(updatePersonalDetails({ phone: data.phone })).unwrap();
      customToast({
        title: "Phone number updated successfully.",
        status: "success",
      });
      setEditMode(false);
      console.log("Phone number updated successfully.");
      console.log(user);
    } catch (error) {
      customToast({
        title: "Error updating phone number",
        description: error.message,
        status: "error",
      });
    }
  };

  // Resend verification code
  const handleResendCode = async () => {
    setResendLoading(true);
    try {
      await dispatch(request2FA()).unwrap();
      customToast({
        title: "Success",
        description: "Verification code sent to your phone.",
        status: "success",
      });
    } catch (error) {
      customToast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    }
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
    <div className="border-border flex w-full flex-col rounded-2xl border bg-background p-6 shadow-custom-dark2 sm:p-8 xl:flex-col">
      <div className="flex flex-col gap-5">
        <FormProvider {...methods}>
          <div className="w-full">
            <div className="mb-5 flex items-center justify-between gap-10 text-textPrimary">
              {enabled ? (
                <p>
                  Two-Factor Authentication is{" "}
                  <span className="font-semibold">enabled</span>. You will be
                  asked for a verification code when you sign in.
                </p>
              ) : (
                <p>
                  Two-Factor Authentication is{" "}
                  <span className="font-semibold">disabled</span>. Enable it to
                  add an extra layer of security to your account.
                </p>
              )}
              <Switch isChecked={enabled} onChange={handleToggle} />
            </div>
            <div className="">
              <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
                {!editMode ? (
                  <p className="text-textSecondary">
                    {methods.watch("phone")
                      ? `Current Phone Number: ${methods.watch("phone")}`
                      : "No phone number provided."}
                  </p>
                ) : (
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="flex w-full flex-col gap-3"
                  >
                    <div className="lg:w-[80%]">
                      <InputField
                        name="phone"
                        label="Phone Number"
                        type="phone"
                        placeholder="+000"
                        disabled={!editMode}
                        Icon={FaPhone}
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        className="mt-2 w-[180px] cursor-pointer rounded-full border border-borderColor bg-buttonPrimaryDark px-6 py-2 text-sm text-white transition-colors duration-300 ease-in-out hover:bg-buttonPrimaryDarkHover"
                        type="submit"
                        disabled={
                          !methods.watch("phone") ||
                          methods.formState.isSubmitting
                        }
                      >
                        {updateDetailsLoading ? (
                          <Spinner size="sm" />
                        ) : (
                          "Save Phone Number"
                        )}
                      </button>
                      <button
                        className="bg-secondary text-text1 mt-2 cursor-pointer rounded-full py-2 pl-3 text-sm lg:px-6"
                        type="button"
                        onClick={handelDisabledEditMode}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-secondary mt-2 cursor-pointer rounded-full border border-borderColor bg-buttonPrimaryDark px-6 py-2 text-sm text-white transition-colors duration-300 ease-in-out hover:bg-buttonPrimaryDarkHover"
                    type="button"
                  >
                    {!editMode
                      ? `${methods.watch("phone") ? "Edit Phone Number" : "Add Number"}`
                      : "Save Phone Number"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </FormProvider>
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent sx={{ padding: "1.5rem", borderRadius: "0.5rem" }}>
          <ModalHeader>Enter Verification Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p className="mb-4 text-gray-600">
              A verification code has been sent to{" "}
              <strong>{methods.watch("phone")}.</strong> Please enter the code
              below to {enabled ? "disable" : "enable"} Two-Factor
              Authentication.
            </p>
            <div className="flex w-full items-center gap-5">
              <input
                className="`w-1/2 bg-backgroundLight w-full rounded-lg border border-[#8f8f8f80] border-gray-300 bg-transparent px-3 py-[9px] leading-tight text-gray-700 placeholder-gray-400 outline-none transition-all duration-300 ease-in-out focus-within:border-[#000]"
                id="verificationCode"
                type="text"
                placeholder="Enter 2FA code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <div className="flex w-1/2 items-center justify-end gap-3">
                <button
                  className="bg-accent1 text-secondary cursor-pointer rounded-full px-6 py-2 text-sm"
                  style={{ width: "90px" }}
                  onClick={handleVerificationSubmit}
                  disabled={verify2FALoading}
                >
                  {verify2FALoading ? <Spinner size="sm" /> : "Verify"}
                </button>
                <button
                  className="bg-secondary text-text1 cursor-pointer rounded-full px-6 py-2 text-sm"
                  onClick={handleCloseModal}
                  style={{ width: "90px" }}
                >
                  Cancel
                </button>
              </div>
            </div>
            <button
              className="text-secondary mt-3 cursor-pointer pl-2 text-sm font-medium"
              onClick={handleResendCode}
              disabled={resendLoading}
            >
              {resendLoading ? <Spinner size="sm" /> : "Resend Code"}
            </button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TwoFactorAuth;
