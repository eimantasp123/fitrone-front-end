import {
  deleteCustomerApi,
  resendFormCustomerApi,
  updateCustomerStatusApi,
} from "@/api/customersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

/**
 * useAction hook to perform actions on customer
 */
export const useDeleteOrResendCustomerAction = (onCleanup: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      customerId,
      type,
      status,
    }: {
      customerId: string;
      type: "delete" | "resend" | "status";
      status?: string | null;
    }) => {
      switch (type) {
        case "delete":
          return deleteCustomerApi(customerId);
        case "resend":
          return resendFormCustomerApi(customerId);
        case "status":
          return updateCustomerStatusApi(customerId, status!);
        default:
          throw new Error("Invalid action type");
      }
    },
    onSuccess: (data, { type }) => {
      const { message } = data;

      // Show success toast
      showCustomToast({
        status: "success",
        title: message,
      });

      if (type === "delete" || type === "status") {
        // Invalidate the customers query
        queryClient.invalidateQueries({ queryKey: ["customers"] });
        queryClient.invalidateQueries({ queryKey: ["groupById"] });
      }

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
