import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showCustomToast } from "../showCustomToast";
import { FormMealData, IngredientsForMealModal } from "@/utils/types";
import { TFunction } from "i18next";
import { createMealApi, updateMealApi } from "@/api/mealsApi";
import axios from "axios";

interface UseAddOrEditMealProps {
  editMealId?: string | null;
  closeModal?: () => void;
  ingredients: IngredientsForMealModal[];
  category: string | null;
  preferences: string[];
  restrictions: string[];
  t: TFunction;
}

/**
 * This hook is used to add or edit a meal.
 */
export const useAddOrEditMeal = ({
  editMealId = null,
  closeModal,
  ingredients,
  category,
  preferences,
  restrictions,
  t,
}: UseAddOrEditMealProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormMealData) => {
      // Send data to backend

      if (ingredients.length === 0) {
        showCustomToast({
          status: "error",
          description: t("errors.noIngredients"),
        });
        return;
      }

      // Check if category is selected
      if (!category) {
        showCustomToast({
          status: "error",
          description: t("errors.noCategory"),
        });
        return;
      }

      // Check if preferences are selected
      const ingredientsData = ingredients.map((ingredient) => ({
        id: ingredient.ingredientId,
        currentAmount: ingredient.currentAmount,
      }));

      // Form data to send to backend
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description || "");
      formData.append("category", category);
      formData.append("ingredients", JSON.stringify(ingredientsData));
      formData.append("preferences", JSON.stringify(preferences));
      formData.append("restrictions", JSON.stringify(restrictions));

      if (data.image) {
        formData.append("image", data.image);
      }

      if (editMealId) {
        return updateMealApi(editMealId, formData);
      } else {
        return createMealApi(formData);
      }
    },
    onSuccess: (response) => {
      const { status, message, warning } = response;

      // Perform actions based on success status
      if (status === "success") {
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

        queryClient.invalidateQueries({ queryKey: ["meals"] });

        // Close modal
        if (closeModal) closeModal();
      }

      // Show info toast if limit reached
      if (status === "limit_reached") {
        showCustomToast({
          status: "info",
          title: message,
        });
      }
    },

    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data.message || "An error occurred";
        showCustomToast({
          status: "error",
          title: errorMessage,
        });
      }
    },
  });
};
