import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { MdContactSupport } from "react-icons/md";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSupportSchema } from "@/utils/validationSchema";
import useAsync from "@/hooks/useAsync";
import axiosInstance from "@/utils/axiosInterceptors";
import { showCustomToast } from "@/hooks/showCustomToast";
import CustomInput from "@/components/common/NewCharkaInput";
import CustomTextarea from "@/components/common/CustomTextarea";
import PrimaryButton from "@/components/common/PrimaryButton";

export default function SupportModal({ isModalOpen, onClose }) {
  const { t } = useTranslation("header");
  const { details: user } = useSelector((state) => state.personalDetails);
  const schema = useSupportSchema();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { execute: handleSubmitForm, loading } = useAsync(async (data) => {
    const formData = {
      ...data,
      email: user.email,
      name: user.firstName,
    };
    const response = await axiosInstance.post("/support", formData);
    if (response) {
      showCustomToast({
        status: "success",
        description: response.data.message,
      });
      //
      methods.reset();
      onClose();
    }
  });

  // Close modal and reset form fields
  const handleModalClose = () => {
    onClose();
    methods.reset();
    methods.clearErrors();
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
        <div className="flex items-center gap-3 border-b-[1px] border-borderPrimary pb-5">
          <div className="flex items-center gap-4">
            <span className="flex size-9 items-center justify-center rounded-full bg-textPrimary">
              <MdContactSupport className="text-lg text-background" />
            </span>

            <h4 className="text-2xl font-semibold">
              {t("supportModal.headerTitle")}
            </h4>
          </div>
        </div>
        <ModalCloseButton marginTop="3" />
        <ModalBody style={{ padding: "0px 0px" }}>
          <FormProvider {...methods}>
            <form
              className="mt-6 flex flex-col gap-3"
              onSubmit={methods.handleSubmit(handleSubmitForm)}
            >
              <h3 className="mb-2 text-center text-2xl font-bold text-textPrimary md:mb-4 md:text-3xl">
                {t("supportModal.title")}
              </h3>
              <p className="mb-4 text-center leading-tight text-textSecondary">
                {t("supportModal.description")}
              </p>

              <CustomInput name="subject" label={t("supportModal.subject")} />
              <CustomTextarea
                name="message"
                label={t("supportModal.message")}
                size="lg"
              />
              <PrimaryButton
                disabled={loading}
                className="py-3"
                text="Send Message"
                type="submit"
              >
                {loading ? <Spinner size="sm" /> : `${t("supportModal.send")}`}
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
