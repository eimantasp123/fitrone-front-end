import { deleteIngredientApi } from "@/api/ingredientsApi";
import { PaginatedIngredientsResponse } from "@/utils/types";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

/**
 * useDeleteIngredient hook to delete an ingredient
 */
export const useDeleteIngredient = () => {
  const queryClient = useQueryClient();

  // Delete mutation handler
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return deleteIngredientApi(id);
    },
    onMutate: async ({
      id,
      onCloseModal,
    }: {
      id: string;
      onCloseModal: () => void;
    }) => {
      // Cancel any outgoing queries
      await queryClient.cancelQueries({ queryKey: ["ingredients"] });

      // Take a snapshot of the current list
      const queryKeys = queryClient
        .getQueriesData<
          InfiniteData<PaginatedIngredientsResponse>
        >({ queryKey: ["ingredients"] })
        .map(([queryKey]) => queryKey);

      // Store the previous data
      const previousDataMap: Record<
        string,
        InfiniteData<PaginatedIngredientsResponse>
      > = {};

      // Update the cache to remove the ingredient
      queryKeys.forEach((key) => {
        const previousData =
          queryClient.getQueryData<InfiniteData<PaginatedIngredientsResponse>>(
            key,
          );

        if (previousData) {
          previousDataMap[JSON.stringify(key)] = previousData; // Store the previous data
          queryClient.setQueryData(key, {
            ...previousData,
            pages: previousData.pages.map((page) => ({
              ...page,
              data: page.data.filter((item) => item.ingredientId !== id),
            })),
          });
        }
      });

      // Close modal
      if (onCloseModal) onCloseModal();

      // Return the previous data
      return { previousDataMap };
    },
    onSuccess: (data) => {
      const { message } = data;
      // Invalidate the cache to refetch the data
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
      // Show success toast
      showCustomToast({
        status: "success",
        description: message || "Ingredient deleted successfully",
      });
    },

    onError: (err, _, context) => {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || "An error occurred";
        showCustomToast({
          status: "error",
          description: errorMessage,
        });
      }

      // Revert back to the previous data
      Object.entries(context?.previousDataMap || {}).forEach(
        ([key, previousData]) => {
          queryClient.setQueryData(JSON.parse(key), previousData);
        },
      );
    },
  });
};
