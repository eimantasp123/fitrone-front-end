import { setWeekPlanAsDone } from "@/api/weeklyPlanApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

/**
 *  Hook to mark the week plan as done
 */
export const useMarkWeekPlanAsDone = (cleanUp?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      weekPlanId,
    }: {
      weekPlanId: string;
      currentWeek: number;
      year: number;
    }) => {
      return setWeekPlanAsDone(weekPlanId);
    },
    onSuccess: (response, { currentWeek, year }) => {
      const { data, message, status } = response;

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

      // Invalidate the current week plan
      queryClient.refetchQueries({
        queryKey: ["weeklyPlan", year, currentWeek],
      });

      // Invalidate orders query
      queryClient.refetchQueries({
        queryKey: ["orders", year, currentWeek],
      });

      // Invalidate ingredient list query
      queryClient.refetchQueries({
        queryKey: ["ingredientsList", String(year), String(currentWeek)],
      });

      // Invalidate order by id query
      if (data?.singleDayOrderIds) {
        data.singleDayOrderIds.forEach((orderId: string) => {
          queryClient.removeQueries({
            queryKey: ["orderById", orderId],
          });
        });
      }

      // Close the modal
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
