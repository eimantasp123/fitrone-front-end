import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import AssignMealManagementStation from "../components/AssignMealManagementStation";

interface AssignMealForCurrentDayProps {
  isOpen: boolean;
  onClose: () => void;
  dayId: string;
  weeklyMenuId: string;
}

const AssignMealForCurrentDay: React.FC<AssignMealForCurrentDayProps> = ({
  isOpen,
  onClose,
  dayId,
  weeklyMenuId,
}) => {
  const { t } = useTranslation(["weeklyMenu"]);
  const { colorMode } = useColorMode();

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
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
                <h4 className="font-semibold md:text-lg">{t("assignMeals")}</h4>
              </div>
            </div>
            <ModalCloseButton marginTop="3" />
            <ModalBody style={{ padding: "0px 0px" }}>
              <AssignMealManagementStation
                dayId={dayId}
                weeklyMenuId={weeklyMenuId}
                closeModal={onClose}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default AssignMealForCurrentDay;
