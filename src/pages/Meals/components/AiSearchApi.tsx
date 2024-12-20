import { showCustomToast } from "@/hooks/showCustomToast";
import { getIngredients } from "@/services/reduxSlices/Ingredients/ingredientsDetailsSlice";
import { useAppDispatch } from "@/store";
import axiosInstance from "@/utils/axiosInterceptors";
import { Ingredients } from "@/utils/types";
import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchInputForm from "./SearchInputForm";
import ShowSearchResults from "./ShowSearchResults";
import SetUnit from "./SetUnit";

interface SearchInputForApiProps {
  className?: string;
  setIngredients: React.Dispatch<React.SetStateAction<Ingredients[]>>;
  closeModal: () => void;
}

export interface SearchResults {
  title: string;
  amount: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  unit: string;
  ingredientId?: string;
}

const SearchInputForApi: React.FC<SearchInputForApiProps> = ({
  className,
  setIngredients,
  closeModal,
}) => {
  const { t } = useTranslation("meals");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [amount] = useState<number>(100);
  const [currentAmount, setCurrentAmount] = useState<number | string>("");
  const [unit, setUnit] = useState<string>("g");
  const dispatch = useAppDispatch();

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
      const response = await axiosInstance.post("/ingredients/search-ai", {
        query: searchQuery,
        unit,
        amount,
      });
      if (response.data.data.calories === 0) {
        setSearchResults([]);
        return;
      }
      setSearchResults((prevResults) => [...prevResults, response.data.data]);
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

    try {
      // Prepare data for backend
      const backendData = {
        title: searchResults[0].title.toLocaleLowerCase(),
        amount: 100,
        unit: searchResults[0].unit,
        calories: searchResults[0].calories,
        protein: searchResults[0].protein,
        fat: searchResults[0].fat,
        carbs: searchResults[0].carbs,
        currentAmount: currentAmount,
        withCurrentAmount: true,
      };

      // Add the ingredient to database
      const response = await axiosInstance.post("/ingredients", backendData);
      const { status, message, warning, data } = response.data;

      // Handle based on the response status
      if (status === "success") {
        // Update the ingredients lists
        if (setIngredients) {
          setIngredients((prev) => [...prev, data]);
        }

        // Get fresh ingredients from the backend
        await dispatch(getIngredients()).unwrap();

        // Show success message if no warning
        if (!warning) {
          showCustomToast({
            status: "success",
            title: message,
          });
        }

        // Show info message if the limit is reached
      } else if (status === "limit_reached") {
        showCustomToast({
          status: "info",
          title: message,
        });
      }

      // Show warning message if there is a warning
      if (warning) {
        showCustomToast({
          status: "warning",
          title: warning,
        });
      }

      setShowResults(false);
      setSearchQuery("");
      setSearchResults([]);
      closeModal();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        showCustomToast({
          status: "error",
          description: error.response.data.message,
        });
      }
    }
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

export default SearchInputForApi;
