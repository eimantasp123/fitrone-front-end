import { capitalizeFirstLetter } from "@/utils/helper";
import { IngredientToCreateOrUpdate } from "@/utils/types";
import { TFunction } from "i18next";
import React from "react";
import { MdDelete, MdDownloadDone } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";

interface SearchResultsDisplayProps {
  loading: boolean;
  t: TFunction;
  searchResults: IngredientToCreateOrUpdate[];
  currentSingleAmount?: number | string;
  currentAmounts?: Record<string, string>;
  onAmountChange?: (value: string, id: string) => void;
  handleAcceptByResultId?: boolean;
  onAccept: (id: string) => void;
  onDelete?: () => void;
  infoForSearchIngredient?: string | null;
  onSingleAmountChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchResultsDisplay: React.FC<SearchResultsDisplayProps> = ({
  loading,
  t,
  searchResults,
  currentSingleAmount,
  currentAmounts,
  onAmountChange,
  onSingleAmountChange,
  onAccept,
  onDelete,
  handleAcceptByResultId = false,
  infoForSearchIngredient,
}) => {
  // Render input value based on the current amount state
  const renderInputValue = (id: string) => {
    if (currentSingleAmount !== undefined) return currentSingleAmount;
    if (currentAmounts) return currentAmounts[id] || "";
    return "";
  };

  return (
    <div
      onWheel={(e) => e.stopPropagation()}
      className="border-b-1 border-l-1 border-r-1 z-10 max-h-[200px] overflow-y-auto rounded-b-lg border border-t-0 border-borderPrimary bg-background scrollbar-thin dark:border-borderDark"
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
                    value={renderInputValue(result.ingredientId as string)}
                    onChange={(e) => {
                      if (onAmountChange && (result.ingredientId as string)) {
                        onAmountChange(
                          e.target.value,
                          result.ingredientId as string,
                        );
                      } else {
                        if (onSingleAmountChange) {
                          onSingleAmountChange(e);
                        }
                      }
                    }}
                    className="h-8 w-[80px] flex-1 rounded-lg border border-borderPrimary px-2 py-[3px] text-sm font-normal outline-none md:w-[100px]"
                  />
                  <span className="font-normal">{result.unit}.</span>
                </div>
              </div>

              {/* Accept and delete button */}
              <div className="ml-auto flex items-center gap-3">
                <span
                  onClick={() => {
                    if (handleAcceptByResultId && result.ingredientId) {
                      onAccept(result.ingredientId);
                    } else {
                      onAccept("");
                    }
                  }}
                  className={`flex ${onDelete ? "size-5" : "size-6"} cursor-pointer items-center justify-center rounded-full bg-primary`}
                >
                  <MdDownloadDone className="text-md text-black" />
                </span>
                {onDelete && (
                  <span onClick={onDelete}>
                    <MdDelete className="cursor-pointer text-xl text-red-500" />
                  </span>
                )}
              </div>
            </div>

            {/* Nutrition information */}
            <div className="mt-2 grid grid-cols-2 gap-1 text-xs md:flex md:gap-2">
              <span className="rounded-full bg-backgroundSecondary px-3 py-1 dark:bg-backgroundDark">
                {t("calories")}: {result.calories} kcal
              </span>
              <span className="rounded-full bg-backgroundSecondary px-3 py-1 dark:bg-backgroundDark">
                {t("protein")}: {result.protein}g.
              </span>
              <span className="rounded-full bg-backgroundSecondary px-3 py-1 dark:bg-backgroundDark">
                {t("fat")}: {result.fat}g.
              </span>
              <span className="rounded-full bg-backgroundSecondary px-3 py-1 dark:bg-backgroundDark">
                {t("carbs")}: {result.carbs}g.
              </span>
            </div>

            {infoForSearchIngredient && (
              <p className="gap-1 rounded-lg bg-primaryLight p-2 text-center text-[13px] text-black">
                {t("lastInfoForSearchIngredient")}
              </p>
            )}
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center px-4 py-6 text-sm">
          <p className="font-medium">{t("noIngredientsFound")}</p>
          <p>{t("noIngredietnsFoundDescription")}</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsDisplay;
