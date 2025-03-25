import CustomButton from "@/components/common/CustomButton";
import LinkButton from "@/components/common/LinkButton";
import CustomInput from "@/components/common/NewCharkaInput";
import { useCustomerSendMailAction } from "@/hooks/Customers/useSendFormToCustomer";
import { useCustomerSendForm } from "@/utils/validationSchema";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { TFunction } from "i18next";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

interface SendFormToCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TFunction;
}

export interface SendFormToCustomerForm {
  firstName: string;
  email: string;
}

/**
 * Send form to customer modal component
 */
const SendFormToCustomerModal: React.FC<SendFormToCustomerModalProps> = ({
  isOpen,
  onClose,
  t,
}) => {
  const schema = useCustomerSendForm();
  const methods = useForm<SendFormToCustomerForm>({
    resolver: yupResolver(schema),
  });

  // Send form to customer
  const { mutate: sendForm, isPending } = useCustomerSendMailAction(onClose);

  // Handle form submission
  const handleSubmitForm = (data: SendFormToCustomerForm) => {
    sendForm(data);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        isCentered
        onClose={onClose}
        size={{ base: "sm", md: "2xl" }}
      >
        <ModalOverlay />
        <ModalContent
          p={6}
          sx={{
            borderRadius: "0.75rem",
          }}
        >
          <div className="flex items-center gap-3 border-b-[1px] border-borderPrimary pb-5">
            <h4 className="text-xl font-semibold md:text-xl">
              {t("addCustomer")}
            </h4>
          </div>
          <ModalCloseButton marginTop="3" />
          <ModalBody style={{ padding: "0px 0px" }}>
            <div className="text-center">
              <p className="my-4 text-center text-sm">
                {t("sendFormToCustomerDescription")}
              </p>

              <LinkButton
                textSize="text-sm"
                className="mx-auto w-fit"
                text={t("previewForm")}
                onClick={() => window.open("/customer-form/sample")}
              />

              <p className="my-4 text-center text-sm">
                {t("sendFormWillBeValidFor")}
              </p>
            </div>
            <FormProvider {...methods}>
              <form
                className="mt-6 flex select-none flex-col gap-3"
                onSubmit={methods.handleSubmit(handleSubmitForm)}
              >
                {/* Description text */}

                {/* Name */}
                <CustomInput
                  name="firstName"
                  label={t("auth:registerDone.firstName")}
                />

                {/* Email*/}
                <CustomInput
                  name="email"
                  type="email"
                  label={t("auth:register.email")}
                />

                <div className="mt-2 flex items-center gap-3">
                  <CustomButton
                    text={t("common:cancel")}
                    onClick={onClose}
                    type="dark"
                    widthFull={true}
                    paddingY="py-3"
                  />
                  <CustomButton
                    text={t("sendForm")}
                    actionType="submit"
                    loading={isPending}
                    loadingSpinner={false}
                    widthFull={true}
                    paddingY="py-3"
                  />
                </div>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SendFormToCustomerModal;
