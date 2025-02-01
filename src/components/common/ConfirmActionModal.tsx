import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import CustomButton from "./CustomButton";

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  onAction: () => void;
  title: string;
  description: string;
  cancelButtonText?: string;
  leftButtonText?: string;
  confirmButtonText: string;
  type?: "warning" | "delete" | "primary";
  loadingSpinner?: boolean;
  leftButtonAction?: () => void;
  buttonSectionClassName?: string;
}

/**
 * General modal for confirming actions
 */
const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  isOpen,
  onClose,
  loading,
  onAction,
  title,
  description,
  cancelButtonText,
  leftButtonAction,
  leftButtonText,
  confirmButtonText,
  loadingSpinner,
  type = "delete",
  buttonSectionClassName = "flex w-full items-center justify-between gap-3",
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ base: "xs", md: "lg" }}
      >
        <ModalOverlay />
        <ModalContent sx={{ padding: "1em", borderRadius: "0.75rem" }}>
          <h2 className="p-1 font-medium">{title}</h2>
          <ModalCloseButton marginTop="2" />
          <ModalBody sx={{ padding: "4px" }}>
            <p className="mb-4 mt-2 pl-1 text-sm text-textSecondary md:text-[15px]">
              {description}
            </p>
            <div className={buttonSectionClassName}>
              <CustomButton
                text={cancelButtonText || leftButtonText}
                type="light"
                widthFull={true}
                onClick={leftButtonAction ?? onClose}
              />
              <CustomButton
                text={confirmButtonText}
                type={
                  type === "delete"
                    ? "red"
                    : type === "primary"
                      ? "primary"
                      : "warning"
                }
                widthFull={true}
                loading={loading}
                loadingSpinner={loadingSpinner}
                onClick={onAction}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmActionModal;
