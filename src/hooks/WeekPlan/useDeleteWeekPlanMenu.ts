import { deleteWeekPlan } from "@/api/weekPlanApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

interface DeleteWeekPlanMenuProps {
  menuId: string;
  year: number;
  week: number;
}

/**
 *  useDeleteWeekPlanMenu hook to delete a week plan
 */
export const useDeleteWeekPlanMenu = (onCleanup: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ menuId, year, week }: DeleteWeekPlanMenuProps) =>
      deleteWeekPlan(year, week, menuId),
    onMutate: () => {
      // Do something before the mutation
    },
    onSuccess: (data, { year, week }) => {
      const { message } = data;

      // Show success toast
      showCustomToast({
        status: "success",
        description: message,
      });

      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["weekPlan", { year, weekNumber: week }],
      });

      // Invalidate weekly menus
      queryClient.invalidateQueries({ queryKey: ["weeklyMenus"] });

      // Cleanup
      if (onCleanup) onCleanup();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data.message || "An error occurred";
        showCustomToast({
          status: "error",
          description: errorMessage,
        });
      }
      // Do something after the mutation
    },
  });
};
