import CustomButton from "@/components/common/CustomButton";
import CustomSearchInput from "@/components/common/CustomSearchInput";
import CustomSelect from "@/components/common/CustomSelect";
import useFiltersOptions from "@/hooks/useFiltersOptions";
import { WeekPlanModalAssignFilters } from "@/utils/types";
import { TFunction } from "i18next";
import React from "react";

interface AssignExistingMenuModalHeaderProps {
  t: TFunction;
  searchQuery: string | null;
  setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>;
  setFilters: React.Dispatch<React.SetStateAction<WeekPlanModalAssignFilters>>;
  filters: WeekPlanModalAssignFilters;
}

/**
 *  Header for the assign meal for current day modal
 */
const AssignExistingMenuModalHeader: React.FC<
  AssignExistingMenuModalHeaderProps
> = ({ t, searchQuery, setSearchQuery, setFilters, filters }) => {
  const { dietaryPreferences, dietaryRestrictions } = useFiltersOptions();

  return (
    <div className="grid grid-rows-4 gap-[6px] md:grid-cols-8 md:grid-rows-3 md:gap-3 xl:grid-rows-2">
      {/* Search input */}
      <div className="row-span-1 flex h-fit items-center md:col-span-8">
        <CustomSearchInput
          t={t}
          placeholder={t("searchPlaceholder")}
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
              setFilters({ ...filters, preference: option })
            }
          />
        </div>
        <div className="row-span-1 w-full">
          <CustomSelect
            options={dietaryRestrictions}
            defaultOption={t("meals:restrictionsPlaceholder")}
            selectedOption={filters.restriction?.title}
            onChange={(option) =>
              setFilters({ ...filters, restriction: option })
            }
          />
        </div>
      </div>
      {/* Buttons */}
      <div className="row-span-1 mt-[1px] flex items-center gap-3 md:col-span-8 xl:col-span-2">
        <CustomButton
          type="lightSecondary"
          onClick={() => setFilters({ preference: null, restriction: null })}
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

export default AssignExistingMenuModalHeader;
