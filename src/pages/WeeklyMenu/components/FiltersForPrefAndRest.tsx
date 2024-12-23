import CustomSelect from "@/components/common/CustomSelect";
import { TFunction } from "i18next";
import React from "react";
import useRestrictionsAndPreferences from "@/hooks/useFiltersOptions";

/**
 * CustomFilters component props interface
 */
interface CustomFiltersProps {
  t: TFunction;
  filters: {
    preference: { key: string; title: string } | null;
    restriction: { key: string; title: string } | null;
  };
  handleFilterChange: (
    filterType: string,
    option: { key: string; title: string },
  ) => void;
}

// CustomFilters component
const CustomFilters: React.FC<CustomFiltersProps> = ({
  t,
  handleFilterChange,
  filters,
}) => {
  const { dietaryPreferences, dietaryRestrictions } =
    useRestrictionsAndPreferences();

  return (
    <>
      <h4 className="flex h-auto items-center pb-2 pt-4 font-medium md:pt-0 2xl:p-2">
        {t("meals:filters")}:
      </h4>
      <CustomSelect
        options={dietaryPreferences}
        defaultOption={t("meals:preferencesPlaceholder")}
        selectedOption={filters.preference?.title}
        onChange={(option) => handleFilterChange("preference", option)}
      />
      <CustomSelect
        options={dietaryRestrictions}
        defaultOption={t("meals:restrictionsPlaceholder")}
        selectedOption={filters.restriction?.title}
        onChange={(option) => handleFilterChange("restriction", option)}
      />
    </>
  );
};

export default CustomFilters;
