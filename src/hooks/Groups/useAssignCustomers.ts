import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";
import { assignCustomersToGroup } from "@/api/groupsApi";

/**
 * Hook to assign customers to a group
 */
export const useAssignCustomersAction = (onCleanup?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      groupId,
    }: {
      data: string[];
      groupId: string;
    }) => {
      return assignCustomersToGroup({ data, groupId });
    },
    onSuccess: (data, { groupId }) => {
      const { message } = data;

      console.log("message", data);

      if (data.status === "warning") {
        showCustomToast({
          status: "warning",
          title: message,
          description: data.details.join(" "),
        });
        return;
      }

      // Show success toast
      showCustomToast({
        status: "success",
        title: message,
      });

      // Invalidate groupById query
      queryClient.invalidateQueries({ queryKey: ["groupById", groupId] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });

      // Call onCleanup function
      if (onCleanup) onCleanup();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data.message || "An error occurred";
        showCustomToast({
          status: "error",
          title: errorMessage,
        });
      }
    },
  });
};
