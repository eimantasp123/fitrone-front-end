import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { SearchIngredientFromDatabaseApi } from "./SearchIngredientFromDatabaseApi";

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
}

interface SearchIngredientFromDatabseProps {
  isOpen: boolean;
  onClose: () => void;
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

const SearchIngredientFromDatabse: React.FC<
  SearchIngredientFromDatabseProps
> = ({ isOpen, onClose, setIngredients }) => {
  const { t } = useTranslation("meals");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
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
              Search Ingredients from Database
            </h4>
          </div>
        </div>
        <ModalCloseButton marginTop="3" />
        <ModalBody style={{ padding: "0px 0px" }}>
          <SearchIngredientFromDatabaseApi
            setIngredients={setIngredients}
            closeModal={onClose}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchIngredientFromDatabse;
