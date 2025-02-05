import {
  removeClientFromWeekPlanMenu,
  removeGroupFromWeekPlanMenu,
} from "@/api/weekPlanApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

interface useDeleteProps {
  weekPlanId: string;
  weekPlanMenuId: string;
  objectId: string;
  type: "client" | "group";
}

/**
 *  Mutation function to delete client or group from the week plan menu
 */
export const useDeleteClientOrGroupFromMenu = (cleanUp?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      weekPlanId,
      weekPlanMenuId,
      objectId,
      type,
    }: useDeleteProps) => {
      switch (type) {
        case "client":
          return removeClientFromWeekPlanMenu({
            weekPlanId,
            weekPlanMenuId,
            clientId: objectId,
          });
        case "group":
          return removeGroupFromWeekPlanMenu({
            weekPlanId,
            weekPlanMenuId,
            groupId: objectId,
          });
        default:
          throw new Error("Invalid type");
      }
    },
    onSuccess: (response, { weekPlanId, weekPlanMenuId }) => {
      const { message } = response;

      showCustomToast({
        status: "success",
        description: message,
      });

      // Invalidate the week plan query
      queryClient.invalidateQueries({
        queryKey: ["currentMenuDetailsOnWeekPlan", weekPlanId, weekPlanMenuId],
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
