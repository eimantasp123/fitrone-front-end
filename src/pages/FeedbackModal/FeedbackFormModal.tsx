import CustomTextarea from "@/components/common/CustomTextarea";
import PrimaryButton from "@/components/common/PrimaryButton";
import { showCustomToast } from "@/hooks/showCustomToast";
import useAsync from "@/hooks/useAsync";
import axiosInstance from "@/utils/axiosInterceptors";
import { useFeedbackSchema } from "@/utils/validationSchema";
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
import { RiFeedbackLine } from "react-icons/ri";

interface FeedbackFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  rating: number;
  comment: string;
}

// Feedback form modal component
const FeedbackFormModal: React.FC<FeedbackFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation("common");
  const [rating, setRating] = useState<number | null>(null);
  const schema = useFeedbackSchema();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  // Handle rating selection
  const handleRatingClick = (ratingValue: number) => {
    setRating(ratingValue);
    methods.setValue("rating", ratingValue);
  };

  // Handle form submission
  const { execute: handleSubmitFeedback, loading } = useAsync(
    async (data: FormData) => {
      const response = await axiosInstance.post("/feedback", data);
      if (response) {
        showCustomToast({
          status: "success",
          description: response.data.message,
        });
        // Reset form fields
        onClose();
        setRating(null);
        methods.reset();
      }
    },
  );

  // Close modal and reset form fields
  const handleModalClose = () => {
    onClose();
    methods.reset();
    methods.clearErrors();
    setRating(null);
  };

  return (
    <>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={handleModalClose}
          isCentered
          size={{ base: "sm", md: "xl" }}
        >
          <ModalOverlay />
          <ModalContent p={6} sx={{ borderRadius: "0.75rem" }}>
            <div className="border-borderColor flex items-center gap-3 border-b-[1px] pb-5">
              <span className="flex size-7 items-center justify-center rounded-full bg-textPrimary">
                <RiFeedbackLine className="text-md text-background" />
              </span>
              <h4 className="text-lg font-semibold">
                {t("feedbackModal.title")}
              </h4>
            </div>
            <ModalCloseButton marginTop="3" />
            <ModalBody style={{ padding: "0px" }}>
              <FormProvider {...methods}>
                {/* Proper usage of handleSubmit */}
                <form
                  className="mt-6"
                  onSubmit={methods.handleSubmit(handleSubmitFeedback)}
                >
                  <p className="mb-4 text-center text-sm leading-snug">
                    {t("feedbackModal.description")}
                  </p>

                  {/* Rating selection */}
                  <div className="mb-6 flex justify-center">
                    {["😢", "😟", "😐", "😊", "🤩"].map((emoji, index) => (
                      <button
                        type="button"
                        key={index}
                        className={`mx-1 text-3xl ${rating === index ? "scale-125 transform" : ""}`}
                        onClick={() => handleRatingClick(index)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  {rating !== null && (
                    <div className="mb-4 text-center">
                      <span className="inline-block rounded-full bg-backgroundSecondary px-6 py-2 text-sm text-textPrimary">
                        {
                          [
                            t("feedbackModal.rating.1"),
                            t("feedbackModal.rating.2"),
                            t("feedbackModal.rating.3"),
                            t("feedbackModal.rating.4"),
                            t("feedbackModal.rating.5"),
                          ][rating]
                        }
                      </span>
                    </div>
                  )}
                  {methods.formState.errors.rating && (
                    <p className="mb-4 text-center text-sm text-red-400">
                      {methods.formState.errors.rating.message}
                    </p>
                  )}
                  {/* Comment Input */}

                  <CustomTextarea
                    name="comment"
                    placeholder={t("feedbackModal.placeholder")}
                    size="lg"
                  />
                  {/* Submit button */}
                  <PrimaryButton
                    disabled={loading}
                    className="mt-4 w-full py-3"
                    text="Send Feedback"
                    type="submit"
                  >
                    {loading ? (
                      <Spinner size="sm" />
                    ) : (
                      `${t("feedbackModal.submit")}`
                    )}
                  </PrimaryButton>
                </form>
              </FormProvider>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default FeedbackFormModal;
