import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import CustomButton from "@/components/common/CustomButton";
import { useDynamicDisclosure } from "@/hooks/useDynamicDisclosure";
import useFiltersOptions from "@/hooks/useFiltersOptions";
import { useDeleteMealFromCurrentDay } from "@/hooks/WeeklyMenuById/useDeleteMealFromCurrentDay";
import InfoCard from "@/pages/MealPlan/components/client/InfoCard";
import { Day, MealAssignment } from "@/utils/types";
import { TFunction } from "i18next";
import React, { useCallback, useMemo, useState } from "react";
import { MdOutlinePostAdd } from "react-icons/md";
import { useParams } from "react-router-dom";
import AssignMealForCurrentDayModal from "./AssignMealForCurrentDayModal";
import SingleDay from "./SingleDay";

// Category order
const categoryOrder = [
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "drink",
  "dessert",
  "other",
];

interface DayManagementProps {
  data: Day;
  t: TFunction;
}

/**
 * Day management component for weekly menu by id page
 */
const DayManagement: React.FC<DayManagementProps> = React.memo(
  ({ data, t }) => {
    const { id } = useParams<{ id: string }>();
    const { meals, _id: dayId, nutrition } = data;
    const [mealToDelete, setMealToDelete] = useState<string>("");
    const { categoriesTranslated } = useFiltersOptions();
    const { isOpen, openModal, closeModal } = useDynamicDisclosure();
    const { mutate: deleteMealFromDay, isPending } =
      useDeleteMealFromCurrentDay(() => closeDeleteMealModal());

    // Open delete meal modal and set meal id
    const openDeleteMealModal = useCallback(
      (mealId: string) => {
        setMealToDelete(mealId);
        openModal("deleteMeal");
      },
      [openModal],
    );

    // Close delete meal modal
    const closeDeleteMealModal = useCallback(() => {
      setMealToDelete("");
      closeModal("deleteMeal");
    }, [closeModal]);

    // Delete meal
    const handleMealDelete = useCallback(() => {
      if (!id) return;
      deleteMealFromDay({ mealId: mealToDelete, dayId, weeklyMenuId: id });
    }, [id, mealToDelete, dayId, deleteMealFromDay]);

    // Group meals by category
    const groupedMeals = useMemo(() => {
      return meals.reduce(
        (acc, meal) => {
          if (!acc[meal.category]) {
            acc[meal.category] = [];
          }
          acc[meal.category].push(meal);
          return acc;
        },
        {} as Record<string, MealAssignment[]>,
      );
    }, [meals]);

    // Sort categories by predefined order
    const sortedCategories = useMemo(() => {
      return categoryOrder
        .filter((category) => groupedMeals[category])
        .map(
          (category) =>
            [category, groupedMeals[category]] as [string, typeof meals],
        );
    }, [groupedMeals]);

    return (
      <>
        <div className="h-full w-full">
          {meals.length === 0 ? (
            <div className="flex h-full flex-col items-center gap-1 rounded-lg border-[1.5px] border-dashed border-primary bg-primaryLighter px-4 pt-20 text-center">
              <MdOutlinePostAdd className="text-3xl" />
              <h4 className="font-semibold">{t("noMealsAssignedTitle")}</h4>
              <p className="pb-4 text-sm">{t("noMealsAssignedDescription")}</p>
              <CustomButton
                onClick={() => openModal("assignMeals")}
                text={`+ ${t("assignMeals")}`}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                {["calories", "protein", "fat", "carbs"].map((key) => (
                  <InfoCard
                    key={key}
                    className="bg-backgroundSecondary px-5 py-2 dark:bg-background"
                    value={nutrition[key as keyof typeof nutrition]}
                    title={t(`common:${key}`)}
                    unit={key === "calories" ? "kcal" : "g."}
                  />
                ))}
              </div>
              <CustomButton
                paddingY="py-2"
                widthFull={true}
                onClick={() => openModal("assignMeals")}
                text={`+ ${t("assignMeals")}`}
              />
              <div className="h-fit">
                {sortedCategories.map(([category, meals]) => (
                  <div key={category} className="mb-4">
                    {/* Category Title */}
                    <h2 className="mb-2 text-sm font-semibold">
                      {categoriesTranslated[category] || "Unknown Category"}
                    </h2>
                    <div className="grid gap-3">
                      {/* Meals for this Category */}
                      {meals.map((object) => (
                        <SingleDay
                          key={object._id}
                          meal={object.meal}
                          t={t}
                          handleMealDelete={openDeleteMealModal}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Assign meal for current day modal */}
        {id && dayId && isOpen("assignMeals") && (
          <AssignMealForCurrentDayModal
            weeklyMenuId={id}
            dayId={dayId}
            isOpen={isOpen("assignMeals")}
            onClose={() => closeModal("assignMeals")}
          />
        )}

        {/* Delete meal from current day modal */}
        {isOpen("deleteMeal") && (
          <ConfirmActionModal
            isOpen={isOpen("deleteMeal")}
            onClose={closeDeleteMealModal}
            onAction={handleMealDelete}
            loading={isPending}
            loadingSpinner={false}
            title={t("common:removeMeal")}
            description={t("removeMealFromDay")}
            confirmButtonText={t("common:remove")}
            cancelButtonText={t("common:cancel")}
          />
        )}
      </>
    );
  },
);

DayManagement.displayName = "DayManagement";

export default DayManagement;
