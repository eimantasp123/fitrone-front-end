import { fetchPaginatedMeals } from "@/api/mealsApi";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UseMealsProps {
  searchValue: string | null;
  category: string | null;
  preference: string | null;
  restriction: string | null;
}

/**
 * Hook to fetch paginated meals
 */
export const useMeals = ({
  searchValue = null,
  category = null,
  preference = null,
  restriction = null,
}: UseMealsProps) => {
  return useInfiniteQuery({
    queryKey: ["meals", searchValue, category, preference, restriction],
    queryFn: fetchPaginatedMeals,
    initialPageParam: 1,
    placeholderData: (prev) => prev,
    getNextPageParam: (lastPage) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
    retry: 3,
  });
};
