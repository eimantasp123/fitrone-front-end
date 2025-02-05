import {
  assignClientsToWeekPlanMenu,
  assignGroupToWeekPlanMenu,
} from "@/api/weekPlanApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

interface useAssignProps {
  weekPlanId: string;
  weekPlanMenuId: string;
  objectId: string[];
  type: "client" | "group";
}

/**
 *  Mutation function to assign clients or group to the week plan menu
 */
export const useAssignClientsOrGroupToWeekPlanMenu = (cleanUp: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      weekPlanId,
      weekPlanMenuId,
      objectId,
      type,
    }: useAssignProps) => {
      switch (type) {
        case "client":
          return assignClientsToWeekPlanMenu({
            weekPlanId,
            weekPlanMenuId,
            clients: objectId,
          });
        case "group":
          return assignGroupToWeekPlanMenu({
            weekPlanId,
            weekPlanMenuId,
            groupId: objectId[0],
          });
      }
    },
    onSuccess: (response, { weekPlanId, weekPlanMenuId }) => {
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
        queryKey: ["currentMenuDetailsOnWeekPlan", weekPlanId, weekPlanMenuId],
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
