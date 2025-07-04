import { deleteMealFromCurrentDay } from "@/api/weeklyMenuById";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showCustomToast } from "../showCustomToast";
import axios from "axios";

export const useDeleteMealFromCurrentDay = (onCleanup: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      mealObjectInArrayId,
      dayId,
      weeklyMenuId,
    }: {
      mealObjectInArrayId: string;
      dayId: string;
      weeklyMenuId: string;
    }) => {
      return deleteMealFromCurrentDay({
        mealObjectInArrayId,
        dayId,
        weeklyMenuId,
      });
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
