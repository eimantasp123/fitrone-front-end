import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showCustomToast } from "../showCustomToast";
import axios from "axios";
import { managePublishWeekPlan } from "@/api/weekPlanApi";

interface ManagePublishMenuProps {
  menuId: string;
  year: number;
  week: number;
  publish: boolean;
}

/**
 * Hook to manage publish week plan
 */
export const useManagePublishMenu = (onCleanup: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ menuId, year, week, publish }: ManagePublishMenuProps) =>
      managePublishWeekPlan(year, week, menuId, publish),

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
    },
  });
};
