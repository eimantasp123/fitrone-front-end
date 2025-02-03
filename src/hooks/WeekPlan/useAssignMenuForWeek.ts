import { updateWeekPlan } from "@/api/weekPlanApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

interface AssignMenuForWeekProps {
  selectedMenu: string[];
  weekPlanId: string;
  year: number;
  weekNumber: number;
}

/**
 *  Mutation function to assign a menu for the week
 */
export const useAssignMenuForWeek = (cleanUp: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ selectedMenu, weekPlanId }: AssignMenuForWeekProps) => {
      return updateWeekPlan(selectedMenu, weekPlanId);
    },
    onSuccess: (data, { year, weekNumber }) => {
      const { message } = data;
      showCustomToast({
        status: "success",
        description: message,
      });

      // Invalidate the week plan query
      queryClient.invalidateQueries({
        queryKey: ["weekPlan", { year, weekNumber }],
      });

      // Invalidate weekly menus
      queryClient.invalidateQueries({ queryKey: ["weeklyMenus"] });

      // Clean up the state
      if (cleanUp) cleanUp();
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
