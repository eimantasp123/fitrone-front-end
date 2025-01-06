import { showCustomToast } from "@/hooks/showCustomToast";
// import { getIngredients } from "@/services/reduxSlices/Ingredients/ingredientsDetailsSlice";
import { searchIngredientsApi } from "@/api/ingredientsApi";
import {
  IngredientsForMealModal,
  IngredientToCreateOrUpdate,
} from "@/utils/types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchInputForm from "./SearchInput";
import ShowSearchResults from "./SearchResultsDisplay";
import SetUnit from "./UnitSelector";
import { useAddOrEditIngredient } from "@/hooks/Ingredients/useAddOrEditIngredient";

interface ArtificialIntelligenceSearchAPIProps {
  className?: string;
  setIngredients: React.Dispatch<
    React.SetStateAction<IngredientsForMealModal[]>
  >;
  closeModal: () => void;
}

const ArtificialIntelligenceSearchAPI: React.FC<
  ArtificialIntelligenceSearchAPIProps
> = ({ className, setIngredients, closeModal }) => {
  const { t } = useTranslation("meals");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<
    IngredientToCreateOrUpdate[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [currentAmount, setCurrentAmount] = useState<number | string>("");
  const [unit, setUnit] = useState<string>("g");
  const { mutate: createIngredient } = useAddOrEditIngredient({
    setIngredients,
    closeModal,
    setShowResults,
    setSearchQuery,
    setSearchResults,
  });

  // Search for ingredients
  const handleSearch = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setCurrentAmount("");

    if (searchQuery.length < 1) return;

    setLoading(true);
    setShowResults(true);
    setSearchResults([]);

    try {
      const response = await searchIngredientsApi({
        query: searchQuery,
        unit,
      });
      if (response.data.calories === 0) {
        setSearchResults([]);
        return;
      }
      setSearchResults((prevResults) => [...prevResults, response.data]);
    } catch (error) {
      console.error(error);
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
    <div className="w-full">
      {/*  */}
      <p className="flex items-center gap-1 pt-3 text-sm text-textPrimary">
        1. {t("firstInfoForSearchIngredient")}
      </p>
      <div className="my-3 flex w-full flex-col gap-4 text-nowrap md:flex-row">
        <SetUnit unit={unit} setUnit={setUnit} t={t} showLabel={false} />
      </div>

      {/*  */}
      <p className="flex items-center gap-1 py-2 text-sm text-textPrimary">
        2. {t("secondInfoForSearchIngredient")}
      </p>
      <div className={`relative min-w-[200px] ${className} mx-auto`}>
        {/* Search input */}
        <SearchInputForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showResults={showResults}
          handleSearch={handleSearch}
          handleClean={handleClean}
          t={t}
        />
        {/* Search results */}
        {showResults && (
          <ShowSearchResults
            loading={loading}
            t={t}
            searchResults={searchResults}
            currentSingleAmount={currentAmount}
            onAccept={handleAccept}
            onDelete={handleDeleteResults}
            onSingleAmountChange={(e) =>
              setCurrentAmount(parseInt(e.target.value) || "")
            }
          />
        )}
      </div>
    </div>
  );
};

export default ArtificialIntelligenceSearchAPI;
