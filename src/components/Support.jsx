import { Tooltip, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { BiSupport } from "react-icons/bi";
import SupportModal from "./SupportModal";

export default function Support() {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();

  const handleOpenModal = () => {
    setIsTooltipOpen(false);
    onOpen();
  };

  return (
    <div className="hidden md:block">
      <Tooltip
        isOpen={isTooltipOpen}
        sx={{ fontSize: "14px" }}
        label="Support"
        fontSize="md"
      >
        <button
          onMouseEnter={() => setIsTooltipOpen(true)}
          onMouseLeave={() => setIsTooltipOpen(false)}
          onClick={handleOpenModal}
          className="border-border right-4 flex size-9 cursor-pointer items-center justify-center rounded-full border bg-background text-textPrimary transition-colors duration-200 ease-in-out"
        >
          <BiSupport className="text-md" />
        </button>
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
