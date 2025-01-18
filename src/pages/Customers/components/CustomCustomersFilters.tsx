import CustomSelect from "@/components/common/CustomSelect";
import useRestrictionsAndPreferences from "@/hooks/useFiltersOptions";
import { CustomersFilters } from "@/utils/types";
import { TFunction } from "i18next";
import React from "react";

/**
 * CustomCustomersFilters component props interface
 */
interface CustomCustomersFiltersProps {
  t: TFunction;
  filters: CustomersFilters;
  onClose?: () => void;
  handleFilterChange: (
    filterType: "preference" | "status" | "gender" | "all",
    selectedOption?: { key: string; title: string } | null,
  ) => void;
}

// CustomCustomersFilters component
const CustomCustomersFilters: React.FC<CustomCustomersFiltersProps> = ({
  t,
  handleFilterChange,
  filters,
  onClose,
}) => {
  const { dietaryPreferences } = useRestrictionsAndPreferences();

  // Get translated gender options
  const genderOptions = t("gender", { returnObjects: true }) as {
    key: string;
    title: string;
  }[];

  // Get translated status options
  const statusOptions = t("status", { returnObjects: true }) as {
    key: string;
    title: string;
  }[];

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
        options={genderOptions}
        defaultOption={t("selectGender")}
        selectedOption={filters.gender?.title}
        onChange={(option) => {
          handleFilterChange("gender", option);
          if (onClose) onClose();
        }}
      />
      <CustomSelect
        options={statusOptions}
        defaultOption={t("clientStatus")}
        selectedOption={filters.status?.title}
        onChange={(option) => {
          handleFilterChange("status", option);
          if (onClose) onClose();
        }}
      />
    </>
  );
};

export default CustomCustomersFilters;
