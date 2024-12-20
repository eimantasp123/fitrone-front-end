import CustomButton from "@/components/common/CustomButton";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import CreateMenuModal from "./modals/CreateMenuModal";

const WeeklyMenuHeader: React.FC = () => {
  const { t } = useTranslation("weekPlan");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="z-20 grid w-full grid-cols-1 grid-rows-3 gap-2 bg-background px-5 py-3 dark:bg-backgroundSecondary sm:grid-cols-2 sm:grid-rows-2 md:rounded-lg xl:grid-cols-6 xl:grid-rows-1">
        {/* Navigation Section */}
        <div className="flex items-center justify-center space-x-10 sm:col-span-1 sm:justify-start md:col-span-1 xl:col-span-2">
          {/* Current day */}
          wekkly menu
        </div>

        <div className="text-center sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-2 sm:text-end xl:col-span-2 xl:row-auto">
          <CustomButton onClick={onOpen} text="Create Menu" type="primary" />
        </div>
      </div>
      {/* Menu modal */}
      {isOpen && <CreateMenuModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default WeeklyMenuHeader;
