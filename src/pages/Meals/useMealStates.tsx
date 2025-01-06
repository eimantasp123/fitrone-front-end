import { Filters, Meal } from "@/utils/types";
import { useMemo } from "react";

interface UseMealStatesProps {
  meals: Meal[];
  isLoading: boolean;
  isError: boolean;
  searchQuery: string | null;
  filters: Filters;
}

/**
 *  Custom hook to manage the states of the meals page
 */
export const useMealStates = ({
  meals,
  isLoading,
  isError,
  searchQuery,
  filters,
}: UseMealStatesProps) => {
  // Check if there are no meals added
  const noMealsAdded = useMemo(() => {
    return (
      meals.length === 0 &&
      !isLoading &&
      !isError &&
      searchQuery === null &&
      !Object.values(filters).some(Boolean)
    );
  }, [meals, isLoading, isError, searchQuery, filters]);

  // Check if there are no results for combined search + filters
  const noResultsForSearchAndFilters = useMemo(() => {
    return meals.length === 0 && !isLoading && !isError;
  }, [meals, isLoading, isError]);

  // Check if there are meals to display
  const hasMeals = useMemo(() => {
    return meals.length > 0 && !isError && !isLoading;
  }, [meals, isError, isLoading]);

  return {
    noMealsAdded,
    noResultsForSearchAndFilters,
    hasMeals,
  };
};
