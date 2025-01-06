import { IngredientFromServer } from "@/utils/types";
import { useMemo } from "react";

interface UseIngredientStatesProps {
  ingredients: IngredientFromServer[];
  isLoading: boolean;
  isError: boolean;
  searchQuery: string | null;
}

/**
 * Custom hook to manage the states of the ingredients page
 */
export const useIngredientStates = ({
  ingredients,
  isLoading,
  isError,
  searchQuery,
}: UseIngredientStatesProps) => {
  // Check if there are no ingredients added
  const noIngredientsAdded = useMemo(
    () =>
      ingredients.length === 0 &&
      searchQuery === null &&
      !isLoading &&
      !isError,
    [ingredients, searchQuery, isLoading, isError],
  );

  // Determine the UI state when no search results are found
  const noSearchResults = useMemo(
    () => ingredients.length === 0 && searchQuery !== null && !isLoading,
    [ingredients, searchQuery, isLoading],
  );

  // Determine if there are ingredients to display
  const hasIngredients = useMemo(
    () => ingredients.length > 0 && !isError && !isLoading,
    [ingredients, isError, isLoading],
  );

  return {
    noIngredientsAdded,
    noSearchResults,
    hasIngredients,
  };
};
