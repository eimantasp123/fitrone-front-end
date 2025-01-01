import { getMealById } from "@/services/reduxSlices/WeeklyMenuById/weeklyMenuByIdSlice";
import { useAppDispatch } from "@/store";
import { capitalizeFirstLetter } from "@/utils/helper";
import { Meal, MealForCurrentDay } from "@/utils/types";
import { Tooltip } from "@chakra-ui/react";
import { TFunction } from "i18next";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import DescriptionAndNutritionPopover from "./DescriptionAndNutritionPopover";

interface SingleDayProps {
  meal: MealForCurrentDay;
  t: TFunction;
  onEditMeal: (meal: Meal) => void;
  handleMealDelete: (mealId: string) => void;
}

const SingleDay: React.FC<SingleDayProps> = ({
  meal,
  t,
  onEditMeal,
  handleMealDelete,
}) => {
  const dispatch = useAppDispatch();

  // Handle meal modal open
  const handleMealModalOpen = async () => {
    const result = await dispatch(getMealById(meal._id));
    if (getMealById.fulfilled.match(result)) {
      onEditMeal(result.payload);
    }
  };

  return (
    <>
      <div className="flex h-full items-center gap-3 rounded-lg border border-neutral-200/50 bg-backgroundSecondary p-1 shadow-custom-light4 dark:border-neutral-800 dark:bg-background">
        {/* Meal Image */}
        <div
          style={{
            backgroundImage: `url(${meal?.image})`,
          }}
          className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-md bg-cover bg-center"
        />
        <div className="flex flex-1 flex-col items-start gap-2">
          <p className="text-sm font-semibold">
            {capitalizeFirstLetter(meal?.title)}
          </p>
          {/* Description and Nutrition information popover */}
          {meal && <DescriptionAndNutritionPopover t={t} meal={meal} />}
        </div>

        <div className="mr-1 mt-1 flex h-full flex-col justify-center gap-2">
          <Tooltip
            label={t("common:removeMeal")}
            aria-label={t("common:removeMeal")}
          >
            <button
              onClick={() => handleMealDelete(meal._id)}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-xs text-red-500 transition-colors duration-200 ease-in-out hover:bg-neutral-200 dark:hover:bg-neutral-300/20"
            >
              <FaTrash />
            </button>
          </Tooltip>
          <Tooltip
            label={t("common:editMeal")}
            aria-label={t("common:editMeal")}
          >
            <button
              onClick={handleMealModalOpen}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-sm text-textPrimary transition-colors duration-200 ease-in-out hover:bg-neutral-200 dark:hover:bg-neutral-300/20"
            >
              <AiFillEdit />
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default SingleDay;
