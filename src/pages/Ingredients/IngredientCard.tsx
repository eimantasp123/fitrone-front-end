import CustomButton from "@/components/common/CustomButton";
import { capitalizeFirstLetter } from "@/utils/helper";
import { IngredientFromServer } from "@/utils/types";
import { TFunction } from "i18next";
import React from "react";

// Ingredient card component props interface
interface IngredientCardProps {
  ingredient: IngredientFromServer;
  openDeleteModal: (ingredientId: string) => void;
  t: TFunction;
  setModalState: React.Dispatch<
    React.SetStateAction<{
      type: "create" | "edit" | null;
      ingredient: IngredientFromServer | null;
    }>
  >;
}

/**
 * Ingredient card component
 */
const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
  openDeleteModal,
  t,
  setModalState,
}) => {
  const { title, calories, unit, amount, ingredientId } = ingredient;

  return (
    <>
      <div className="flex h-full w-full flex-col gap-2 overflow-hidden rounded-lg bg-background p-2 shadow-custom-light2 dark:bg-backgroundSecondary sm:flex-row">
        {/* Right side  */}
        <div className="flex w-full flex-col p-1">
          <div className="flex flex-col">
            <div className="flex justify-between gap-4 border-b-[1px] px-3 py-1">
              {/*  */}
              <div className="w-[85%] flex-1 text-start">
                <h2 className="text-[16px] font-medium text-textPrimary">
                  {capitalizeFirstLetter(title)}
                </h2>
              </div>
              <div className="flex w-[15%] items-start justify-end gap-2">
                <p className="text-nowrap rounded-full text-sm font-semibold text-textPrimary">
                  {calories} Kcal
                </p>
              </div>
            </div>

            {/* */}
            <div className="flex w-full gap-3 border-b-[1px] px-3 py-2 text-xs md:gap-5">
              <div className="flex justify-center gap-2">
                <p className="font-medium">{t("amount")}:</p>
                <p className="text-textPrimary">{amount}</p>
              </div>

              <div className="flex justify-center gap-2">
                <p className="font-medium">{t("unit")}:</p>
                <p className="text-textPrimary">{unit}</p>
              </div>
            </div>

            {/* Nutrition details */}
            <div className="flex w-full gap-3 border-b-[1px] px-3 py-2 text-xs md:gap-5">
              {(["carbs", "protein", "fat"] as const).map((key) => (
                <div key={key} className="flex justify-center gap-2">
                  <p className="font-medium">{t(key)}:</p>
                  <p className="text-textPrimary">{ingredient[key]}g</p>
                </div>
              ))}
            </div>
          </div>
          {/* Call to action buttons */}
          <div className="mt-auto flex items-start gap-2 pt-2">
            <CustomButton
              text={t("delete")}
              onClick={() => openDeleteModal(ingredientId)}
              type="delete"
              textLight={true}
              widthFull={true}
            />
            <CustomButton
              text={t("editAndView")}
              onClick={() => setModalState({ type: "edit", ingredient })}
              textLight={true}
              widthFull={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default IngredientCard;
