import { generateComboList } from "@/api/ordersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

/**
 * useCreateComboList hook to create a combo list
 */
export const useCreateComboList = (onCleanUp: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      year,
      week,
      selectedDays,
    }: {
      year: string;
      week: string;
      selectedDays: number[];
    }) => {
      // Call the API to create a combo list
      return generateComboList({ year, week, selectedDays });
    },
    onSuccess: (data, { year, week }) => {
      const { message, status } = data;

      if (status === "warning") {
        showCustomToast({
          status: "warning",
          title: message,
        });
        return;
      }
      // Show a success toast
      showCustomToast({
        status: "success",
        title: message,
      });

      // Invalidate the order by id query
      queryClient.invalidateQueries({
        queryKey: ["ingredientsList", year, week],
      });

      // Clean up the modal
      if (onCleanUp) onCleanUp();
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
