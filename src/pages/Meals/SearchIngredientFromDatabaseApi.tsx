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
  const handleAmountChange = (id: string, value: string) => {
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
  const handleAccept = async (id: string) => {
    if (!amounts[id]) {
      showCustomToast({
        status: "error",
        title: t("errors.amountRequired"),
      });
      return;
    }
    try {
      const response = await axiosInstance.get(`/ingredients/nutrition/${id}`, {
        params: {
          currentAmount: amounts[id],
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
              className={`absolute right-[76px] m-1 flex h-[30px] cursor-pointer items-center rounded-lg bg-backgroundSecondary px-3 text-sm dark:bg-backgroundLight`}
            >
              <IoIosCloseCircleOutline className="text-lg" />
            </span>
          )}
        </form>

        {showResults && (
          <div
            onWheel={(e) => e.stopPropagation()}
            className="border-b-1 border-l-1 border-r-1 custom-scrollbar-select z-10 max-h-[350px] overflow-y-auto rounded-b-lg border border-t-0 border-borderPrimary bg-background dark:border-borderDark dark:bg-neutral-900/70"
          >
            {loading ? (
              <div className="flex items-center justify-center px-4 py-5">
                <ThreeDots color="#BBC22C" height={30} width={30} />
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div
                  key={index}
                  className={`flex w-full flex-col gap-2 bg-background p-4 text-sm dark:bg-neutral-900/20 ${searchResults.length === index + 1 ? "border-none" : "border-b-[1px]"}`}
                >
                  <div className="flex w-full items-end gap-1 font-medium md:items-center md:gap-3">
                    <div className="gap-3 md:flex md:items-center">
                      {/* Ingredient title */}
                      <div className="space-x-1">
                        <span>{capitalizeFirstLetter(result.title)}</span>
                        <span>
                          {result.amount} {`(${result.unit})`}
                        </span>
                      </div>

                      {/* Divider */}
                      <hr className="hidden h-[15px] border-r-[1px] border-black dark:border-white/50 md:block" />

                      {/* Amount input */}
                      <div className="flex w-[30%] items-center gap-3 text-nowrap">
                        <span className="text-sm font-normal">
                          {t("needenAmount")}
                        </span>
                        <input
                          type="number"
                          value={amounts[result.ingredientId] || ""}
                          onChange={(e) =>
                            handleAmountChange(
                              result.ingredientId,
                              e.target.value,
                            )
                          }
                          className="h-8 w-[80px] flex-1 rounded-lg border border-borderPrimary px-2 py-[3px] text-sm font-normal outline-none md:w-[100px]"
                        />
                        <span className="font-normal">{result.unit}.</span>
                      </div>
                    </div>

                    {/* Accept and delete button */}
                    <div className="ml-auto mr-4 flex items-center gap-3">
                      <span
                        onClick={() => handleAccept(result.ingredientId)}
                        className="mb-1 flex size-7 cursor-pointer items-center justify-center rounded-full bg-primary md:mb-0 md:size-7"
                      >
                        <MdDownloadDone className="text-md text-black" />
                      </span>
                    </div>
                  </div>

                  {/* Nutrition information */}
                  <div className="mt-2 grid grid-cols-2 gap-1 text-xs md:flex md:gap-2">
                    <span className="dark:bg-backgroundDark rounded-full bg-backgroundSecondary px-3 py-1">
                      {t("calories")}: {result.calories} kcal
                    </span>
                    <span className="dark:bg-backgroundDark rounded-full bg-backgroundSecondary px-3 py-1">
                      {t("protein")}: {result.protein}g.
                    </span>
                    <span className="dark:bg-backgroundDark rounded-full bg-backgroundSecondary px-3 py-1">
                      {t("fat")}: {result.fat}g.
                    </span>
                    <span className="dark:bg-backgroundDark rounded-full bg-backgroundSecondary px-3 py-1">
                      {t("carbs")}: {result.carbs}g.
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center px-4 py-6 text-sm">
                <p className="font-medium">{t("noIngredientsFound")}</p>
                <p className="text-center">
                  {t("noIngredietnsFoundDescription")}
                </p>
              </div>
            )}
          </div>
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
