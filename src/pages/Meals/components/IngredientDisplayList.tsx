import { capitalizeFirstLetter, formatNumber } from "@/utils/helper";
import { IngredientsForMealModal } from "@/utils/types";
import { TFunction } from "i18next";
import React from "react";
import { FaRegCircleDot } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

interface IngredientDisplayListProps {
  ingredients: IngredientsForMealModal[];
  setIngredients: React.Dispatch<
    React.SetStateAction<IngredientsForMealModal[]>
  >;
  t: TFunction;
}

const IngredientDisplayList: React.FC<IngredientDisplayListProps> = ({
  ingredients,
  setIngredients,
  t,
}) => {
  return (
    <>
      {ingredients.length !== 0 && (
        <div className="flex flex-col gap-2 text-sm">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex w-full items-center gap-4">
              <FaRegCircleDot className="text-xs text-textPrimary" />
              <div className="flex w-full flex-col gap-2 py-1 text-textSecondary">
                {/*  */}
                <div className="flex w-full items-center gap-2">
                  <span className="flex items-center gap-3 font-medium text-textPrimary">
                    {capitalizeFirstLetter(ingredient.title)}
                  </span>
                  <span className="text-textPrimary">
                    {ingredient.currentAmount}
                    {ingredient.unit}
                  </span>
                  <span className="text-textPrimary">
                    ({formatNumber(ingredient.calories)} kcal)
                  </span>

                  <MdDelete
                    onClick={() =>
                      setIngredients((prev) =>
                        prev.filter((_, i) => i !== index),
                      )
                    }
                    className="ml-auto flex cursor-pointer text-xl text-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-1 text-xs text-textPrimary md:flex md:gap-2">
                  {(["protein", "carbs", "fat"] as const).map((key) => (
                    <span
                      key={key}
                      className="rounded-full bg-backgroundSecondary px-3 py-1 dark:bg-backgroundSecondary"
                    >
                      {t(key)}: {ingredient[key]}g.
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default IngredientDisplayList;
