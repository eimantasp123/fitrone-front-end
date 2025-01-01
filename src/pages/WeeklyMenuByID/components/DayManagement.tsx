import CustomButton from "@/components/common/CustomButton";
import InfoCard from "@/pages/MealPlan/components/client/InfoCard";
import { Day, Meal, MealAssignment } from "@/utils/types";
import { useDisclosure } from "@chakra-ui/react";
import { TFunction } from "i18next";
import React, { useState } from "react";
import { MdOutlinePostAdd } from "react-icons/md";
import AssignMealForCurrentDay from "../modals/AssignMealForCurrentDay";
import SingleDay from "./SingleDay";
import MealAddModal from "@/pages/Meals/MealAddModal";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteMealFromCurrentDay } from "@/services/reduxSlices/WeeklyMenuById/weeklyMenuByIdSlice";
import useFiltersOptions from "@/hooks/useFiltersOptions";

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

const DayManagement: React.FC<DayManagementProps> = ({ data, t }) => {
  const { id } = useParams<{ id: string }>();
  const { meals, _id: dayId, nutrition } = data;
  const [mealToEdit, setMealToEdit] = useState<Meal | null>(null);
  const [deleteMealLoading, setDeleteMealLoading] = useState<boolean>(false);
  const [mealToDelete, setMealToDelete] = useState<string | null>(null);
  const { categoriesTranslated } = useFiltersOptions();
  const dispatch = useAppDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isMealAddModalOpen,
    onClose: onMealAddModalClose,
    onOpen: onMealAddModalOpen,
  } = useDisclosure();
  const {
    isOpen: isDeleteMealModalOpen,
    onClose: onDeleteMealModalClose,
    onOpen: onDeleteMealModalOpen,
  } = useDisclosure();

  // Get meal data
  const handleEditMeal = (meal: Meal) => {
    setMealToEdit(meal);
    onMealAddModalOpen();
  };

  // Open delete meal modal and set meal id
  const openDeleteMealModal = (mealId: string) => {
    setMealToDelete(mealId);
    onDeleteMealModalOpen();
  };

  // Delete meal
  const handleMealDelete = async () => {
    if (!id) return;
    setDeleteMealLoading(true);
    const result = await dispatch(
      deleteMealFromCurrentDay({
        mealId: mealToDelete,
        dayId,
        weeklyMenuId: id,
      }),
    );
    if (deleteMealFromCurrentDay.fulfilled.match(result)) {
      setMealToDelete(null);
      onDeleteMealModalClose();
    }
    setDeleteMealLoading(false);
  };

  // Close delete meal modal
  const closeDeleteMealModal = () => {
    setMealToDelete(null);
    onDeleteMealModalClose();
  };

  // Group meals by category
  const groupedMeals = meals.reduce(
    (acc, meal) => {
      if (!acc[meal.category]) {
        acc[meal.category] = [];
      }
      acc[meal.category].push(meal);
      return acc;
    },
    {} as Record<string, MealAssignment[]>,
  );

  // Sort categories by predefined order
  const sortedCategories = categoryOrder
    .filter((category) => groupedMeals[category])
    .map(
      (category) =>
        [category, groupedMeals[category]] as [string, typeof meals],
    );

  return (
    <>
      <div className="h-full w-full">
        {meals.length === 0 ? (
          <div className="flex h-full flex-col items-center gap-1 rounded-lg border-[1.5px] border-dashed border-primary bg-primaryLighter px-4 pt-20 text-center">
            <MdOutlinePostAdd className="text-3xl" />
            <h4 className="font-semibold">{t("noMealsAssignedTitle")}</h4>
            <p className="pb-4 text-sm">{t("noMealsAssignedDescription")}</p>
            <CustomButton onClick={onOpen} text={`+ ${t("assignMeals")}`} />
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
              onClick={onOpen}
              text={`+ ${t("assignMeals")}`}
            />
            <div className="h-fit">
              {sortedCategories.map(([category, meals]) => (
                <div key={category} className="mb-4">
                  {/* Category Title */}
                  <h2 className="mb-2 text-[15px] font-semibold">
                    {categoriesTranslated[category] || "Unknown Category"}
                  </h2>
                  <div className="grid gap-3">
                    {/* Meals for this Category */}
                    {meals.map((object) => (
                      <SingleDay
                        key={object._id}
                        meal={object.meal}
                        t={t}
                        onEditMeal={handleEditMeal}
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
      {id && dayId && (
        <AssignMealForCurrentDay
          weeklyMenuId={id}
          dayId={dayId}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}

      {/* Edit meal modal */}
      <MealAddModal
        isOpenModal={isMealAddModalOpen}
        onClose={onMealAddModalClose}
        mealToEdit={mealToEdit}
      />

      {/* Delete meal from current day modal */}
      <ConfirmActionModal
        isOpen={isDeleteMealModalOpen}
        onClose={closeDeleteMealModal}
        onAction={handleMealDelete}
        loading={deleteMealLoading}
        loadingSpinner={false}
        title={t("common:removeMeal")}
        description={t("removeMealFromDay")}
        confirmButtonText={t("common:remove")}
        cancelButtonText={t("common:cancel")}
      />
    </>
  );
};

export default DayManagement;
