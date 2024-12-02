import CustomerSelect from "@/components/common/CustomerSelect";
import {
  getMeals,
  setFilters,
} from "@/services/reduxSlices/Meals/mealDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import AddMealModal from "./AddMealModal";
import TextButton from "@/components/common/TextButton";

const MealsHeader: React.FC = () => {
  const { t } = useTranslation("meals");
  const { isOpen, onClose, onOpen } = useDisclosure();
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
  };

  return (
    <>
      <div className="z-20 flex w-full flex-col gap-4 rounded-lg bg-background px-3 dark:bg-backgroundSecondary lg:flex-row">
        <h4 className="flex h-auto items-center pl-2 font-medium">
          {t("filters")}:
        </h4>
        <div className="grid w-full grid-cols-2 gap-5 px-4 py-3 md:grid-cols-3 md:grid-rows-1 xl:grid-cols-3 xl:grid-rows-1">
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
        </div>
        <div className="flex w-fit items-end justify-end gap-2 py-3 md:h-full">
          <TextButton onClick={resetFilters} text={t("resetFilters")} />
          <TextButton
            onClick={onOpen}
            text={`+ ${t("addMeal")}`}
            primary={true}
          />
        </div>
      </div>

      {isOpen && (
        <AddMealModal
          isOpenModal={isOpen}
          onClose={onClose}
          mealToEdit={null}
        />
      )}
    </>
  );
};

export default MealsHeader;
