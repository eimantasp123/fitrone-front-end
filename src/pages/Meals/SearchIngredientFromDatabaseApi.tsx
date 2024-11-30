import { showCustomToast } from "@/hooks/showCustomToast";
import axiosInstance from "@/utils/axiosInterceptors";
import { Ingredients } from "@/utils/types";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdDownloadDone, MdSearch } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";

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
      const response = await axiosInstance.get("/meals/ingredient-search", {
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
      const response = await axiosInstance.get(`/meals/ingredient/${id}`, {
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
  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setShowResults(false);
      setSearchQuery("");
    }
  };

  // Close search results when clicked outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full">
      {/*  */}
      <p className="flex items-center gap-1 border-t-[1px] border-borderPrimary py-2 text-[13px] text-textPrimary">
        1. {t("searchIngredientFromDatabaseFirstInfoText")}
      </p>
      <div
        ref={containerRef}
        className={`relative min-w-[200px] ${className} mx-auto`}
      >
        <form className="flex items-center">
          <div className="pointer-events-none absolute left-0 top-[10px] flex items-center pl-4">
            <MdSearch className="text-xl text-placeholder" />
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder={t("searchPlaceholder")}
            className={`w-full px-12 py-2 text-sm ${
              showResults
                ? "focus:border-t-1 focus:border-l-1 focus:border-r-1 rounded-tl-lg rounded-tr-lg border-b-transparent shadow-none"
                : "rounded-lg transition-shadow duration-300 ease-in-out focus:shadow-custom-light4"
            } border border-borderPrimary placeholder-placeholder outline-none`}
          />
          <button
            onClick={(e) => handleSearch(e)}
            type="submit"
            className={`absolute right-0 top-0 m-1 flex h-[29px] cursor-pointer items-center rounded-lg bg-primary px-4 text-sm text-black`}
          >
            {t("search")}
          </button>
        </form>

        {showResults && (
          <div className="border-b-1 border-l-1 border-r-1 z-10 max-h-[300px] overflow-y-auto rounded-b-lg border border-t-0 border-borderPrimary bg-background scrollbar-thin dark:border-borderDark">
            {loading ? (
              <div className="flex items-center justify-center px-4 py-5">
                <ThreeDots color="#BBC22C" height={30} width={30} />
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 bg-background p-4 text-sm"
                >
                  {/*  */}
                  <div className="flex">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3 font-medium">
                        <div className="space-x-1">
                          <span>{result.title}</span>
                          <span>
                            {result.amount} {`(${result.unit})`}
                          </span>
                        </div>

                        <hr className="h-[50%] border-[1px] border-black dark:border-white/50" />

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
                            className="h-8 w-[100px] flex-1 rounded-lg border border-borderPrimary px-2 py-[3px] text-sm font-normal outline-none"
                          />
                          <span className="font-normal">{result.unit}.</span>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <span>
                          {t("calories")}: {result.calories}kcal
                        </span>
                        <span>
                          {t("protein")}: {result.protein}g.
                        </span>
                        <span>
                          {t("fat")}: {result.fat}g.
                        </span>
                        <span>
                          {t("carbs")}: {result.carbs}g.
                        </span>
                      </div>
                    </div>
                    {/* Accept and delete button */}
                    <div className="ml-auto flex items-center gap-3">
                      <span
                        onClick={() => handleAccept(result.ingredientId)}
                        className="flex size-5 cursor-pointer items-center justify-center rounded-full bg-primary"
                      >
                        <MdDownloadDone className="text-md text-black" />
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center px-4 py-6 text-sm">
                <p className="font-medium">{t("noIngredientsFound")}</p>
                <p>{t("noIngredietnsFoundDescription")}</p>
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
    </div>
  );
};

export default SearchIngredientFromDatabaseApi;
