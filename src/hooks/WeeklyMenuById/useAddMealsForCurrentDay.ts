import { addMealsToCurrentDay } from "@/api/weeklyMenuById";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

/**
 * Hook to add meals to the current day
 */
export const useAddMealsForCurrentDay = (onCleanup: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      meals,
      dayId,
      weeklyMenuId,
    }: {
      meals: string[] | null;
      dayId: string | null;
      weeklyMenuId: string;
    }) => {
      return addMealsToCurrentDay({ meals, dayId, weeklyMenuId });
    },
    onSuccess: (data, { weeklyMenuId }) => {
      const { message, status } = data;

      if (status === "warning") {
        showCustomToast({
          status: "warning",
          description: message,
        });
        return;
      }

      showCustomToast({
        status: "success",
        description: message,
      });

      // Invalidate query to refetch data
      queryClient.invalidateQueries({
        queryKey: ["weeklyMenuById", weeklyMenuId],
      });

      // Cleanup function
      if (onCleanup) onCleanup();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "An unknown error occurred";
        showCustomToast({
          status: "error",
          description: errorMessage,
        });
      }
    },
  });
};
