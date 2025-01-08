import axiosInstance from "@/utils/axiosInterceptors";
import { QueryFunctionContext, QueryKey } from "@tanstack/react-query";

/**
 * Fetches all meals from the API
 */
export const fetchPaginatedMeals = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<QueryKey>) => {
  const [, searchQuery, category, preference, restriction] = queryKey;
  const response = await axiosInstance.get("/meals", {
    params: {
      page: pageParam,
      limit: 15,
      query: searchQuery,
      category,
      preference,
      restriction,
    },
  });
  return response.data;
};

/**
 * Delete meal from the server
 */
export const deleteMealApi = async (mealId: string) => {
  const response = await axiosInstance.delete(`/meals/${mealId}`);
  return response.data;
};

/**
 * Add a new meal to the server
 */
export const createMealApi = async (data: FormData) => {
  const response = await axiosInstance.post("/meals", data);
  return response.data;
};

/**
 * Update meal details on the server
 */
export const updateMealApi = async (mealId: string, data: FormData) => {
  const response = await axiosInstance.put(`/meals/${mealId}`, data);
  return response.data;
};
