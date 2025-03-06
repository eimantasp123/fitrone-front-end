import CustomButton from "@/components/common/CustomButton";
import { useCreateComboList } from "@/hooks/Orders/useCreateComboList";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  getAllDays: number[] | undefined;
  year: string | null;
  week: string | null;
}

const SupplierModalToSelectDays: React.FC<Props> = ({
  isOpen,
  onClose,
  getAllDays,
  year,
  week,
}) => {
  const { t } = useTranslation(["orders", "common"]);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const { mutate: generateCombo, isPending } = useCreateComboList(() =>
    onClose(),
  );

  const weekDays = t("common:weekDays", { returnObjects: true }) as {
    index: number;
    name: string;
  }[];

  // Handle select day
  const handleSelectDay = (day: number) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day),
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // Generate combo list
  const generateComboList = () => {
    if (!year || !week || !selectedDays.length) return;
    generateCombo({ year, week, selectedDays });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent
        p={6}
        sx={{
          borderRadius: "0.75rem",
        }}
      >
        <div className="flex items-center gap-3 border-b-[1px] pb-5">
          <div className="flex items-center gap-4">
            <h4 className="font-semibold">{t("selectDays")}</h4>
          </div>
        </div>
        <ModalCloseButton size="sm" />
        <ModalBody style={{ padding: "0px 0px" }}>
          <div className="grid-rows-auto my-4 grid max-h-[400px] grid-cols-1 gap-2">
            {getAllDays &&
              getAllDays.map((day, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectDay(day)}
                  className={`flex w-full cursor-pointer items-center border-2 transition-colors duration-200 ease-in-out ${selectedDays?.includes(day) ? "border-primary" : "border-transparent"} justify-between gap-2 rounded-lg bg-backgroundSecondary p-2 shadow-sm dark:bg-backgroundSecondary`}
                >
                  <div className="w-[90%] text-sm sm:text-sm">
                    {weekDays.find((item) => item.index === day)?.name}
                  </div>
                  <span
                    className={`size-[14px] rounded-full border-[2px] transition-colors duration-200 ease-in-out ${selectedDays?.includes(day) ? "border-primary dark:bg-backgroundSecondary" : "border-neutral-300 bg-backgroundSecondary dark:border-neutral-700 dark:bg-background"} `}
                  ></span>
                </div>
              ))}
          </div>

          <CustomButton
            text={t("generateComboList")}
            onClick={generateComboList}
            loading={isPending}
            loadingSpinner={false}
            disabled={isPending || selectedDays.length < 2}
            widthFull={true}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SupplierModalToSelectDays;
