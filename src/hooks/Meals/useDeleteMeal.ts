import { deleteMealApi } from "@/api/mealsApi";
import { PaginatedMealsResponse } from "@/utils/types";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

/**
 *  useDeleteMeal hook to delete a meal
 */
export const useDeleteMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ mealId }: { mealId: string }) => {
      return deleteMealApi(mealId);
    },
    onMutate: async ({
      mealId,
      onCloseModal,
    }: {
      mealId: string;
      onCloseModal: () => void;
    }) => {
      // Cancel any outgoing queries
      await queryClient.cancelQueries({ queryKey: ["meals"] });

      const queryKeys = queryClient
        .getQueriesData<
          InfiniteData<PaginatedMealsResponse>
        >({ queryKey: ["meals"] })
        .map(([queryKey]) => queryKey);

      const previousDataMap: Record<
        string,
        InfiniteData<PaginatedMealsResponse>
      > = {};

      queryKeys.forEach((key) => {
        const previousData =
          queryClient.getQueryData<InfiniteData<PaginatedMealsResponse>>(key);

        if (previousData) {
          previousDataMap[JSON.stringify(key)] = previousData;
          queryClient.setQueryData(key, {
            ...previousData,
            pages: previousData.pages.map((page) => ({
              ...page,
              data: page.data.filter((item) => item._id !== mealId),
            })),
          });
        }
      });

      if (onCloseModal) onCloseModal();

      return { previousDataMap };
    },

    onSuccess: (data) => {
      // Invalidate the cache to trigger a re-fetch
      queryClient.invalidateQueries({ queryKey: ["meals"] });
      // Show success toast
      showCustomToast({
        status: "success",
        title: data.message || "Meal deleted successfully",
      });
    },

    onError: (err, _, context) => {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data.message || "An error occurred";
        showCustomToast({
          status: "error",
          title: errorMessage,
        });
      }

      Object.entries(context?.previousDataMap || {}).forEach(([key, value]) => {
        queryClient.setQueryData(JSON.parse(key), value);
      });
    },
  });
};
