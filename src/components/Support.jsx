import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { BiSupport } from "react-icons/bi";
import SupportModal from "./SupportModal";
import { useTranslation } from "react-i18next";

export default function Support() {
  const { t } = useTranslation("header");
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();

  const handleOpenModal = () => {
    setIsTooltipOpen(false);
    onOpen();
  };

  return (
    <div className="">
      <Tooltip isOpen={isTooltipOpen} label={t("support")}>
        <IconButton
          onMouseEnter={() => setIsTooltipOpen(true)}
          onMouseLeave={() => setIsTooltipOpen(false)}
          onClick={handleOpenModal}
          size="sm"
          icon={<BiSupport className="text-[14px]" />}
          variant="customHeaderIcon"
        />
      </Tooltip>

      {/* Support Modal */}
      <SupportModal
        setIsTooltipOpen={setIsTooltipOpen}
        isModalOpen={isModalOpen}
        onClose={onClose}
      />
    </div>
  );
}
