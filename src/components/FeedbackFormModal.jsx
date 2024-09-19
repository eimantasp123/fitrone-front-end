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
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RiFeedbackLine } from "react-icons/ri";
import { feedbackSchema } from "../utils/validationSchema";
import PrimaryButton from "./common/PrimaryButton";
import axiosInstance from "../utils/axiosInterceptors";
import useAsync from "../hooks/useAsync";
import useCustomToast from "../hooks/useCustomToast";

// Feedback form modal component
export default function FeedbackFormModal({ isOpen, onClose }) {
  const [rating, setRating] = useState(null);
  const methods = useForm({
    resolver: yupResolver(feedbackSchema),
  });
  const customToast = useCustomToast();

  // Handle rating selection
  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);
    methods.setValue("rating", ratingValue);
  };

  // Handle form submission
  const {
    execute: handleSubmitFeedback,
    loading,
    error,
    clearError,
  } = useAsync(async (data) => {
    const response = await axiosInstance.post("/feedback", data);
    if (response) {
      customToast({
        status: "success",
        title: "Feedback submitted successfully",
        description: "Thank you for your valuable feedback!",
      });
      // Reset form fields
      setRating(null);
      methods.reset();
      onClose();
    }
  });

  // Close modal and reset form fields
  const handleModalClose = () => {
    clearError();
    setRating(null);
    methods.reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      isCentered
      size={{ base: "sm", md: "lg" }}
    >
      <ModalOverlay />
      <ModalContent p={6} sx={{ borderRadius: "0.75rem" }}>
        <div className="flex items-center gap-3 border-b-[1px] border-borderColor pb-5">
          <span className="flex size-9 items-center justify-center rounded-full bg-textPrimary">
            <RiFeedbackLine className="text-lg text-background" />
          </span>
          <h4 className="text-xl font-semibold">Feedback</h4>
        </div>
        <ModalCloseButton marginTop="3" />
        <ModalBody>
          <FormProvider {...methods}>
            {/* Proper usage of handleSubmit */}
            <form
              className="mt-6"
              onSubmit={methods.handleSubmit(handleSubmitFeedback)}
            >
              <h3 className="mb-4 text-center text-3xl font-bold">
                How are you feeling?
              </h3>
              <p className="mb-4 text-center leading-tight">
                Your input is valuable in helping us better understand your
                needs and tailor our service accordingly.
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
                      ["Very Bad", "Bad", "Neutral", "Good", "Very Good"][
                        rating
                      ]
                    }
                  </span>
                </div>
              )}
              {methods.formState.errors.rating && (
                <p className="mb-4 text-center text-sm text-red-500">
                  {methods.formState.errors.rating.message}
                </p>
              )}
              {/* Comment Input */}
              <div className="flex flex-col">
                <textarea
                  type="text"
                  id="comment"
                  placeholder="Add a Comment..."
                  className="min-h-[150px] rounded-lg border border-borderColor bg-background p-3 outline-none placeholder:text-textSecondary focus:border-textPrimary"
                  {...methods.register("comment")}
                />
                {methods.formState.errors.comment && (
                  <p className="mt-1 text-sm text-red-500">
                    {methods.formState.errors.comment.message}
                  </p>
                )}
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </div>
              {/* Submit button */}
              <PrimaryButton
                disabled={loading}
                className="py-3"
                text="Send Feedback"
                type="submit"
              >
                {loading ? <Spinner size="sm" /> : "Send Feedback"}
              </PrimaryButton>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

FeedbackFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
