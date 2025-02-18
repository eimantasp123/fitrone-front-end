import { sendFormToCustomerApi } from "@/api/customersApi";
import { SendFormToCustomerForm } from "@/pages/Customers/components/SendFormToCustomerModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

/**
 * Hook to send form to customer
 */
export const useCustomerSendMailAction = (onCleanup: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SendFormToCustomerForm) => {
      return sendFormToCustomerApi(data);
    },
    onSuccess: (data) => {
      const { message, warning, status } = data;

      // Show info toast if limit reached
      if (status === "limit_reached") {
        showCustomToast({
          status: "info",
          title: message,
        });
        return;
      }

      // Show warning or success toast
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
      // Invalidate the customers query
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
