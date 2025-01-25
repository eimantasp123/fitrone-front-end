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

  const actionMutation = useMutation({
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
      const { message } = data;

      // Show success toast
      showCustomToast({
        status: "success",
        title: message,
      });
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

  return actionMutation;
};
