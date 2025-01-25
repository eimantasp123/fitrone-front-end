import { deleteCustomerApi, resendFormCustomerApi } from "@/api/customersApi";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

/**
 * useAction hook to perform actions on customer
 */
export const useDeleteOrResendCustomerAction = (onCleanup: () => void) => {
  const queryClient = useQueryClient();

  const actionMutation = useMutation({
    mutationFn: async ({
      customerId,
      type,
    }: {
      customerId: string;
      type: "delete" | "resend";
    }) => {
      switch (type) {
        case "delete":
          return deleteCustomerApi(customerId);
        case "resend":
          return resendFormCustomerApi(customerId);
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

      if (type === "delete") {
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

  return actionMutation;
};
