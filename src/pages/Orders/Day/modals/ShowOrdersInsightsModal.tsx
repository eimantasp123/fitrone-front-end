import { OrderByIdGeneralInsights } from "@/utils/types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

interface ShowOrdersInsightsProps {
  isOpen: boolean;
  onClose: () => void;
  orderInsights: OrderByIdGeneralInsights[] | [];
}

/**
 * Show Orders Insights Modal
 */
const ShowOrdersInsightsModal = ({
  isOpen,
  onClose,
  orderInsights,
}: ShowOrdersInsightsProps) => {
  console.log("orderInsights", orderInsights);

  return (
    <>
      <Modal
        isOpen={isOpen}
        isCentered
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
            <h4 className="text-xl font-semibold md:text-xl">
              Orders Insights
            </h4>
          </div>
          <ModalCloseButton marginTop="3" />
          <ModalBody style={{ padding: "0px 0px" }}>
            <span>SHow details</span>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShowOrdersInsightsModal;
