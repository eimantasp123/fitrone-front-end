import { deleteComboList } from "@/api/ordersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

/**
 * useDeleteComboList hook to delete a combo list
 */
export const useDeleteComboList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      year,
      week,
      days,
    }: {
      year: string;
      week: string;
      days: number[];
    }) => {
      // Call the API to create a combo list
      return deleteComboList({ year, week, days });
    },
    onSuccess: (data, { year, week }) => {
      const { message } = data;

      // Show a success toast
      showCustomToast({
        status: "success",
        title: message,
      });

      // Invalidate the order by id query
      queryClient.invalidateQueries({
        queryKey: ["ingredientsList", year, week],
      });
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
