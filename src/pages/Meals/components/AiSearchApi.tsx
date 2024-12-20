import { showCustomToast } from "@/hooks/showCustomToast";
import { getIngredients } from "@/services/reduxSlices/Ingredients/ingredientsDetailsSlice";
import { useAppDispatch } from "@/store";
import axiosInstance from "@/utils/axiosInterceptors";
import { Ingredients } from "@/utils/types";
import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdSearch } from "react-icons/md";
import ShowSearchResults from "./ShowSearchResults";

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
      <p className="flex items-center gap-1 pt-3 text-[13px] text-textPrimary">
        1. {t("firstInfoForSearchIngredient")}
      </p>
      <div className="my-2 flex w-full flex-col gap-4 text-nowrap md:flex-row">
        <div className="flex items-center gap-3">
          <span className="text-xs">{t("unit")}</span>
          <div className="flex flex-1 items-center gap-2 text-xs">
            <div
              onClick={() => setUnit("g")}
              className={`flex w-[100px] cursor-pointer items-center ${unit === "g" ? "bg-secondary text-white dark:bg-primary dark:text-black" : "border bg-transparent"} justify-center rounded-lg px-4 py-2`}
            >
              {t("grams")}
            </div>
            <div
              onClick={() => setUnit("ml")}
              className={`flex w-[100px] cursor-pointer items-center justify-center rounded-lg ${unit === "ml" ? "bg-secondary text-white dark:bg-primary dark:text-black" : "border bg-transparent"} px-4 py-2`}
            >
              {t("milliliters")}
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <p className="flex items-center gap-1 border-t-[1px] border-borderPrimary py-2 text-[13px] text-textPrimary">
        2. {t("secondInfoForSearchIngredient")}
      </p>
      <div className={`relative min-w-[200px] ${className} mx-auto`}>
        <form className="flex items-center">
          <div className="pointer-events-none absolute left-0 top-[13px] flex items-center pl-4">
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
              <IoIosCloseCircleOutline className="text-xl" />
            </span>
          )}
        </form>

        {showResults && (
          <ShowSearchResults
            loading={loading}
            t={t}
            searchResults={searchResults}
            currentSingleAmount={currentAmount}
            onAccept={handleAccept}
            onDelete={handleDeleteResults}
            onChangeHandler={(e) =>
              setCurrentAmount(parseInt(e.target.value) || "")
            }
          />
        )}
      </div>
    </div>
  );
};

export default SearchInputForApi;
