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
      limit: 6,
      query: searchQuery,
      category,
      preference,
      restriction,
    },
  });
  return response.data;
};
