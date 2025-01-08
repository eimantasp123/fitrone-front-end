import { fetchWeeklyMenuById } from "@/api/weeklyMenuById";
import { WeeklyMenuByIdResponse } from "@/utils/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Fetch weekly menu by id
 */
export const useWeeklyMenuById = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery<WeeklyMenuByIdResponse>({
    queryKey: ["weeklyMenuById", id],
    queryFn: () => fetchWeeklyMenuById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
    initialData: () => {
      const cachedData = queryClient.getQueryData<WeeklyMenuByIdResponse>([
        "weeklyMenuById",
        id,
      ]);
      return cachedData; // Return cached data if available
    },
  });
};
