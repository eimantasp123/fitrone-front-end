import CustomSelect from "@/components/common/CustomSelect";
import { TFunction } from "i18next";
import React from "react";
import useRestrictionsAndPreferences from "@/hooks/useFiltersOptions";
import { WeeklyMenyFilters } from "@/utils/types";

/**
 * CustomFilters component props interface
 */
interface CustomFiltersProps {
  t: TFunction;
  filters: WeeklyMenyFilters;
  onClose?: () => void;
  handleFilterChange: (
    filterType: "preference" | "restriction" | "archived",
    selectedOption: { key: string; title: string } | null,
  ) => void;
}

// CustomFilters component
const CustomFilters: React.FC<CustomFiltersProps> = ({
  t,
  handleFilterChange,
  filters,
  onClose,
}) => {
  const { dietaryPreferences, dietaryRestrictions, menuArchivingOptions } =
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
        options={menuArchivingOptions}
        defaultOption={t("weeklyMenu:menuStatusOptionsPlaceholder")}
        selectedOption={filters.archived?.title}
        onChange={(option) => {
          handleFilterChange("archived", option);
          if (onClose) onClose();
        }}
      />
    </>
  );
};

export default CustomFilters;
