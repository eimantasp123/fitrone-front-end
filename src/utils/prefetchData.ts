import { fetchPaginatedCustomers } from "@/api/customersApi";
import { fetchPaginatedIngredients } from "@/api/ingredientsApi";
import { fetchPaginatedMeals } from "@/api/mealsApi";
import { fetchPaginatedWeeklyMenus } from "@/api/weeklyMenusApi";
import { QueryClient } from "@tanstack/react-query";

// Prefetch data for the Dashboard and other routes
const prefetchDashboardAndOtherData = async (queryClient: QueryClient) => {
  try {
    // Prefetch Meals (First Page)
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["meals", null, null, null, null], // Default empty filters
      queryFn: fetchPaginatedMeals,
      initialPageParam: 1,
      staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
    });

    // Prefetch ingredients (First Page)
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["ingredients", null], // Default empty filters
      queryFn: fetchPaginatedIngredients,
      initialPageParam: 1,
      staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
    });

    // Prefetch Weekly menus (First Page)
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["weeklyMenus", null, null, null, null], // Default empty filters
      queryFn: fetchPaginatedWeeklyMenus,
      initialPageParam: 1,
      staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
    });

    // Prefetch customers (First Page)
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["customers", null, null, null, null], // Default empty filters
      queryFn: fetchPaginatedCustomers,
      initialPageParam: 1,
      staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
    });
  } catch (error) {
    console.error("❌ Error prefetching data:", error);
  }
};

export default prefetchDashboardAndOtherData;
