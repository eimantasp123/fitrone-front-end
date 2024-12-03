import CustomerSelect from "@/components/common/CustomerSelect";
import TextButton from "@/components/common/TextButton";
import {
  getMeals,
  setFilters,
} from "@/services/reduxSlices/Meals/mealDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import AddMealModal from "./AddMealModal";

interface MealsHeaderProps {
  onFiltersClose?: () => void;
}

const MealsHeader: React.FC<MealsHeaderProps> = ({ onFiltersClose }) => {
  const { t } = useTranslation("meals");
  const {
    isOpen: isMealOpen,
    onClose: onMealClose,
    onOpen: onMealOpen,
  } = useDisclosure();
  const dispatch = useAppDispatch();
  const { filters, limit } = useAppSelector((state) => state.mealsDetails);

  const dietaryPreferences = Object.values(
    t("preferences", { returnObjects: true }),
  );
  const dietaryRestrictions = Object.values(
    t("restrictions", { returnObjects: true }),
  );
  const categories = Object.values(t("categories", { returnObjects: true }));

  // Handle filter selection
  const handleFilterChange = (filterType: string, value: string) => {
    const updatedFilters = { ...filters, [filterType]: value };
    dispatch(setFilters(updatedFilters));
    dispatch(getMeals({ page: 1, ...updatedFilters }));
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
      <div className="z-20 flex w-full select-none flex-col gap-2 bg-background px-4 pt-5 dark:bg-backgroundSecondary md:rounded-lg md:py-2 lg:flex-row xl:gap-1 xl:py-0">
        <h4 className="flex h-auto items-center pb-2 pt-4 font-medium md:pt-0 xl:p-2">
          {t("filters")}:
        </h4>
        <div className="mb-3 grid w-full grid-cols-1 gap-3 md:mb-0 md:grid-cols-2 md:grid-rows-2 xl:py-3 2xl:grid-cols-4 2xl:grid-rows-1 2xl:gap-5 2xl:px-4">
          <CustomerSelect
            options={dietaryPreferences}
            defaultOption={
              filters.preference
                ? filters.preference
                : t("preferencesPlaceholder")
            }
            onChange={(value) => handleFilterChange("preference", value)}
          />
          <CustomerSelect
            options={dietaryRestrictions}
            defaultOption={
              filters.restriction
                ? filters.restriction
                : t("restrictionsPlaceholder")
            }
            onChange={(value) => handleFilterChange("restriction", value)}
          />
          <CustomerSelect
            options={categories}
            defaultOption={t("selectMealCategory")}
            selectedOption={filters.category}
            onChange={(value) => {
              console.log("value", value);
              handleFilterChange("category", value);
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
        <AddMealModal
          isOpenModal={isMealOpen}
          onClose={onMealClose}
          mealToEdit={null}
        />
      )}
    </>
  );
};

export default MealsHeader;
