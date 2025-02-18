import { changeMenuQuantityApi } from "@/api/customersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

/**
 * Hook to change menu quantity
 */
export const useChangeMenuQuantity = (onCleanup: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      customerId,
      menuQuantity,
    }: {
      customerId: string;
      menuQuantity: number;
    }) => {
      return changeMenuQuantityApi({ customerId, menuQuantity });
    },
    onSuccess: (data) => {
      const { message, status } = data;

      if (status === "warning") {
        showCustomToast({
          status: "warning",
          title: message,
        });
        return;
      }

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
};
