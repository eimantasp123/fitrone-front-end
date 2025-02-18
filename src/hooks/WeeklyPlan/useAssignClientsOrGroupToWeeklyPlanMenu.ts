import { assignClientsToWeeklyPlanMenu } from "@/api/weeklyPlanApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

interface useAssignProps {
  weeklyPlanId: string;
  weeklyPlanMenuId: string;
  objectId: string[];
  type: "client";
}

/**
 *  Mutation function to assign clients or group to the weekly plan menu
 */
export const useAssignClientsOrGroupToWeeklyPlanMenu = (
  cleanUp: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      weeklyPlanId,
      weeklyPlanMenuId,
      objectId,
      type,
    }: useAssignProps) => {
      switch (type) {
        case "client":
          return assignClientsToWeeklyPlanMenu({
            weeklyPlanId,
            weeklyPlanMenuId,
            clients: objectId,
          });
      }
    },
    onSuccess: (response, { weeklyPlanId, weeklyPlanMenuId }) => {
      const { message, status } = response;

      // Show warning message if status is warning
      if (status === "warning") {
        showCustomToast({
          status: "warning",
          description: message,
        });
        return;
      }

      // Invalidate the week plan query
      queryClient.invalidateQueries({
        queryKey: [
          "currentMenuDetailsOnWeeklyPlan",
          weeklyPlanId,
          weeklyPlanMenuId,
        ],
      });

      showCustomToast({
        status: "success",
        description: message,
      });

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
