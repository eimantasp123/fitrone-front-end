import CustomSelect from "@/components/common/CustomSelect";
import CustomTextarea from "@/components/common/CustomTextarea";
import PrimaryButton from "@/components/common/PrimaryButton";
import { showCustomToast } from "@/hooks/showCustomToast";
import useAsync from "@/hooks/useAsync";
import axiosInstance from "@/utils/axiosInterceptors";
import { useSystemProblemSchema } from "@/utils/validationSchema";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MdContactSupport } from "react-icons/md";

interface SystemProblemModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

interface FormDataProps {
  problem?: string;
  message: string;
}
/**
 *  System Problem Modal
 */
const SystemProblemModal: React.FC<SystemProblemModalProps> = ({
  isModalOpen,
  onClose,
}) => {
  const { t } = useTranslation("header");
  const schema = useSystemProblemSchema();
  const [problem, setProblem] = useState<string | null>(null);
  const methods = useForm<FormDataProps>({
    resolver: yupResolver(schema),
  });

  // Process send problem execution
  const { execute: sendProblem, loading } = useAsync(
    async (data: FormDataProps) => {
      const response = await axiosInstance.post(
        "/support/system-problem",
        data,
      );
      if (response) {
        showCustomToast({
          status: "success",
          description: response.data.message,
        });
        //
        methods.reset();
        onClose();
      }
    },
  );

  // Handle Submit proble form
  const handleSubmitForm = (data: FormDataProps) => {
    if (!problem) {
      showCustomToast({
        status: "info",
        description: t("systemProblemModal.validation.problem"),
      });
    }
    sendProblem(data);
  };
  //
  const problems = t("systemProblemModal.problems", {
    returnObjects: true,
  }) as {
    key: string;
    title: string;
  }[];

  // Close modal and reset form fields
  const handleModalClose = () => {
    onClose();
    methods.reset();
    methods.clearErrors();
  };

  return (
    <>
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
              <span className="flex size-7 items-center justify-center rounded-full bg-textPrimary">
                <MdContactSupport className="text-md text-background" />
              </span>

              <h4 className="text-lg font-semibold">
                {t("systemProblemModal.headerTitle")}
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
                <p className="mb-4 text-center text-sm leading-tight text-textSecondary">
                  {t("systemProblemModal.description")}
                </p>

                <div className="flex w-full flex-col gap-2">
                  <h4 className="text-sm">{t("systemProblemModal.problem")}</h4>
                  <CustomSelect
                    options={problems}
                    maxH="max-h-[150px]"
                    defaultOption={t("systemProblemModal.selectProblem")}
                    background="border border-borderDark dark:border-borderPrimary"
                    selectedOption={
                      Object.values(problems).find(
                        (item) => item.key === problem,
                      )?.title
                    }
                    onChange={(option) => {
                      methods.setValue("problem", option.key, {
                        shouldValidate: true,
                      });
                      setProblem(option.key);
                    }}
                  />
                </div>

                <CustomTextarea
                  name="message"
                  label={t("systemProblemModal.message")}
                  size="lg"
                />
                <PrimaryButton
                  disabled={loading}
                  className="py-3"
                  type="submit"
                >
                  {loading ? (
                    <Spinner size="sm" />
                  ) : (
                    `${t("systemProblemModal.send")}`
                  )}
                </PrimaryButton>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SystemProblemModal;
