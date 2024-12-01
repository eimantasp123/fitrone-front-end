import RedButton from "@/components/common/RedButton";
import TextButton from "@/components/common/TextButton";
import {
  deleteIngredient,
  getIngredients,
  searchIngredients,
  setCurrentPage,
} from "@/services/reduxSlices/Ingredients/ingredientsDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { capitalizeFirstLetter } from "@/utils/helper";
import { IngredientForOnce } from "@/utils/types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import AddIngredientManualModal from "../Meals/AddIngredientManualModal";
import { getMeals } from "@/services/reduxSlices/Meals/mealDetailsSlice";

interface IngredientCardProps {
  ingredient: IngredientForOnce;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient }) => {
  const { t } = useTranslation("meals");
  // const {
  //   onOpen: onOpenIngredientModal,
  //   onClose: onCloseIngredientModal,
  //   isOpen: isOpenIngredientModal,
  // } = useDisclosure();
  const {
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
    isOpen: deleteModalOpen,
  } = useDisclosure();
  const dispatch = useAppDispatch();
  const { ingredients, currentPage, searchQuery, limit, loading } =
    useAppSelector((state) => state.ingredientsDetails);
  const { title, calories, protein, carbs, fat, unit, amount, ingredientId } =
    ingredient;

  // Delete ingredient function
  const handleDelete = async () => {
    await dispatch(deleteIngredient({ ingredientId })).unwrap();
    if (ingredients[currentPage].length === 1 && searchQuery === "") {
      const pages = currentPage !== 1 ? currentPage - 1 : currentPage;
      await dispatch(
        getIngredients({
          page: pages,
          limit: limit,
        }),
      ).unwrap();
      dispatch(setCurrentPage(pages));
    } else if (ingredients[currentPage].length === 1 && searchQuery !== "") {
      await dispatch(searchIngredients({ query: searchQuery })).unwrap();
    } else {
      await dispatch(
        getIngredients({
          page: currentPage,
          limit: limit,
        }),
      ).unwrap();
    }

    onCloseDeleteModal();

    await dispatch(
      getMeals({
        page: 1,
        category: null,
        preference: null,
        restriction: null,
      }),
    );
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
              <div className="flex justify-center gap-2">
                <p className="font-medium">{t("carbs")}:</p>
                <p className="text-textPrimary">{carbs}g</p>
              </div>

              <div className="flex justify-center gap-2">
                <p className="font-medium">{t("protein")}:</p>
                <p className="text-textPrimary">{protein}g</p>
              </div>

              <div className="flex justify-center gap-2">
                <p className="font-medium">{t("fat")}:</p>
                <p className="text-textPrimary">{fat}g</p>
              </div>
            </div>
          </div>
          {/* Call to action buttons */}
          <div className="mt-auto flex items-start gap-2 pt-2">
            <button
              onClick={onOpenDeleteModal}
              className="flex-1 rounded-md py-[6px] text-sm text-red-600 transition-colors duration-200 ease-in-out hover:bg-red-50 dark:hover:bg-red-700/20"
            >
              {t("delete")}
            </button>
            <button
              // onClick={onOpenIngredientModal}
              className="flex-1 rounded-md bg-primary py-[6px] text-sm text-black transition-colors duration-200 ease-in-out hover:bg-primaryLight dark:hover:bg-primaryDark"
            >
              {t("editAndView")}
            </button>
          </div>
        </div>
      </div>
      {/* Delete confirm */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={onCloseDeleteModal}
        isCentered
        size={{ base: "xs", md: "lg" }}
      >
        <ModalOverlay />
        <ModalContent sx={{ padding: "1em", borderRadius: "0.75rem" }}>
          <h2 className="p-1 font-medium">{t("deleteIngredientTitle")}</h2>
          <ModalCloseButton marginTop="2" />
          <ModalBody sx={{ padding: "4px" }}>
            <p className="mb-4 pl-1 text-sm text-textSecondary md:text-base">
              {t("deleteIngredientDescription")}
            </p>
            <div className="flex w-full items-center justify-between gap-3">
              <TextButton
                onClick={() => onCloseDeleteModal()}
                className="flex-1"
                text={t("cancel")}
              />
              <RedButton
                onClick={() => handleDelete()}
                type="button"
                updateLoading={loading}
                classname="flex-1"
                text={t("deleteIngredientTitle")}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Edit ingredient */}
      {/* <AddIngredientManualModal
        isOpen={isOpenIngredientModal}
        onClose={onCloseIngredientModal}
        editIngredient={ingredient}
      /> */}
    </>
  );
};

export default IngredientCard;
