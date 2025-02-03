import CustomButton from "@/components/common/CustomButton";
import CustomSearchInput from "@/components/common/CustomSearchInput";
import CustomSelect from "@/components/common/CustomSelect";
import useFiltersOptions from "@/hooks/useFiltersOptions";
import { CustomersFilters } from "@/utils/types";
import { TFunction } from "i18next";
import React from "react";

interface AssignCustomersModalHeaderProps {
  t: TFunction;
  searchQuery: string | null;
  setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>;
  handleFilterChange: (
    filterType: "preference" | "status" | "gender" | "all",
    selectedOption?: { key: string; title: string } | null,
  ) => void;
  filters: CustomersFilters;
}

/**
 *  Header for the assign customers for current group
 */
const AssignCustomersModalHeader: React.FC<AssignCustomersModalHeaderProps> = ({
  t,
  searchQuery,
  setSearchQuery,
  handleFilterChange,
  filters,
}) => {
  const { dietaryPreferences, genderOptions } = useFiltersOptions();

  return (
    <div className="grid grid-rows-4 gap-[6px] md:grid-cols-8 md:grid-rows-3 md:gap-3 xl:grid-rows-2">
      {/* Search input */}
      <div className="row-span-1 flex h-fit items-center md:col-span-8">
        <CustomSearchInput
          t={t}
          placeholder={t("customers:searchPlaceholder")}
          searchQuery={searchQuery || ""}
          handleSearch={(e) => setSearchQuery(e.target.value)}
          cleanSearch={() => setSearchQuery("")}
        />
      </div>
      {/* Filters area */}
      <div className="row-span-4 space-y-2 md:col-span-8 md:row-span-1 md:my-0 md:flex md:gap-4 md:space-y-0 xl:col-span-6">
        <h4 className="col-auto row-span-1 mt-2 flex items-center text-sm font-medium md:mt-0">
          {t("common:filters")}:
        </h4>
        <div className="row-span-1 w-full">
          <CustomSelect
            options={dietaryPreferences}
            defaultOption={t("meals:preferencesPlaceholder")}
            selectedOption={filters.preference?.title}
            onChange={(option) =>
              handleFilterChange("preference", option || null)
            }
          />
        </div>
        <div className="row-span-1 w-full">
          <CustomSelect
            options={genderOptions}
            defaultOption={t("customers:genderTitle")}
            selectedOption={filters.gender?.title}
            onChange={(option) => handleFilterChange("gender", option || null)}
          />
        </div>
      </div>
      {/* Buttons */}
      <div className="row-span-1 mt-[1px] flex items-center gap-3 md:col-span-8 xl:col-span-2">
        <CustomButton
          type="lightSecondary"
          onClick={() => handleFilterChange("all", null)}
          text={t("meals:resetFilters")}
          widthFull={true}
        />
        <CustomButton
          widthFull={true}
          onClick={() => {}}
          text={t("common:search")}
        />
      </div>
    </div>
  );
};

export default AssignCustomersModalHeader;
