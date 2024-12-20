import CustomButton from "@/components/common/CustomButton";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TbMoodEmpty } from "react-icons/tb";

interface AssignExistingMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCreateMenuModal?: () => void;
}

interface AssignExistingMenuModalForm {
  title: string;
}

const AssignExistingMenuModal: React.FC<AssignExistingMenuModalProps> = ({
  isOpen,
  onClose,
  onOpenCreateMenuModal,
}) => {
  const { t } = useTranslation(["weeklyMenu", "meals"]);
  const methods = useForm<AssignExistingMenuModalForm>();

  const handleSubmitForm = (data: AssignExistingMenuModalForm) => {
    console.log(data);
  };

  const menu = [];

  const openMenuCreateModal = () => {
    onClose();

    if (onOpenCreateMenuModal) {
      setTimeout(() => {
        onOpenCreateMenuModal();
      }, 50);
    }
  };

  return (
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
      >
        <div className="flex items-center gap-3 border-b-[1px] border-borderPrimary pb-5">
          <div className="flex items-center gap-4">
            <h4 className="font-semibold md:text-lg">
              {t("assingExistingMenu")}
            </h4>
          </div>
        </div>
        <ModalCloseButton marginTop="3" />
        <ModalBody style={{ padding: "0px 0px" }}>
          {menu.length > 0 ? (
            <span>Egzist</span>
          ) : (
            <>
              <div className="my-2 flex flex-col items-center justify-center gap-2 rounded-lg border bg-backgroundSecondary px-6 py-4 text-sm md:flex-row">
                <TbMoodEmpty className="text-lg" />
                {t("noWeeklyMenu")}
              </div>
              <CustomButton
                paddingY="py-3"
                widthFull={true}
                onClick={openMenuCreateModal}
                text={t("createFirstMenu")}
              />
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AssignExistingMenuModal;
