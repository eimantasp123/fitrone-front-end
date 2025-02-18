import {
  deleteCustomerApi,
  resendFormCustomerApi,
  updateCustomerStatusToActiveApi,
  updateCustomerStatusToInactiveApi,
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
      type: "delete" | "resend" | "status" | "menuQuantity";
      status?: string | null;
    }) => {
      switch (type) {
        case "delete":
          return deleteCustomerApi(customerId);
        case "resend":
          return resendFormCustomerApi(customerId);
        case "status":
          if (status === "active")
            return updateCustomerStatusToActiveApi(customerId);
          if (status === "inactive")
            return updateCustomerStatusToInactiveApi(customerId);
          break;
        default:
          throw new Error("Invalid action type");
      }
    },
    onSuccess: (data, { type }) => {
      const { message, status, warning } = data;

      if (status === "warning") {
        showCustomToast({
          status: "warning",
          title: message,
        });
        return;
      }

      if (status === "limit_reached") {
        showCustomToast({
          status: "info",
          title: message,
        });
        return;
      }

      if (warning) {
        showCustomToast({
          status: "warning",
          title: warning,
        });
      } else {
        showCustomToast({
          status: "success",
          title: message,
        });
      }

      if (type === "delete" || type === "status") {
        // Invalidate the customers query
        queryClient.invalidateQueries({ queryKey: ["customers"] });
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
