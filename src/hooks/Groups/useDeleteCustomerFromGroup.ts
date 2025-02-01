import { deleteCustomerFromGroup } from "@/api/groupsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

/**
 * Hook to delete a customer from a group
 */
export const useDeleteCustomerFromGroupAction = (onCleanup?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      customerId,
      groupId,
    }: {
      customerId: string;
      groupId: string;
    }) => {
      return deleteCustomerFromGroup({ customerId, groupId });
    },
    onSuccess: (data, { groupId }) => {
      const { message } = data;
      // Show success toast
      showCustomToast({
        status: "success",
        title: message,
      });

      // Call onCleanup function
      if (onCleanup) onCleanup();

      // Invalidate groupById query
      queryClient.invalidateQueries({ queryKey: ["groupById", groupId] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
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
