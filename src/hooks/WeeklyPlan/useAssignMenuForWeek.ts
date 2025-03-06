import { updateWeeklyPlan } from "@/api/weeklyPlanApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

interface AssignMenuForWeekProps {
  selectedMenu: string[];
  weeklyPlanId: string;
  year: number;
  weekNumber: number;
}

/**
 *  Mutation function to assign a menu for the week
 */
export const useAssignMenuForWeek = (cleanUp: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ selectedMenu, weeklyPlanId }: AssignMenuForWeekProps) => {
      return updateWeeklyPlan(selectedMenu, weeklyPlanId);
    },
    onSuccess: (data, { year, weekNumber }) => {
      const { message, status, warning, warning_multiple } = data;

      // Show info toast if limit reached
      if (status === "limit_reached") {
        showCustomToast({
          status: "info",
          title: message,
        });
        return;
      }

      // Show success or warning toast
      if (warning) {
        showCustomToast({
          status: "warning",
          title: warning,
        });
      } else if (warning_multiple) {
        showCustomToast({
          status: "warning",
          title: warning_multiple,
        });
      } else {
        showCustomToast({
          status: "success",
          title: message,
        });
      }

      // Invalidate the weekly plan query
      queryClient.invalidateQueries({
        queryKey: ["weeklyPlan", year, weekNumber],
      });

      // Invalidate weekly menus
      queryClient.invalidateQueries({ queryKey: ["weeklyMenus"] });
      queryClient.invalidateQueries({ queryKey: ["weeklyMenuById"] });

      // Clean up the state
      if (cleanUp) cleanUp();
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const { message, status } = error.response?.data || {
          message: "An error occurred",
        };
        if (status && status === "duplicate_menu") {
          showCustomToast({
            status: "info",
            description: message,
          });
        } else {
          showCustomToast({
            status: "error",
            description: message,
          });
        }
      }
    },
  });
};
