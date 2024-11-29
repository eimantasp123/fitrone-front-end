import axiosInstance from "@/utils/axiosInterceptors";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdDelete, MdDownloadDone, MdSearch } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";

// Interface for meal ingredients
interface Ingredients {
  _id?: string;
  title: string;
  currentAmount: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredientId: string;
}

interface SearchInputForApiProps {
  className?: string;
  setIngredients: React.Dispatch<React.SetStateAction<Ingredients[]>>;
  closeModal: () => void;
}

interface SearchResults {
  title: string;
  amount: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  unit: string;
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
  const [amount, setAmount] = useState<number>(100);
  const [unit, setUnit] = useState<string>("g");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Search for ingredients
  const handleSearch = async (e: MouseEvent) => {
    e.preventDefault();
    if (searchQuery.length < 1) return;
    setLoading(true);
    setShowResults(true);
    setSearchResults([]);
    try {
      const response = await axiosInstance.post("/meals/ingredient", {
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

  // Accept search results
  // const handleAccept = () => {
  //   if(searchResults.length === 0) return;
  //   setIngredients((prevIngredients) => [
  //     ...prevIngredients,
  //     {
  //       ingredientId: "".
  //       title: searchResults[0].title,
  //       amount: searchResults[0].amount,
  //       calories: searchResults[0].calories,
  //       protein: searchResults[0].protein,
  //       fat: searchResults[0].fat,
  //       carbs: searchResults[0].carbs,
  //       unit: searchResults[0].unit,
  //     },
  //   ]);
  //   setShowResults(false);
  //   setSearchQuery("");
  //   setSearchResults([]);
  //   closeModal();
  // };

  // Delete search results
  const handleDeleteResults = () => {
    setShowResults(false);
    setSearchQuery("");
    setSearchResults([]);
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
      <p className="flex items-center gap-1 pt-3 text-[13px] text-textPrimary">
        1. {t("firstInfoForSearchIngredient")}
      </p>
      <div className="my-2 flex w-full items-center gap-4 text-nowrap">
        <div className="flex items-center gap-3">
          <span className="text-xs">{t("amount")}</span>
          <input
            type="number"
            placeholder={t("amount")}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="h-8 w-[100px] flex-1 rounded-lg border border-borderPrimary px-2 py-[3px] text-sm outline-none"
          />
        </div>
        {/*  */}
        <div className="flex items-center gap-3">
          <span className="text-xs">{t("unit")}</span>
          <div className="flex flex-1 items-center gap-1 text-xs">
            <div
              onClick={() => setUnit("g")}
              className={`flex flex-1 cursor-pointer items-center ${unit === "g" ? "bg-secondary text-white dark:bg-primary dark:text-black" : "border bg-transparent"} justify-center rounded-lg px-4 py-2`}
            >
              {t("grams")}
            </div>
            <div
              onClick={() => setUnit("ml")}
              className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg ${unit === "ml" ? "bg-secondary text-white dark:bg-primary dark:text-black" : "border bg-transparent"} px-4 py-2`}
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
            // onClick={(e) => handleSearch(e)}
            type="submit"
            className={`absolute right-0 top-0 m-1 flex h-[29px] cursor-pointer items-center rounded-lg bg-primary px-4 text-sm text-black`}
          >
            {t("search")}
          </button>
        </form>

        {showResults && (
          <div className="border-b-1 border-l-1 border-r-1 z-10 max-h-[200px] overflow-y-auto rounded-b-lg border border-t-0 border-borderPrimary bg-background scrollbar-thin dark:border-borderDark">
            {loading ? (
              <div className="flex items-center justify-center px-4 py-5">
                <ThreeDots color="#BBC22C" height={30} width={30} />
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 bg-neutral-100 p-4 text-sm dark:bg-neutral-900"
                >
                  {/*  */}
                  <div className="flex">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1 font-medium">
                        <span>{result.title}</span>
                        <span>
                          {result.amount} {`(${unit})`}
                        </span>
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
                        // onClick={handleAccept}
                        className="flex size-5 cursor-pointer items-center justify-center rounded-full bg-primary"
                      >
                        <MdDownloadDone className="text-md text-black" />
                      </span>
                      <span onClick={handleDeleteResults}>
                        <MdDelete className="cursor-pointer text-xl text-red-500" />
                      </span>
                    </div>
                  </div>
                  {/*  */}
                  <p className="gap-1 rounded-lg bg-primaryLight p-2 text-center text-[13px] text-black">
                    {t("lastInfoForSearchIngredient")}
                  </p>
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
      </div>
    </div>
  );
};

export default SearchInputForApi;
