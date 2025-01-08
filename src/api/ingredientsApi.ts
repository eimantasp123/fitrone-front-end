import axiosInstance from "@/utils/axiosInterceptors";
import {
  IngredientToCreateOrUpdate,
  PaginatedIngredientsResponse,
} from "@/utils/types";
import { QueryFunctionContext, QueryKey } from "@tanstack/react-query";

/**
 * Fetch paginated ingredients from the server
 */
export const fetchPaginatedIngredients = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<QueryKey>) => {
  const [, searchQuery] = queryKey;
  const response = await axiosInstance.get<PaginatedIngredientsResponse>(
    "ingredients",
    {
      params: { query: searchQuery, page: pageParam, limit: 51 },
    },
  );
  return response.data;
};

/**
 *  Delete an ingredient from the server
 */
export const deleteIngredientApi = async (id: string) => {
  const response = await axiosInstance.delete(`ingredients/${id}`);
  return response.data;
};

/**
 * Update an ingredient on the server
 */
export const updateIngredientApi = async (
  ingredientId: string,
  data: IngredientToCreateOrUpdate,
) => {
  const response = await axiosInstance.put(`ingredients/${ingredientId}`, data);
  return response.data;
};

/**
 * Create a new ingredient on the server
 */
export const createIngredientApi = async (data: IngredientToCreateOrUpdate) => {
  const response = await axiosInstance.post("ingredients", data);
  return response.data;
};

/**
 * Search for ingredients using AI
 */
export const searchIngredientsApi = async ({
  query,
  unit,
}: {
  query: string;
  unit: string;
}) => {
  const response = await axiosInstance.post("ingredients/search-ai", {
    query,
    unit,
  });
  return response.data;
};

/**
 * Search ingredient from the database
 */
export const searchIngredientFromDatabaseApi = async (query: string) => {
  const response = await axiosInstance.get("ingredients/search", {
    params: { query },
  });
  return response.data;
};

/**
 * Get ingredient nutrition from the server
 */
export const getIngredientNutritionApi = async ({
  ingredientId,
  currentAmount,
}: {
  ingredientId: string;
  currentAmount: string;
}) => {
  const response = await axiosInstance.get(
    `ingredients/nutrition/${ingredientId}`,
    {
      params: { currentAmount },
    },
  );
  return response.data;
};
