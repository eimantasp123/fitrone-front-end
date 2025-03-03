import { capitalizeFirstLetter } from "@/utils/helper";
import { MealForCurrentDay } from "@/utils/types";
import { Tooltip } from "@chakra-ui/react";
import { TFunction } from "i18next";
import React from "react";
import { FaTrash } from "react-icons/fa";
import DescriptionAndNutritionPopover from "./DescriptionAndNutritionPopover";

interface SingleDayMealObjectProps {
  meal: MealForCurrentDay;
  t: TFunction;
  handleMealDelete: () => void;
}

/**
 * Single day component for weekly menu by id page
 */
const SingleDayMealObject: React.FC<SingleDayMealObjectProps> = ({
  meal,
  t,
  handleMealDelete,
}) => {
  return (
    <>
      <div className="flex h-full items-center gap-3 rounded-lg border border-neutral-200/50 bg-backgroundSecondary p-1 dark:border-neutral-800 dark:bg-background">
        {/* Meal Image */}
        <div
          style={{
            backgroundImage: `url(${meal?.image})`,
          }}
          className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-md bg-cover bg-center"
        />
        <div className="flex flex-1 flex-col items-start gap-2">
          <p className="text-sm font-medium">
            {capitalizeFirstLetter(meal?.title)}
          </p>
          {/* Description and Nutrition information popover */}
          {meal && <DescriptionAndNutritionPopover t={t} meal={meal} />}
        </div>

        <div className="mr-1 flex h-full flex-col justify-center gap-2">
          <Tooltip
            label={t("common:removeMeal")}
            aria-label={t("common:removeMeal")}
          >
            <button
              onClick={() => handleMealDelete()}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-xs text-red-500 transition-colors duration-200 ease-in-out hover:bg-neutral-200 dark:hover:bg-neutral-300/20"
            >
              <FaTrash />
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default SingleDayMealObject;
