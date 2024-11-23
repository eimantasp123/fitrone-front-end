import RedButton from "@/components/common/RedButton";
import TextButton from "@/components/common/TextButton";
import { deleteMeal } from "@/services/reduxSlices/Meals/mealDetailsSlice";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddMealModal from "./AddMealModal";

export const MealCard = ({ meal }) => {
  const { t } = useTranslation("meals");
  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
    isOpen: deleteModalOpen,
  } = useDisclosure();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.mealsDetails);
  const { title, _id: id, nutrition, preferences, restrictions } = meal;
  const { calories, protein, carbs, fat } = nutrition;

  const handleDelete = async () => {
    try {
      await dispatch(deleteMeal(id)).unwrap();
      onCloseDeleteModal();
    } catch {
      //
    }
  };

  return (
    <>
      <div className="flex w-full flex-col gap-2 overflow-hidden rounded-lg bg-background p-2 shadow-custom-light2 dark:bg-backgroundSecondary sm:flex-row">
        {/* Left side  */}
        <div
          style={{ backgroundImage: "url('/food.jpg')" }}
          className="relative h-40 w-full overflow-hidden rounded-lg bg-cover bg-center sm:h-full sm:w-[35%]"
        />

        {/* Right side  */}
        <div className="p-1 sm:w-[65%]">
          <div className="flex justify-between gap-1 border-b-[1px] px-3 py-1">
            {/*  */}
            <div className="w-full flex-1 text-start">
              <h2 className="text-[16px] font-medium text-textPrimary">
                {title}
              </h2>
            </div>
            <div className="flex w-[25%] items-start justify-end">
              <p className="rounded-full text-sm font-semibold text-textPrimary">
                {calories} Kcal
              </p>
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

          {/* Preferences */}
          <div className="flex w-full flex-wrap items-center gap-2 border-b-[1px] px-3 py-2 text-xs">
            <p className="text-nowrap font-medium dark:text-neutral-200">
              {t("preferencesTitle")}:
            </p>
            <div className="flex flex-wrap gap-2">
              {preferences.length > 0 ? (
                preferences.map((preference, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-backgroundSecondary px-[10px] py-[2px] text-textPrimary dark:bg-backgroundLight"
                  >
                    {preference}
                  </span>
                ))
              ) : (
                <span className="rounded-full bg-backgroundSecondary px-[10px] py-[2px] text-textPrimary dark:bg-backgroundLight">
                  {t("noPreferences")}
                </span>
              )}
            </div>
          </div>

          {/* Preferences */}
          <div className="flex w-full flex-wrap items-center gap-2 border-b-[1px] px-3 py-2 text-xs">
            <p className="text-nowrap font-medium dark:text-neutral-200">
              {t("restrictionsTitle")}:
            </p>
            <div className="flex flex-wrap gap-2">
              {restrictions.length > 0 ? (
                restrictions.map((preference, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-backgroundSecondary px-[10px] py-[2px] text-textPrimary dark:bg-backgroundLight"
                  >
                    {preference}
                  </span>
                ))
              ) : (
                <span className="rounded-full bg-backgroundSecondary px-[10px] py-[2px] text-textPrimary dark:bg-backgroundLight">
                  {t("noRestrictions")}
                </span>
              )}
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex gap-2 border-t-[1px] pb-1 pt-3">
            <button
              onClick={onOpenDeleteModal}
              className="flex-1 rounded-md px-6 py-[6px] text-sm text-red-600 transition-colors duration-200 ease-in-out hover:bg-red-50 dark:hover:bg-red-700/20"
            >
              {t("delete")}
            </button>
            <button
              onClick={onOpen}
              className="flex-1 rounded-md bg-primary px-6 py-[6px] text-sm text-black transition-colors duration-200 ease-in-out hover:bg-primaryLight dark:hover:bg-primaryDark"
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
          <h2 className="p-2 font-medium">{t("deleteMealTitle")}</h2>
          <ModalCloseButton marginTop="2" />
          <ModalBody sx={{ padding: "1rem" }}>
            <p className="mb-4 pl-1 text-sm text-textSecondary md:text-base">
              {t("deleteMealDescription")}
            </p>
            <div className="flex w-full items-center justify-between gap-3">
              <TextButton
                onClick={onCloseDeleteModal}
                className="flex-1"
                text={t("cancel")}
              />
              <RedButton
                onClick={handleDelete}
                type="button"
                updateLoading={loading}
                classname="flex-1"
                text={t("deleteMealTitle")}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Update meal */}
      <AddMealModal isOpen={isOpen} onClose={onClose} mealToEdit={meal} />
    </>
  );
};

MealCard.propTypes = {
  title: PropTypes.string,
  calories: PropTypes.number,
  protein: PropTypes.number,
  carbs: PropTypes.number,
  fats: PropTypes.number,
  onClick: PropTypes.func,
  id: PropTypes.string,
};
