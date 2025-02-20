import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showCustomToast } from "../showCustomToast";
import axios from "axios";
import { managePublishWeeklyPlan } from "@/api/weeklyPlanApi";

interface ManagePublishMenuProps {
  menuId: string;
  year: number;
  week: number;
  publish: boolean;
}

/**
 * Hook to manage publish weekly plan
 */
export const useManagePublishMenu = (onCleanup: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ menuId, year, week, publish }: ManagePublishMenuProps) =>
      managePublishWeeklyPlan(year, week, menuId, publish),

    onSuccess: (data, { year, week }) => {
      const { message, status } = data;

      // Show warning toast
      if (status === "warning") {
        showCustomToast({
          status: "warning",
          title: message,
        });
        return;
      }

      // Show success toast
      showCustomToast({
        status: "success",
        title: message,
      });

      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["weeklyPlan", { year, weekNumber: week }],
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
