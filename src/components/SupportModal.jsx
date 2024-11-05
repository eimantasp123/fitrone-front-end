import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { MdContactSupport } from "react-icons/md";
import { useSelector } from "react-redux";
import useAsync from "../hooks/useAsync";
import { showCustomToast } from "../hooks/showCustomToast";
import axiosInstance from "../utils/axiosInterceptors";
import { supportSchema } from "../utils/validationSchema";
import InputField from "./common/InputField";
import PrimaryButton from "./common/PrimaryButton";

export default function SupportModal({
  setIsTooltipOpen = null,
  isModalOpen,
  onClose,
}) {
  const { details: user } = useSelector((state) => state.personalDetails);
  const methods = useForm({
    resolver: yupResolver(supportSchema),
  });
  const { colorMode } = useColorMode();

  const {
    execute: handleSubmitForm,
    loading,
    error,
    clearError,
  } = useAsync(async (data) => {
    const formData = {
      ...data,
      email: user.email,
      name: user.firstName,
    };
    const response = await axiosInstance.post("/support", formData);
    if (response) {
      showCustomToast({
        status: "success",
        title: "Message sent successfully",
        description: "Our support team will get back to you shortly!",
      });
      //
      methods.reset();
      onClose();
    }
  });

  // Close modal and reset form fields
  const handleModalClose = () => {
    clearError();
    methods.reset();
    onClose();
    setIsTooltipOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleModalClose}
      isCentered
      size={{ base: "sm", md: "xl" }}
    >
      <ModalOverlay />
      <ModalContent p={6} sx={{ borderRadius: "0.75rem" }}>
        <div className="flex items-center gap-3 border-b-[1px] border-borderColor pb-5">
          <div className="flex items-center gap-4">
            <span className="flex size-9 items-center justify-center rounded-full bg-textPrimary">
              <MdContactSupport className="text-lg text-background" />
            </span>

            <h4 className="text-2xl font-semibold">Get in Touch</h4>
          </div>
        </div>
        <ModalCloseButton marginTop="3" />
        <ModalBody style={{ padding: "0px 0px" }}>
          <FormProvider {...methods}>
            {/* Proper usage of handleSubmit */}
            <form
              className="mt-6 flex flex-col gap-1"
              onSubmit={methods.handleSubmit(handleSubmitForm)}
            >
              <h3 className="mb-2 text-center text-2xl font-bold text-textPrimary md:mb-4 md:text-3xl">
                How Can We Help You?
              </h3>
              <p className="mb-4 text-center leading-tight text-textSecondary">
                If you&apos;re encountering any problems or have any inquiries,
                reach out to our support team, and we&apos;ll guide you through
                the solution.
              </p>

              <InputField name="subject" label="Subject" />

              <div className="flex flex-col">
                <textarea
                  type="text"
                  id="message"
                  placeholder="Add a Message..."
                  className={`mt-3 min-h-[150px] ${methods.formState.errors?.message || error ? "bg-border border-red-500 focus:border-red-500" : `${colorMode === "dark" ? "border-[#494949] bg-transparent placeholder-stone-500 focus:border-[#e6e6e6]" : "border-[#b6b6b6] bg-transparent placeholder-stone-500 focus:border-neutral-800"}`} rounded-lg border p-3 text-sm outline-none transition-colors duration-200 ease-out`}
                  {...methods.register("message")}
                />
                {methods.formState.errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {methods.formState.errors["message"]?.message}
                  </p>
                )}
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </div>
              <PrimaryButton
                disabled={loading}
                className="py-3"
                text="Send Message"
                type="submit"
              >
                {loading ? <Spinner size="sm" /> : "Send Message"}
              </PrimaryButton>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

SupportModal.propTypes = {
  setIsTooltipOpen: PropTypes.func,
  isModalOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
