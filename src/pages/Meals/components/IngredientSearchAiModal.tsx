import { searchIngredientsApi } from "@/api/ingredientsApi";
import { showCustomToast } from "@/hooks/showCustomToast";
import {
  IngredientsForMealModal,
  IngredientToCreateOrUpdate,
} from "@/utils/types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { WiStars } from "react-icons/wi";
import SearchInput from "../../../components/common/SearchInput";
import SearchResultsDisplay from "./SearchResultsDisplay";
import UnitSelector from "../../../components/common/UnitSelector";
import { useAddOrEditIngredient } from "@/hooks/Ingredients/useAddOrEditIngredient";

interface IngredientSearchAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIngredients: React.Dispatch<
    React.SetStateAction<IngredientsForMealModal[]>
  >;
}

/**
 * IngredientSearchAiModal component to search ingredients using AI
 */
const IngredientSearchAiModal: React.FC<IngredientSearchAiModalProps> = ({
  isOpen,
  onClose,
  setIngredients,
}) => {
  const { t } = useTranslation("meals");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<
    IngredientToCreateOrUpdate[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [currentAmount, setCurrentAmount] = useState<number | string>("");
  const [unit, setUnit] = useState<string>("g");
  const { mutate: createIngredient, isPending } = useAddOrEditIngredient({
    setIngredients,
    closeModal: onClose,
    setShowResults,
    setSearchQuery,
    setSearchResults,
  });

  // Search for ingredients
  const handleSearch = async () => {
    // Prevent default form submission
    setCurrentAmount("");

    // Check if search query is empty
    if (searchQuery.length < 1) return;

    setLoading(true);
    setShowResults(true);
    setSearchResults([]);

    try {
      const response = await searchIngredientsApi({
        query: searchQuery,
        unit,
      });

      // Check if no results found from the AI search
      if (response.data.calories === 0) {
        setSearchResults([]);
        return;
      }

      // Set search results in the state
      setSearchResults((prevResults) => [...prevResults, response.data]);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  //
  // Accept search results
  //
  const handleAccept = async () => {
    // Check if search results are empty
    if (searchResults.length === 0) return;

    // Check if current amount is empty
    if (currentAmount === "" || currentAmount === 0) {
      showCustomToast({
        status: "error",
        description: t("errors.amountRequired"),
      });
      return;
    }

    // Prepare data for backend
    const backendData = {
      title: searchResults[0].title.toLocaleLowerCase(),
      amount: 100,
      unit: searchResults[0].unit,
      calories: searchResults[0].calories,
      protein: searchResults[0].protein,
      fat: searchResults[0].fat,
      carbs: searchResults[0].carbs,
      currentAmount: Number(currentAmount),
      withCurrentAmount: true,
    };

    // Call the mutation
    createIngredient(backendData);
  };

  // Delete search results
  const handleDeleteResults = () => {
    setShowResults(false);
    setSearchQuery("");
    setSearchResults([]);
    setCurrentAmount("");
  };

  // Close search results when clicked outside
  const handleClean = () => {
    setShowResults(false);
    setSearchQuery("");
  };

  return (
    <>
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
              <h4 className="font-semibold md:text-xl">
                {t("searchPlaceholder")} AI
              </h4>
              <WiStars className="text-2xl" />
            </div>
          </div>
          <ModalCloseButton marginTop="3" />
          <ModalBody style={{ padding: "0px 0px" }}>
            <div className="w-full">
              {/*  */}
              <p className="flex items-center gap-1 pt-3 text-sm text-textPrimary">
                1. {t("firstInfoForSearchIngredient")}
              </p>
              <div className="my-3 flex w-full flex-col gap-4 text-nowrap md:flex-row">
                <UnitSelector
                  unit={unit}
                  setUnit={setUnit}
                  t={t}
                  showLabel={false}
                />
              </div>

              {/*  */}
              <p className="flex items-center gap-1 py-2 text-sm text-textPrimary">
                2. {t("secondInfoForSearchIngredient")}
              </p>
              <div className={`relative mx-auto min-w-[200px]`}>
                {/* Search input */}
                <SearchInput
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  showResults={showResults}
                  handleSearch={handleSearch}
                  handleClean={handleClean}
                  t={t}
                />
                {/* Search results */}
                {showResults && (
                  <SearchResultsDisplay
                    loading={loading}
                    t={t}
                    searchResults={searchResults}
                    currentSingleAmount={currentAmount}
                    onAccept={handleAccept}
                    onDelete={handleDeleteResults}
                    onAcceptLoading={isPending}
                    onSingleAmountChange={(e) =>
                      setCurrentAmount(parseInt(e.target.value) || "")
                    }
                  />
                )}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default IngredientSearchAiModal;
