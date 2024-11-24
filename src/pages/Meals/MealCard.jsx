import RedButton from "@/components/common/RedButton";
import TextButton from "@/components/common/TextButton";
import {
  deleteMeal,
  getMeals,
  setCurrentPage,
  setFilters,
} from "@/services/reduxSlices/Meals/mealDetailsSlice";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
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
  const { loading, currentPage, filters, meals } = useSelector(
    (state) => state.mealsDetails,
  );
  const { title, _id: id, nutrition, preferences, restrictions } = meal;
  const { calories, protein, carbs, fat } = nutrition;

  const handleDelete = async () => {
    try {
      await dispatch(deleteMeal(id)).unwrap();
      // Check if the current page is now empty
      const remainingMeals = meals[currentPage]?.filter(
        (meal) => meal._id !== id,
      );

      // Check if the current page is now empty
      if (remainingMeals?.length === 0 && currentPage > 1) {
        // If the current page becomes empty, move to the previous page
        dispatch(setCurrentPage(currentPage - 1));
        dispatch(getMeals({ page: currentPage - 1, ...filters }));
      } else {
        // Otherwise, refetch the current page to update its content
        dispatch(getMeals({ page: currentPage, ...filters }));
      }
      onCloseDeleteModal();
    } catch {
      //
    }
  };

  return (
    <>
      <div className="flex h-full w-full flex-col gap-2 overflow-hidden rounded-lg bg-background p-2 shadow-custom-light2 dark:bg-backgroundSecondary sm:flex-row">
        {/* Left side  */}
        <div
          style={{ backgroundImage: "url('/food.jpg')" }}
          className="relative h-40 w-full overflow-hidden rounded-lg bg-cover bg-center sm:h-full sm:w-[35%]"
        />

        {/* Right side  */}
        <div className="flex flex-col p-1 sm:w-[65%]">
          <div className="flex flex-col">
            <div className="flex justify-between gap-4 border-b-[1px] px-3 py-1">
              {/*  */}
              <div className="w-[85%] flex-1 text-start">
                <h2 className="text-[16px] font-medium text-textPrimary">
                  {title}
                </h2>
              </div>
              <div className="flex w-[15%] items-start justify-end">
                <p className="text-nowrap rounded-full text-sm font-semibold text-textPrimary">
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

            {/* Preferences and restrictions */}
            <div className="flex w-full items-center gap-4 border-b-[1px] px-3 py-2 text-xs">
              {/* Preferences */}
              <Popover>
                <PopoverTrigger>
                  <button className="text-nowrap text-xs font-medium dark:text-neutral-200">
                    {t("preferencesTitle")}
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverCloseButton />
                  <PopoverHeader>{t("selected")}:</PopoverHeader>
                  <PopoverBody>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {preferences.length > 0 ? (
                        preferences.map((preference, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-backgroundLight px-[10px] py-[2px] text-textPrimary dark:bg-neutral-800"
                          >
                            {preference}
                          </span>
                        ))
                      ) : (
                        <span className="rounded-full bg-backgroundLight px-[10px] py-[2px] text-textPrimary dark:bg-neutral-800">
                          {t("noPreferences")}
                        </span>
                      )}
                    </div>
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              {/* Vertical line */}
              <hr className="h-[12px] w-[1px] bg-borderPrimary dark:bg-borderLight" />

              {/* Preferences */}
              <Popover>
                <PopoverTrigger>
                  <button className="text-nowrap text-xs font-medium dark:text-neutral-200">
                    {t("restrictionsTitle")}
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverCloseButton />
                  <PopoverHeader>{t("selected")}:</PopoverHeader>
                  <PopoverBody>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {restrictions.length > 0 ? (
                        restrictions.map((preference, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-backgroundLight px-[10px] py-[2px] text-textPrimary dark:bg-neutral-800"
                          >
                            {preference}
                          </span>
                        ))
                      ) : (
                        <span className="rounded-full bg-backgroundLight px-[10px] py-[2px] text-textPrimary dark:bg-neutral-800">
                          {t("noRestrictions")}
                        </span>
                      )}
                    </div>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </div>

            {/* Ctegory */}
            <div className="flex w-full flex-wrap items-center gap-2 border-b-[1px] px-3 py-2 text-xs">
              <p className="text-nowrap font-medium dark:text-neutral-200">
                {t("mealCategory")}:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-backgroundSecondary px-[10px] py-[2px] text-textPrimary dark:bg-backgroundLight">
                  {meal.category}
                </span>
              </div>
            </div>
          </div>
          {/* Call to action buttons */}
          <div className="mt-auto flex items-start gap-2 py-2">
            <button
              onClick={onOpenDeleteModal}
              className="flex-1 rounded-md py-[6px] text-sm text-red-600 transition-colors duration-200 ease-in-out hover:bg-red-50 dark:hover:bg-red-700/20"
            >
              {t("delete")}
            </button>
            <button
              onClick={onOpen}
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
          <h2 className="p-1 font-medium">{t("deleteMealTitle")}</h2>
          <ModalCloseButton marginTop="2" />
          <ModalBody sx={{ padding: "4px" }}>
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
