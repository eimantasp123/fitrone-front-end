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
      <div className="grid-col-8 grid-auto grid items-center gap-3 rounded-lg border border-neutral-200/50 bg-backgroundSecondary p-2 dark:border-neutral-800 dark:bg-background md:p-3 xl:gap-2">
        {/* Meal Image */}
        <div
          style={{
            backgroundImage: `url(${encodeURI(meal.image)})`,
          }}
          className="col-span-1 row-start-1 row-end-2 h-12 w-16 flex-shrink-0 overflow-hidden rounded-md bg-cover bg-center 2xl:row-end-3"
        />
        <div className="col-span-7 row-start-1 row-end-2 flex w-full flex-col gap-1">
          <div className="flex flex-1 items-start justify-between gap-2">
            <p className="w-[90%] text-sm font-medium">
              {capitalizeFirstLetter(meal?.title)}
            </p>
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
        <div className="col-span-8 mr-1 flex gap-2 2xl:col-span-6 2xl:col-start-2 2xl:row-start-2">
          {meal && <DescriptionAndNutritionPopover t={t} meal={meal} />}
        </div>
      </div>
    </>
  );
};

export default SingleDayMealObject;
