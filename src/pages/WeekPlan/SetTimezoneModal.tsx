import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import CustomButton from "@/components/common/CustomButton";
import CustomSelect from "@/components/common/CustomSelect";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { TFunction } from "i18next";
import React from "react";

interface SetTimezoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TFunction;
  timezones: { key: string; title: string }[];
  setTimezoneSelected: React.Dispatch<
    React.SetStateAction<{ key: string | null; title: string | null }>
  >;
  timezoneSelected: { key: string | null; title: string | null };
  loading: boolean;
  handleSetTimezone: () => void;
  timezone: string | null;
}
/**
 *  Set Timezone Modal Component
 */
const SetTimezoneModal: React.FC<SetTimezoneModalProps> = ({
  isOpen,
  onClose,
  t,
  timezones,
  setTimezoneSelected,
  timezoneSelected,
  loading,
  handleSetTimezone,
  timezone,
}) => {
  const { colorMode } = useColorMode();
  const {
    isOpen: isOpenConfirmModal,
    onClose: onCloseConfirmModal,
    onOpen: onOpenConfirmModal,
  } = useDisclosure();

  // Confirm update timezone
  const handleConfirm = () => {
    onCloseConfirmModal();
    handleSetTimezone();
  };

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
              <h4 className="font-semibold md:text-lg">{t("timezone")}</h4>
            </div>
          </div>
          <ModalCloseButton marginTop="3" />
          <ModalBody style={{ padding: "10px 0px" }}>
            <div className="space-y-2">
              <p className="text-[15px]">{t("selectTimezoneDescription")}</p>
              <CustomSelect
                options={timezones}
                defaultOption={
                  timezone
                    ? timezones.find((item) => item.key === timezone)?.title
                    : t("selectTimezone")
                }
                selectedOption={timezoneSelected?.title}
                onChange={(option) => setTimezoneSelected(option)}
              />
              <CustomButton
                text={timezone ? t("updateTimezone") : t("setTimezone")}
                widthFull={true}
                loading={loading}
                disabled={
                  timezone === timezoneSelected.key ||
                  !timezoneSelected.key ||
                  loading
                }
                loadingSpinner={false}
                onClick={
                  timezone
                    ? () => onOpenConfirmModal()
                    : () => handleSetTimezone()
                }
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Confirm update timezone modal */}
      {isOpenConfirmModal && (
        <ConfirmActionModal
          loading={false}
          confirmButtonText={t("common:update")}
          cancelButtonText={t("common:cancel")}
          isOpen={isOpenConfirmModal}
          onClose={onCloseConfirmModal}
          title={t("updateTimezone")}
          description={t("updateTimezoneDescription")}
          onAction={handleConfirm}
          type="primary"
        />
      )}
    </>
  );
};

export default SetTimezoneModal;
