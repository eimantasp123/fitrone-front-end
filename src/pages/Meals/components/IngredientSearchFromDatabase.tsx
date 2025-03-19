import { showCustomToast } from "@/hooks/showCustomToast";
import {
  IngredientsForMealModal,
  SearchResultFromDatabase,
} from "@/utils/types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchInput from "../../../components/common/SearchInput";
import SearchResultsDisplay from "./SearchResultsDisplay";
import { useIngredientSearchForMealModal } from "@/hooks/Ingredients/useIngredientSearchForMealModal";

interface IngredientSearchFromDatabaseProps {
  isOpen: boolean;
  onClose: () => void;
  setIngredients: React.Dispatch<
    React.SetStateAction<IngredientsForMealModal[]>
  >;
}

/**
 * Component to search ingredients from the database
 */
const IngredientSearchFromDatabase: React.FC<
  IngredientSearchFromDatabaseProps
> = ({ isOpen, onClose, setIngredients }) => {
  const { t } = useTranslation("meals");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<
    SearchResultFromDatabase[]
  >([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { searchMutation, acceptSearchResult } =
    useIngredientSearchForMealModal({
      setIngredients,
      onClose,
      setSearchResults,
      setShowResults,
      setSearchQuery,
    });

  // Handle amount change
  const handleAmountChange = (value: string, id: string) => {
    setAmounts((prev) => ({ ...prev, [id]: value }));
  };

  // Search for ingredients
  const handleSearch = async () => {
    if (searchQuery.length < 1) return;
    setShowResults(true);
    setSearchResults([]);

    // Search for ingredients
    searchMutation.mutate(searchQuery);
  };

  // Accept search results
  const handleAccept = async (id: string) => {
    if (id && !amounts[id]) {
      showCustomToast({
        status: "error",
        title: t("errors.amountRequired"),
      });
      return;
    }

    // Accept the search result
    acceptSearchResult.mutate({ ingredientId: id, currentAmount: amounts[id] });
  };

  // Close search results when clicked outside
  const handleClean = () => {
    setShowResults(false);
    setSearchQuery("");
  };

  return (
    <>
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
            <p className="flex items-center gap-1 border-t-[1px] border-borderPrimary py-2 text-[13px] text-textPrimary">
              1. {t("searchIngredientFromDatabaseFirstInfoText")}
            </p>
            <div ref={containerRef} className={`relative mx-auto h-auto`}>
              {/* Search input for ingredients */}
              <SearchInput
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showResults={showResults}
                handleSearch={handleSearch}
                handleClean={handleClean}
                t={t}
              />

              {/* Show search results */}
              {showResults && (
                <SearchResultsDisplay
                  handleAcceptByResultId={true}
                  currentAmounts={amounts}
                  onAccept={handleAccept}
                  onAmountChange={handleAmountChange}
                  loading={searchMutation.isPending}
                  t={t}
                  searchResults={searchResults}
                />
              )}
              {showResults && searchResults.length > 0 && (
                <p className="mt-3 gap-1 rounded-lg bg-primaryLight p-2 text-center text-[13px] text-black">
                  {t("searchIngredientFromDatabaseLastInfoText")}
                </p>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default IngredientSearchFromDatabase;
