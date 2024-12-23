import CustomSelect from "@/components/common/CustomSelect";
import TextButton from "@/components/common/TextButton";
import {
  getMeals,
  setFilters,
} from "@/services/reduxSlices/Meals/mealDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import MealAddModal from "./MealAddModal";

interface MealsPageHeaderProps {
  onFiltersClose?: () => void;
  dietaryPreferences: { key: string; title: string }[];
  dietaryRestrictions: { key: string; title: string }[];
  categories: { key: string; title: string }[];
}

const MealsPageHeader: React.FC<MealsPageHeaderProps> = ({
  onFiltersClose,
  dietaryPreferences,
  dietaryRestrictions,
  categories,
}) => {
  const { t } = useTranslation("meals");
  const {
    isOpen: isMealOpen,
    onClose: onMealClose,
    onOpen: onMealOpen,
  } = useDisclosure();
  const dispatch = useAppDispatch();
  const { filters, limit } = useAppSelector((state) => state.mealsDetails);

  // Handle filter selection
  const handleFilterChange = (
    filterType: string,
    option: { key: string; title: string },
  ) => {
    const updatedFilters = { ...filters, [filterType]: option };
    dispatch(setFilters(updatedFilters));
    dispatch(getMeals({ page: 1, limit, ...updatedFilters }));
    if (onFiltersClose) {
      onFiltersClose();
    }
  };

  // Handle reset filters
  const resetFilters = () => {
    const defaultFilters = {
      category: null,
      preference: null,
      restriction: null,
    };
    dispatch(setFilters(defaultFilters));
    dispatch(
      getMeals({
        page: 1,
        limit,
        category: null,
        preference: null,
        restriction: null,
      }),
    ); // Fetch meals without filters
    if (onFiltersClose) {
      onFiltersClose();
    }
  };

  return (
    <>
      <div className="z-20 flex w-full select-none flex-col gap-2 bg-background px-3 pt-5 dark:bg-backgroundSecondary md:rounded-lg md:py-2 lg:flex-row xl:gap-1 xl:py-0">
        <h4 className="flex h-auto items-center pb-2 pt-4 font-medium md:pt-0 xl:p-2">
          {t("filters")}:
        </h4>
        <div className="mb-3 grid w-full grid-cols-1 gap-3 md:mb-0 md:grid-cols-2 md:grid-rows-2 xl:py-3 2xl:grid-cols-4 2xl:grid-rows-1 2xl:gap-5">
          <CustomSelect
            options={dietaryPreferences}
            defaultOption={t("preferencesPlaceholder")}
            selectedOption={filters.preference?.title}
            onChange={(option) => handleFilterChange("preference", option)}
          />
          <CustomSelect
            options={dietaryRestrictions}
            defaultOption={t("restrictionsPlaceholder")}
            selectedOption={filters.restriction?.title}
            onChange={(option) => handleFilterChange("restriction", option)}
          />
          <CustomSelect
            options={categories}
            defaultOption={t("selectMealCategory")}
            selectedOption={filters.category?.title}
            onChange={(option) => {
              handleFilterChange("category", option);
            }}
          />
          <div className="flex justify-between gap-2">
            <TextButton
              className="w-1/2"
              onClick={resetFilters}
              text={t("resetFilters")}
            />
            <TextButton
              onClick={onMealOpen}
              className="w-1/2"
              text={`${t("addMeal")}`}
              primary={true}
            />
          </div>
        </div>
      </div>

      {isMealOpen && (
        <MealAddModal
          isOpenModal={isMealOpen}
          onClose={onMealClose}
          mealToEdit={null}
        />
      )}
    </>
  );
};

export default MealsPageHeader;
