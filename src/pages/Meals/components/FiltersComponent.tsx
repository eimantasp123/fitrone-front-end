import CustomSelect from "@/components/common/CustomSelect";
import { TFunction } from "i18next";
import React from "react";
import useRestrictionsAndPreferences from "@/hooks/useFiltersOptions";
import { Filters } from "@/utils/types";

// FiltersComponentProps interface
interface FiltersComponentProps {
  t: TFunction;
  filters: Filters;
  onClose?: () => void;
  handleFilterChange: (
    filterType: "preference" | "restriction" | "category",
    selectedOption: { key: string; title: string } | null,
  ) => void;
}

/**
 * FiltersComponent component to display the filters for the meals page
 */
const FiltersComponent: React.FC<FiltersComponentProps> = ({
  t,
  handleFilterChange,
  filters,
  onClose,
}) => {
  const { dietaryPreferences, dietaryRestrictions, categories } =
    useRestrictionsAndPreferences();

  return (
    <>
      <h4 className="flex h-auto items-center pb-2 pt-4 font-medium md:pt-0 2xl:p-2">
        {t("common:filters")}:
      </h4>
      <CustomSelect
        options={dietaryPreferences}
        defaultOption={t("meals:preferencesPlaceholder")}
        selectedOption={filters.preference?.title}
        onChange={(option) => {
          handleFilterChange("preference", option);
          if (onClose) onClose();
        }}
      />
      <CustomSelect
        options={dietaryRestrictions}
        defaultOption={t("meals:restrictionsPlaceholder")}
        selectedOption={filters.restriction?.title}
        onChange={(option) => {
          handleFilterChange("restriction", option);
          if (onClose) onClose();
        }}
      />
      <CustomSelect
        options={categories}
        defaultOption={t("meals:mealCategory")}
        selectedOption={filters.category?.title}
        onChange={(option) => {
          handleFilterChange("category", option);
          if (onClose) onClose();
        }}
      />
    </>
  );
};

export default FiltersComponent;
