import { showCustomToast } from "@/hooks/showCustomToast";
import axiosInstance from "@/utils/axiosInterceptors";
import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchInput from "./SearchInput";
import SearchResultsDisplay from "./SearchResultsDisplay";
import { IngredientsForMealModal } from "@/utils/types";

interface SearchResult {
  ingredientId: string;
  title: string;
  amount: number;
  unit: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

interface SearchIngredientFromDatabaseApiProps {
  className?: string;
  setIngredients: React.Dispatch<
    React.SetStateAction<IngredientsForMealModal[]>
  >;
  closeModal: () => void;
}

const SearchIngredientFromDatabaseApi: React.FC<
  SearchIngredientFromDatabaseApiProps
> = ({ className, setIngredients, closeModal }) => {
  const { t } = useTranslation("meals");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Handle amount change
  const handleAmountChange = (value: string, id: string) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [id]: value,
    }));
  };

  // Search for ingredients
  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (searchQuery.length < 1) return;
    setLoading(true);
    setShowResults(true);
    setSearchResults([]);
    try {
      const response = await axiosInstance.get("/ingredients/search", {
        params: {
          query: searchQuery,
        },
      });
      if (response.data.data.length === 0) return;
      setSearchResults((prevResults) => [
        ...prevResults,
        ...response.data.data,
      ]);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        showCustomToast({
          status: "error",
          title: error.response?.data?.message || "An error occurred",
        });
      } else {
        showCustomToast({
          status: "error",
          title: "An unknown error occurred",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Accept search results
  const handleAccept = async (id: string | undefined) => {
    if (id !== undefined && !amounts[id]) {
      showCustomToast({
        status: "error",
        title: t("errors.amountRequired"),
      });
      return;
    }

    try {
      const response = await axiosInstance.get(`/ingredients/nutrition/${id}`, {
        params: {
          currentAmount: id && amounts[id],
        },
      });
      const { data } = response.data;
      setIngredients((prevIngredients) => [...prevIngredients, data]);
      setShowResults(false);
      setSearchQuery("");
      setSearchResults([]);
      closeModal();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        showCustomToast({
          status: "error",
          title: error.response?.data?.message || "An error occurred",
        });
      } else {
        showCustomToast({
          status: "error",
          title: "An unknown error occurred",
        });
      }
    }
  };

  // Close search results when clicked outside
  const handleClean = () => {
    setShowResults(false);
    setSearchQuery("");
  };

  return (
    <>
      <p className="flex items-center gap-1 border-t-[1px] border-borderPrimary py-2 text-[13px] text-textPrimary">
        1. {t("searchIngredientFromDatabaseFirstInfoText")}
      </p>
      <div
        ref={containerRef}
        className={`relative h-auto ${className} mx-auto`}
      >
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
            loading={loading}
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
    </>
  );
};

export default SearchIngredientFromDatabaseApi;
