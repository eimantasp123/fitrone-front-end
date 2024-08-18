import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, Switch } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import CustomPhoneInput from "../common/CustomPhoneInput";
import { FaPhone } from "react-icons/fa";
import useCustomToast from "../../hooks/useCustomToast";
import { useDispatch } from "react-redux";
import { updatePersonalDetails, request2FA, verify2FA } from "../../services/reduxSlices/Profile/personalDetailsSlice";
import { editPhoneNumberSchema } from "../../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const TwoFactorAuth = () => {
  const { details: user, updateDetailsLoading, verify2FALoading } = useSelector((state) => state.personalDetails);
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

  useEffect(() => {
    if (user) {
      methods.reset({
        phone: user.phone,
      });
    }
  }, [user, methods]);

  const handleToggle = async () => {
    if (!enabled) {
      if (!methods.watch("phone")) {
        customToast({
          title: "Error",
          description: "Please provide a phone number before enabling Two-Factor Authentication.",
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

  const handleVerificationSubmit = async () => {
    try {
      await dispatch(verify2FA({ code: verificationCode, enable: !enabled })).unwrap();
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

  const handelDisabledEditMode = () => {
    setEditMode(false);
    methods.reset({ phone: user.phone || "" });
    methods.clearErrors();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVerificationCode("");
  };

  return (
    <div className="flex bg-backgroundLight rounded-lg shadow-custom-dark2 flex-col p-8 xl:flex-col  w-full">
      {/* <h2 className="text-lg font-semibold ">Two Factor Autentication</h2> */}
      <div className="px-5 flex flex-col gap-5">
        <FormProvider {...methods}>
          <div className="space-y-2 w-full ">
            <div className="flex justify-end mb-[-10px] items-center">
              <Switch isChecked={enabled} onChange={handleToggle} colorScheme="customAccent" />
            </div>
            <div>
              {enabled ? (
                <p className="text-gray-600">
                  Two-Factor Authentication is <span className="font-semibold">enabled</span>. You will be asked for a
                  verification code when you sign in.
                </p>
              ) : (
                <p className="text-gray-600">
                  Two-Factor Authentication is <span className="font-semibold">disabled</span>. Enable it to add an extra layer of
                  security to your account.
                </p>
              )}
            </div>
            <div className="">
              <div className="flex flex-col md:flex-row w-full md:justify-between items-start md:items-center">
                {!editMode ? (
                  <p className="text-gray-600">
                    {methods.watch("phone") ? `Current Phone Number: ${methods.watch("phone")}` : "No phone number provided."}
                  </p>
                ) : (
                  <form onSubmit={methods.handleSubmit(onSubmit)} className=" flex w-full ">
                    <div className="w-2/3 flex-1 ">
                      <CustomPhoneInput
                        value={methods.watch("phone")}
                        onChange={(value) => methods.setValue("phone", value)}
                        placeholder="(123) 456-7890"
                        disabled={!editMode}
                        Icon={FaPhone}
                        error={methods.formState.errors.phone?.message}
                      />
                    </div>
                    <div className="flex gap-4 mt-[13px] w-1/3 items-start justify-end">
                      <button
                        className="cursor-pointer text-sm bg-accent1 text-secondary py-2 px-6 rounded-full"
                        type="submit"
                        style={{ width: "180px" }}
                        disabled={!methods.watch("phone") || methods.formState.isSubmitting}
                      >
                        {updateDetailsLoading ? <Spinner size="sm" /> : "Save Phone Number"}
                      </button>
                      <button
                        className="cursor-pointer text-sm bg-secondary text-text1 py-2 px-6 rounded-full"
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
                    className="mt-2 cursor-pointer bg-accent1 text-sm  text-secondary py-2 px-6 rounded-full"
                    type="button"
                  >
                    {!editMode ? `${methods.watch("phone") ? "Edit Phone Number" : "Add Number"}` : "Save Phone Number"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </FormProvider>
      </div>
      <Modal isOpen={showModal} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent sx={{ padding: "1.5rem", borderRadius: "0.5rem" }}>
          <ModalHeader>Enter Verification Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p className="text-gray-600 mb-4">
              A verification code has been sent to <strong>{methods.watch("phone")}.</strong> Please enter the code below to{" "}
              {enabled ? "disable" : "enable"} Two-Factor Authentication.
            </p>
            <div className="flex w-full gap-5  items-center">
              <input
                className="`w-1/2 w-full  text-gray-700  placeholder-gray-400 transition-all duration-300 ease-in-out border px-3 py-[9px] rounded-lg  leading-tight outline-none 
                bg-backgroundLight focus-within:border-[#000] border-[#8f8f8f80] border-gray-300 bg-transparent
                "
                id="verificationCode"
                type="text"
                placeholder="Enter 2FA code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <div className="flex gap-3 items-center justify-end w-1/2">
                <button
                  className="cursor-pointer text-sm bg-accent1 text-secondary py-2 px-6 rounded-full"
                  style={{ width: "90px" }}
                  onClick={handleVerificationSubmit}
                  disabled={verify2FALoading}
                >
                  {verify2FALoading ? <Spinner size="sm" /> : "Verify"}
                </button>
                <button
                  className="cursor-pointer text-sm bg-secondary text-text1 py-2 px-6 rounded-full"
                  onClick={handleCloseModal}
                  style={{ width: "90px" }}
                >
                  Cancel
                </button>
              </div>
            </div>
            <button
              className="cursor-pointer pl-2 mt-3 text-sm font-medium text-secondary"
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
