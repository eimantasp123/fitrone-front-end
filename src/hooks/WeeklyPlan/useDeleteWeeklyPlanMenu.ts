import { deleteWeeklyPlan } from "@/api/weeklyPlanApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

interface DeleteWeeklyPlanMenuProps {
  menuId: string;
  year: number;
  week: number;
}

/**
 *  useDeleteWeekPlanMenu hook to delete a weekly plan
 */
export const useDeleteWeeklyPlanMenu = (onCleanup: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ menuId, year, week }: DeleteWeeklyPlanMenuProps) =>
      deleteWeeklyPlan(year, week, menuId),
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

      // Invalidate week plan
      queryClient.invalidateQueries({
        queryKey: ["weeklyPlan", { year, weekNumber: week }],
      });

      // Invalidate the week plan query
      queryClient.invalidateQueries({
        queryKey: ["currentMenuDetailsOnWeeklyPlan"],
      });

      // Invalidate weekly menus
      queryClient.invalidateQueries({ queryKey: ["weeklyMenus"] });
      queryClient.invalidateQueries({ queryKey: ["weeklyMenuById"] });

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
