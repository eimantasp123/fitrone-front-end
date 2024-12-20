import { showCustomToast } from "@/hooks/showCustomToast";
import axiosInstance from "@/utils/axiosInterceptors";
import { capitalizeFirstLetter } from "@/utils/helper";
import { Ingredients } from "@/utils/types";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdDownloadDone, MdSearch } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ShowSearchResults from "./ShowSearchResults";
import IngredientCard from "@/pages/Ingredients/IngredientCard";

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
  setIngredients: React.Dispatch<React.SetStateAction<Ingredients[]>>;
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
        <form className="flex items-center">
          <div className="pointer-events-none absolute left-0 flex items-center pl-4">
            <MdSearch className="text-xl text-placeholder" />
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder={t("searchPlaceholder")}
            className={`w-full px-12 py-3 text-sm ${
              showResults
                ? "focus:border-t-1 focus:border-l-1 focus:border-r-1 rounded-tl-lg rounded-tr-lg border-b-transparent shadow-none"
                : "rounded-lg transition-shadow duration-300 ease-in-out focus:shadow-custom-light4"
            } border border-borderPrimary placeholder-placeholder outline-none`}
          />

          <button
            onClick={(e) => handleSearch(e)}
            type="submit"
            className={`absolute right-0 m-1 flex h-[30px] cursor-pointer items-center rounded-lg bg-primary px-4 text-sm text-black`}
          >
            {t("search")}
          </button>
          {searchQuery && (
            <span
              onClick={handleClean}
              className={`absolute right-[80px] m-1 flex h-[30px] cursor-pointer items-center rounded-lg bg-backgroundSecondary px-3 text-sm dark:bg-backgroundLight`}
            >
              <IoIosCloseCircleOutline className="text-lg" />
            </span>
          )}
        </form>

        {showResults && (
          <ShowSearchResults
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
