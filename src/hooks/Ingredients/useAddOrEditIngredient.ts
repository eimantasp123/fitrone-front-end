import { createIngredientApi, updateIngredientApi } from "@/api/ingredientsApi";
import {
  IngredientsForMealModal,
  IngredientToCreateOrUpdate,
} from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

interface UseAddOrEditIngredientProps {
  editIngredientId?: string | null;
  setIngredients?: React.Dispatch<
    React.SetStateAction<IngredientsForMealModal[]>
  >;
  setShowResults?: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
  setSearchResults?: React.Dispatch<
    React.SetStateAction<IngredientToCreateOrUpdate[]>
  >;
  closeModal?: () => void;
}

/**
 * useAddOrEditIngredient hook to add or edit an ingredient
 */
export const useAddOrEditIngredient = ({
  editIngredientId = null,
  setIngredients,
  closeModal,
  setShowResults,
  setSearchQuery,
  setSearchResults,
}: UseAddOrEditIngredientProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IngredientToCreateOrUpdate) => {
      // Send data to backend
      if (editIngredientId) {
        return updateIngredientApi(editIngredientId, data);
      } else {
        return createIngredientApi(data);
      }
    },
    onSuccess: (response) => {
      const { status, message, warning, data } = response;

      // Perform actions based on success status
      if (status === "success") {
        // Add ingredient to the list on meal modal
        if (setIngredients) {
          setIngredients((prev) => [...prev, data]);
        }

        // Show success or warning toast
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

        // Invalidate the ingredients query
        queryClient.invalidateQueries({ queryKey: ["ingredients"] });

        // Close the modal
        if (closeModal) closeModal();
      }

      // Show info toast if limit reached
      if (status === "limit_reached") {
        showCustomToast({
          status: "info",
          title: message,
        });
      }

      // Clear search results
      if (setShowResults) setShowResults(false);

      // Clear search query and results
      if (setSearchQuery) setSearchQuery("");

      // Clear search results
      if (setSearchResults) setSearchResults([]);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        showCustomToast({
          status: "error",
          description: error.response.data.message,
        });
      }
    },
  });
};
