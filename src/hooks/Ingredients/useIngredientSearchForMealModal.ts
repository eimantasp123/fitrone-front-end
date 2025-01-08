import {
  getIngredientNutritionApi,
  searchIngredientFromDatabaseApi,
} from "@/api/ingredientsApi";
import {
  IngredientsForMealModal,
  SearchResultFromDatabase,
} from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { showCustomToast } from "../showCustomToast";

interface UseIngredientSearchForMealModal {
  setIngredients: React.Dispatch<
    React.SetStateAction<IngredientsForMealModal[]>
  >;
  onClose: () => void;
  setSearchResults: React.Dispatch<
    React.SetStateAction<SearchResultFromDatabase[]>
  >;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}
/**
 * Hook to search for ingredients for the meal modal
 */
export const useIngredientSearchForMealModal = ({
  setIngredients,
  onClose,
  setSearchResults,
  setShowResults,
  setSearchQuery,
}: UseIngredientSearchForMealModal) => {
  const searchMutation = useMutation({
    mutationFn: async (searchQuery: string) => {
      return searchIngredientFromDatabaseApi(searchQuery);
    },
    onSuccess: (data) => {
      // Set the search results
      setSearchResults((prevResults) => [...prevResults, ...data.data]);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data.message || "An error occurred";
        showCustomToast({
          status: "error",
          description: errorMessage,
        });
      }
    },
  });

  const acceptSearchResult = useMutation({
    mutationFn: async ({
      ingredientId,
      currentAmount,
    }: {
      ingredientId: string;
      currentAmount: string;
    }) => {
      // Fetch the ingredient from the server
      return getIngredientNutritionApi({ ingredientId, currentAmount });
    },

    onSuccess: (data) => {
      setIngredients((prevIngredients) => [...prevIngredients, data.data]);
      setShowResults(false);
      setSearchQuery("");
      setSearchResults([]);
      onClose();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data.message || "An error occurred";
        showCustomToast({
          status: "error",
          description: errorMessage,
        });
      }
    },
  });

  return { searchMutation, acceptSearchResult };
};
