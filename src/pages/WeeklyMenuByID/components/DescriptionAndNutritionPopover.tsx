import { capitalizeFirstLetter } from "@/utils/helper";
import { MealForCurrentDay } from "@/utils/types";
import {
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { TFunction } from "i18next";
import React from "react";

interface DescriptionAndNutritionPopoverProps {
  t: TFunction;
  meal: MealForCurrentDay;
}

const DescriptionAndNutritionPopover: React.FC<
  DescriptionAndNutritionPopoverProps
> = ({ t, meal }) => {
  return (
    <div className="flex flex-wrap gap-1 md:gap-2 3xl:flex-nowrap">
      <Popover placement="top-start">
        <PopoverTrigger>
          <button className="cursor-pointer text-nowrap rounded-full bg-background px-3 py-[3px] text-xs transition-opacity duration-200 ease-in-out hover:opacity-80 dark:bg-backgroundSecondary">
            {t("common:description")}
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">
            {t("common:description")}
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <p className="text-[13px]">
              {meal.description || t("common:noDescription")}
            </p>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Popover placement="top-start">
        <PopoverTrigger>
          <button className="cursor-pointer text-nowrap rounded-full bg-background px-3 py-[3px] text-xs transition-opacity duration-200 ease-in-out hover:opacity-80 dark:bg-backgroundSecondary">
            {t("common:nutrition")}
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">
            {t("common:nutrition")}
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <div className="flex flex-col gap-1 text-[13px]">
              {["calories", "carbs", "fat", "protein"].map((key) => (
                <span key={key}>
                  {t(`common:${key}`)} -{" "}
                  {meal.nutrition[key as keyof typeof meal.nutrition]}{" "}
                  {key === "calories" ? "kcal" : "g."}
                </span>
              ))}
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      {/*  */}
      <Popover placement="top-start">
        <PopoverTrigger>
          <button className="cursor-pointer text-nowrap rounded-full bg-background px-3 py-[3px] text-xs transition-opacity duration-200 ease-in-out hover:opacity-80 dark:bg-backgroundSecondary">
            {t("common:ingredients")}
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">
            {t("common:ingredients")}
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <div className="flex flex-col gap-1 text-[13px]">
              {meal.ingredients.map((ingredient) => (
                <span key={ingredient.ingredientId}>
                  {capitalizeFirstLetter(ingredient.title)} -{" "}
                  {ingredient.currentAmount} {ingredient?.unit || "g."}
                </span>
              ))}
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DescriptionAndNutritionPopover;
