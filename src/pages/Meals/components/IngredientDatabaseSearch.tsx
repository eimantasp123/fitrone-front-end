import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import IngredientDatabaseSearchAPI from "./IngredientDatabaseSearchAPI";
import { Ingredients } from "@/utils/types";

interface IngredientDatabaseSearchProps {
  isOpen: boolean;
  onClose: () => void;
  setIngredients: React.Dispatch<React.SetStateAction<Ingredients[]>>;
}

const IngredientDatabaseSearch: React.FC<IngredientDatabaseSearchProps> = ({
  isOpen,
  onClose,
  setIngredients,
}) => {
  const { t } = useTranslation("meals");

  return (
    <>
      {isOpen && (
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
                <h4 className="text-md font-semibold md:text-xl">
                  {t("searchIngredientFromDatabase")}
                </h4>
              </div>
            </div>
            <ModalCloseButton marginTop="3" />
            <ModalBody style={{ padding: "0px 0px" }}>
              <IngredientDatabaseSearchAPI
                setIngredients={setIngredients}
                closeModal={onClose}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default IngredientDatabaseSearch;
