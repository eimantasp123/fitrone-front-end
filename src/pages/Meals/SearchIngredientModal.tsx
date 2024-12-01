import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { WiStars } from "react-icons/wi";
import SearchInputForApi from "./SearchInputForApi";
import { Ingredients } from "@/utils/types";

interface SearchIngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIngredients: React.Dispatch<React.SetStateAction<Ingredients[]>>;
}

const SearchIngredientModal: React.FC<SearchIngredientModalProps> = ({
  isOpen,
  onClose,
  setIngredients,
}) => {
  const { t } = useTranslation("meals");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
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
            <h4 className="text-xl font-semibold">
              {t("searchPlaceholder")} AI
            </h4>
            <WiStars className="text-2xl" />
          </div>
        </div>
        <ModalCloseButton marginTop="3" />
        <ModalBody style={{ padding: "0px 0px" }}>
          <SearchInputForApi
            setIngredients={setIngredients}
            closeModal={onClose}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchIngredientModal;
