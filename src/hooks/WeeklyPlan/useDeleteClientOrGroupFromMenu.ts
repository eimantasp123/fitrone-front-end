import {
  removeClientFromWeeklyPlanMenu,
  removeGroupFromWeeklyPlanMenu,
} from "@/api/weeklyPlanApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

interface useDeleteProps {
  weeklyPlanId: string;
  weeklyPlanMenuId: string;
  objectId: string;
  type: "client";
}

/**
 *  Mutation function to delete client or group from the week plan menu
 */
export const useDeleteClientOrGroupFromMenu = (cleanUp?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      weeklyPlanId,
      weeklyPlanMenuId,
      objectId,
      type,
    }: useDeleteProps) => {
      switch (type) {
        case "client":
          return removeClientFromWeeklyPlanMenu({
            weeklyPlanId,
            weeklyPlanMenuId,
            clientId: objectId,
          });
        // case "group":
        //   return removeGroupFromWeekPlanMenu({
        //     weekPlanId,
        //     weekPlanMenuId,
        //     groupId: objectId,
        //   });
      }
    },
    onSuccess: (response, { weeklyPlanId, weeklyPlanMenuId }) => {
      const { message, status } = response;

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

      // Invalidate the week plan query
      queryClient.invalidateQueries({
        queryKey: [
          "currentMenuDetailsOnWeeklyPlan",
          weeklyPlanId,
          weeklyPlanMenuId,
        ],
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
