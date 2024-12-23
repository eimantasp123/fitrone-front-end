import CustomButton from "@/components/common/CustomButton";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import {
  deleteIngredient,
  getIngredients,
  setCurrentPage,
  setSearchQuery,
} from "@/services/reduxSlices/Ingredients/ingredientsDetailsSlice";
import { getMeals } from "@/services/reduxSlices/Meals/mealDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { capitalizeFirstLetter } from "@/utils/helper";
import { IngredientForOnce } from "@/utils/types";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import AddIngredientManualModal from "../Meals/components/IngredientManualAddModal";

interface IngredientCardProps {
  ingredient: IngredientForOnce;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient }) => {
  const { t } = useTranslation("meals");
  const {
    onOpen: onOpenIngredientModal,
    onClose: onCloseIngredientModal,
    isOpen: isOpenIngredientModal,
  } = useDisclosure();
  const {
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
    isOpen: deleteModalOpen,
  } = useDisclosure();
  const dispatch = useAppDispatch();
  const {
    ingredients,
    filteredIngredients,
    searchQuery,
    currentPage,
    loading,
  } = useAppSelector((state) => state.ingredientsDetails);
  const { limit } = useAppSelector((state) => state.mealsDetails);
  const { title, calories, unit, amount, ingredientId } = ingredient;

  // Determine the data to display (filtered or all ingredients)
  const displayedIngredients =
    filteredIngredients && searchQuery ? filteredIngredients : ingredients;

  // Delete ingredient function
  const handleDelete = async () => {
    await dispatch(deleteIngredient({ ingredientId })).unwrap();

    // If the ingredient is the only one on the page and no search query, go back one page
    if (displayedIngredients[currentPage].length === 1 && !searchQuery) {
      const pages = currentPage !== 1 ? currentPage - 1 : currentPage;
      await dispatch(getIngredients()).unwrap();
      dispatch(setCurrentPage(pages));

      // If there are more ingredients on the page, just fetch the current page
    } else if (displayedIngredients[currentPage].length === 1 && searchQuery) {
      await dispatch(getIngredients()).unwrap();
      dispatch(setSearchQuery(""));
    } else {
      // If there are more ingredients on the page, just fetch the current page
      await dispatch(getIngredients()).unwrap();
      dispatch(setSearchQuery(searchQuery));
    }

    // Close the modal
    onCloseDeleteModal();

    // Refetch meals to update the ingredients
    await dispatch(
      getMeals({
        page: 1,
        limit,
        category: null,
        preference: null,
        restriction: null,
      }),
    );
  };

  // Add logging to confirm state changes
  const handleCloseDeleteModal = () => {
    onCloseDeleteModal();
  };

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
              onClick={onOpenDeleteModal}
              type="delete"
              textLight={true}
              widthFull={true}
            />
            <CustomButton
              text={t("editAndView")}
              onClick={onOpenIngredientModal}
              textLight={true}
              widthFull={true}
            />
          </div>
        </div>
      </div>

      {/* Delete confirm */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        loading={loading}
        handleDelete={handleDelete}
        title={t("deleteIngredientTitle")}
        description={t("deleteIngredientDescription")}
        cancelButtonText={t("cancel")}
        confirmButtonText={t("deleteIngredientTitle")}
      />

      {/* Edit ingredient */}
      {isOpenIngredientModal && (
        <AddIngredientManualModal
          isOpen={isOpenIngredientModal}
          onClose={onCloseIngredientModal}
          editIngredient={ingredient}
        />
      )}
    </>
  );
};

export default IngredientCard;
