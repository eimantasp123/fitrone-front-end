import CustomButton from "@/components/common/CustomButton";
import useFiltersOptions from "@/hooks/useFiltersOptions";
import { capitalizeFirstLetter } from "@/utils/helper";
import { Meal } from "@/utils/types";
import React from "react";
import { useTranslation } from "react-i18next";
import RestAndPrefDetailsPopover from "../../../components/common/RestAndPrefDetailsPopover";

// Meal card component props interface
interface MealOverviewCardProps {
  meal: Meal;
  setModalState: React.Dispatch<
    React.SetStateAction<{ type: "create" | "edit" | null; meal: Meal | null }>
  >;
  openDeleteModal: (mealId: string) => void;
}

/**
 * Meal Overview Card Component to display the meal details
 */
const MealOverviewCard: React.FC<MealOverviewCardProps> = ({
  meal,
  setModalState,
  openDeleteModal,
}) => {
  const { t } = useTranslation("meals");
  const { categories } = useFiltersOptions();
  const { title, _id: id, nutrition, preferences, restrictions } = meal;

  console.log("mealImage", meal.image);

  return (
    <>
      <div className="flex h-full w-full flex-col gap-2 overflow-hidden rounded-lg bg-background p-2 shadow-custom-light2 dark:bg-backgroundSecondary sm:flex-row">
        {/* Left side  */}
        <div
          style={{ backgroundImage: `url(${meal.image})` }}
          className="relative h-40 w-full overflow-hidden rounded-lg bg-cover bg-center sm:h-full sm:w-[35%]"
        />

        {/* Right side  */}
        <div className="flex flex-col p-1 sm:w-[65%]">
          <div className="flex flex-col">
            <div className="flex justify-between gap-4 border-b-[1px] px-3 py-1">
              {/*  */}
              <div className="w-[85%] flex-1 text-start">
                <h2 className="text-[16px] font-medium text-textPrimary">
                  {capitalizeFirstLetter(title)}
                </h2>
              </div>
              <div className="flex w-[15%] items-start justify-end">
                <p className="text-nowrap rounded-full text-sm font-semibold text-textPrimary">
                  {nutrition.calories} Kcal
                </p>
              </div>
            </div>

            {/* Nutrition details */}
            <div className="flex w-full gap-3 border-b-[1px] px-3 py-2 text-xs md:gap-5">
              {(["carbs", "protein", "fat"] as const).map((key) => (
                <div key={key} className="flex justify-center gap-2">
                  <p className="font-medium">{t(key)}:</p>
                  <p className="text-textPrimary">{nutrition[key]}g</p>
                </div>
              ))}
            </div>

            {/* Preferences and restrictions */}
            <div className="flex w-full gap-2 px-3 py-2 text-xs">
              <RestAndPrefDetailsPopover
                {...{
                  preferences,
                  restrictions,
                }}
              />
            </div>

            {/* Ctegory */}
            <div className="flex w-full flex-wrap items-center gap-2 border-b-[1px] px-3 py-2 text-xs">
              <p className="text-nowrap font-medium dark:text-neutral-200">
                {t("mealCategory")}:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-backgroundSecondary px-[10px] py-[2px] text-textPrimary dark:bg-backgroundLight">
                  {categories.find((item) => item.key === meal.category)?.title}
                </span>
              </div>
            </div>
          </div>
          {/* Call to action buttons */}
          <div className="mt-auto flex items-start gap-2 py-2">
            <CustomButton
              text={t("delete")}
              onClick={() => openDeleteModal(id)}
              textLight={true}
              widthFull={true}
              type="delete"
            />
            <CustomButton
              text={t("editAndView")}
              onClick={() => setModalState({ type: "edit", meal })}
              textLight={true}
              widthFull={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MealOverviewCard;
