import CustomButton from "@/components/common/CustomButton";
import CustomSelect from "@/components/common/CustomSelect";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorMode,
} from "@chakra-ui/react";
import { TFunction } from "i18next";
import React from "react";

interface ChangeCustomerStatusProps {
  isOpen: boolean;
  onClose: () => void;
  t: TFunction;
  loading: boolean;
  options: {
    key: string;
    title: string;
  }[];
  activeStatus: string;
  setStatusSelected: (status: string) => void;
  performAction: () => void;
}
/**
 *  Modal to change the status of a customer
 */
const ChangeCustomerStatus: React.FC<ChangeCustomerStatusProps> = ({
  isOpen,
  onClose,
  t,
  loading,
  options,
  activeStatus,
  setStatusSelected,
  performAction,
}) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", md: "2xl" }}
      >
        <ModalOverlay />
        <ModalContent
          p={6}
          sx={{
            borderRadius: "0.75rem",
          }}
          bg={
            colorMode === "light"
              ? "light.background"
              : "dark.backgroundSecondary"
          }
        >
          <div className="flex items-center gap-3 border-b-[1px] border-borderPrimary pb-5">
            <div className="flex items-center gap-4">
              <h4 className="font-semibold md:text-lg">{t("statusTitle")}</h4>
            </div>
          </div>
          <ModalCloseButton marginTop="3" />
          <ModalBody style={{ padding: "10px 0px" }}>
            <div className="space-y-2">
              <p className="text-[15px]">
                {t("updateCustomerStatusDescription")}
              </p>
              <CustomSelect
                options={options}
                defaultOption={
                  activeStatus
                    ? options.find((item) => item.key === activeStatus)?.title
                    : "Select status"
                }
                selectedOption={
                  options.find((item) => item.key === activeStatus)?.title
                }
                onChange={(option) => setStatusSelected(option.key)}
              />
              <CustomButton
                text={t("updateStatus")}
                widthFull={true}
                loading={loading}
                disabled={loading}
                loadingSpinner={false}
                onClick={() => performAction()}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangeCustomerStatus;
