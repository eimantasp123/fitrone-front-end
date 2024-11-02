import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
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
    <div className="">
      <Tooltip
        isOpen={isTooltipOpen}
        sx={{ fontSize: "14px" }}
        label="Support"
        fontSize="md"
      >
        <IconButton
          onMouseEnter={() => setIsTooltipOpen(true)}
          onMouseLeave={() => setIsTooltipOpen(false)}
          onClick={handleOpenModal}
          icon={<BiSupport className="text-md" />}
          variant="customIconButton"
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
