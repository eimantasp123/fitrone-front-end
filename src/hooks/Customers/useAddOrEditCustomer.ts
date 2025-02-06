import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showCustomToast } from "../showCustomToast";
import axios from "axios";
import { addCustomerApi, updateCustomerApi } from "@/api/customersApi";
import { UseCustomerFormProps } from "../CustomerPageForm/useCustomerForm";

/**
 * useAction hook to perform actions on customer
 */
export const useAddOrEditCustomerAction = (onCleanup: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      customerId,
    }: {
      data: UseCustomerFormProps;
      customerId?: string | null;
    }) => {
      if (customerId) {
        return updateCustomerApi({ customerId, data });
      } else {
        return addCustomerApi(data);
      }
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
