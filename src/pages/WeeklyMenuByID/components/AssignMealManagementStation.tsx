import CustomButton from "@/components/common/CustomButton";
import CustomSearchInput from "@/components/common/CustomSearchInput";
import CustomSelect from "@/components/common/CustomSelect";
import EmptyStateForSmallComponents from "@/components/common/EmptyStateForSmallComponents";
import {
  default as useFiltersOptions,
  default as useRestrictionsAndPreferences,
} from "@/hooks/useFiltersOptions";
import {
  addMealsToCurrentDay,
  searchMeals,
} from "@/services/reduxSlices/WeeklyMenuById/weeklyMenuByIdSlice";
import { useAppDispatch } from "@/store";
import { capitalizeFirstLetter } from "@/utils/helper";
import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "use-debounce";

interface AssignMealManagementStationProps {
  closeModal: () => void;
  weeklyMenuId: string;
  dayId: string;
}

interface MealToAssign {
  _id: string;
  title: string;
  category: string;
}

const AssignMealManagementStation: React.FC<
  AssignMealManagementStationProps
> = ({ closeModal, weeklyMenuId, dayId }) => {
  const { t } = useTranslation("weeklyMenu");
  const { categoriesTranslated } = useFiltersOptions();
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [generalMeals, setGeneralMeals] = useState<MealToAssign[]>([]);
  const [selectedMeals, setSelectedMeals] = useState<string[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [assignedLoading, setAssignedLoading] = useState<boolean>(false);
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<{
    preference: { key: string; title: string } | null;
    restriction: { key: string; title: string } | null;
    category: { key: string; title: string } | null;
  }>({
    preference: null,
    restriction: null,
    category: null,
  });
  const { dietaryPreferences, dietaryRestrictions, categories } =
    useRestrictionsAndPreferences();

  // Fetch meals on search query change
  useEffect(() => {
    const fetchMeals = async () => {
      if (debouncedQuery && debouncedQuery.length > 2) {
        const result = await dispatch(
          searchMeals({ searchQuery: debouncedQuery }),
        );
        if (searchMeals.fulfilled.match(result)) {
          setGeneralMeals(result.payload);
        }
      }

      // Reset filters and fetch data when search query is empty
      if (debouncedQuery === "") {
        const result = await dispatch(searchMeals({}));
        if (searchMeals.fulfilled.match(result)) {
          setGeneralMeals(result.payload);
        }
      }
    };
    fetchMeals();
  }, [debouncedQuery, dispatch]);

  // Initial fetch on mount (without considering filters or search query)
  useEffect(() => {
    const initialFetch = async () => {
      setLoading(true);
      const result = await dispatch(searchMeals({}));
      if (searchMeals.fulfilled.match(result)) {
        setGeneralMeals(result.payload);
      }
      setLoading(false);
    };
    initialFetch();
  }, [dispatch]); // Runs only on mount

  // Function to fetch meals (used for both initial fetch and search button)
  const fetchMeals = async ({ clean }: { clean: boolean }) => {
    if (clean) {
      setFilters({
        preference: null,
        restriction: null,
        category: null,
      });
      setSearchQuery(null);
    }
    const result = await dispatch(
      searchMeals(clean ? {} : { filters, searchQuery }),
    );
    if (searchMeals.fulfilled.match(result)) {
      setGeneralMeals(result.payload);
    }
  };

  // Handle accept meal and add to selected meals array
  const handleAccept = async (id: string) => {
    setSelectedMeals((prev) =>
      prev && prev.includes(id)
        ? prev.filter((meal) => meal !== id)
        : [...(prev || []), id],
    );
  };

  // Assign selected meals
  const assingSelectedMeals = async () => {
    if (selectedMeals) {
      setAssignedLoading(true);
      const result = await dispatch(
        addMealsToCurrentDay({ meals: selectedMeals, dayId, weeklyMenuId }),
      );
      if (addMealsToCurrentDay.fulfilled.match(result)) {
        closeModal();
      }
    }
    setAssignedLoading(false);
  };

  return (
    <>
      <p className="flex items-center gap-1 border-t-[1px] border-borderPrimary py-2 text-sm text-textPrimary">
        {t("searchMealsFromDatabaseAndAssign")}
      </p>

      <div className="grid grid-rows-6 gap-[6px] md:grid-cols-8 md:grid-rows-3 md:gap-3 xl:grid-rows-2">
        {/* Search input */}
        <div className="row-span-1 flex h-fit items-center md:col-span-8">
          <CustomSearchInput
            t={t}
            placeholder={t("searchMealsPlaceholder")}
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
          <div className="row-span-1 w-full">
            <CustomSelect
              options={categories}
              defaultOption={t("common:selectCategory")}
              selectedOption={filters.category?.title}
              onChange={(option) =>
                setFilters({ ...filters, category: option })
              }
            />
          </div>
        </div>
        {/* Buttons */}
        <div className="row-span-1 mt-[1px] flex items-center gap-3 md:col-span-8 xl:col-span-2">
          <CustomButton
            type="lightSecondary"
            onClick={() => fetchMeals({ clean: true })}
            text={t("meals:resetFilters")}
            widthFull={true}
          />
          <CustomButton
            widthFull={true}
            onClick={() => fetchMeals({ clean: false })}
            text={t("search")}
          />
        </div>
      </div>

      {loading ? (
        <div className="my-32 flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      ) : generalMeals.length !== 0 ? (
        <div className="mt-3 h-full w-full">
          <span className="px-6 text-sm">
            {t("common:selected")}: {selectedMeals?.length || 0}
          </span>
          {generalMeals.length !== 0 && (
            <div className="mt-2 grid max-h-[330px] grid-cols-1 gap-2 overflow-y-auto px-3 scrollbar-thin md:grid-cols-2 xl:grid-cols-3">
              {generalMeals.map((meal) => (
                <div
                  key={meal._id}
                  onClick={() => handleAccept(meal._id)}
                  className={`flex cursor-pointer items-center border-2 transition-colors duration-200 ease-in-out ${selectedMeals?.includes(meal._id) ? "border-primary" : "border-transparent"} justify-between gap-2 rounded-lg bg-backgroundSecondary p-2 shadow-sm dark:bg-background md:p-3`}
                >
                  <div className="flex flex-col text-sm sm:text-sm">
                    <p>{capitalizeFirstLetter(meal.title)}</p>
                    <p className="text-[12px] text-textSecondary">
                      {t("common:category")}:{" "}
                      {categoriesTranslated[meal.category]}
                    </p>
                  </div>
                  <span
                    className={`size-[14px] rounded-full border-[2px] transition-colors duration-200 ease-in-out ${selectedMeals?.includes(meal._id) ? "border-primary dark:bg-backgroundSecondary" : "border-neutral-300 bg-backgroundSecondary dark:border-neutral-700 dark:bg-background"} `}
                  ></span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 px-4">
            <CustomButton
              text={`${t("assignSelected")} (${selectedMeals?.length})`}
              onClick={assingSelectedMeals}
              widthFull={true}
              loading={assignedLoading}
              loadingSpinner={false}
              disabled={selectedMeals?.length === 0}
              paddingY="py-3"
            />
          </div>
        </div>
      ) : (
        <EmptyStateForSmallComponents
          title={t("noMealsFound")}
          description={t("noMealsFoundDescription")}
        />
      )}
    </>
  );
};

export default AssignMealManagementStation;
