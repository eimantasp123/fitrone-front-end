import { useMemo } from "react";

interface UsePageStatesProps {
  currentResults: number;
  isLoading: boolean;
  isError: boolean;
  totalResults: number;
}

/**
 *  Custom hook to manage the states of a list-based page
 */
export const usePageStates = ({
  currentResults,
  isLoading,
  isError,
  totalResults,
}: UsePageStatesProps) => {
  // Check if there are no items added
  const noItemsAdded = useMemo(() => {
    return !isLoading && !isError && totalResults === 0 && currentResults === 0;
  }, [isLoading, totalResults, isError, currentResults]);

  // Check if there are no results for combined search + filters
  const noResultsForSearchAndFilters = useMemo(() => {
    return !isLoading && !isError && totalResults > 0 && currentResults === 0;
  }, [isLoading, isError, totalResults, currentResults]);

  // Check if there are items to display
  const hasItems = useMemo(() => {
    return !isLoading && !isError && currentResults > 0 && totalResults > 0;
  }, [currentResults, isError, isLoading, totalResults]);

  return {
    noItemsAdded,
    noResultsForSearchAndFilters,
    hasItems,
  };
};
