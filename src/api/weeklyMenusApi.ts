import axiosInstance from "@/utils/axiosInterceptors";
import { CreateWeeklyMenuModalForm } from "@/utils/types";
import { QueryFunctionContext, QueryKey } from "@tanstack/react-query";

/**
 * Fetches all meals from the API
 */
export const fetchPaginatedWeeklyMenus = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<QueryKey>) => {
  const [, searchQuery, archived, preference, restriction] = queryKey;
  const response = await axiosInstance.get("weekly-menu", {
    params: {
      page: pageParam,
      limit: 20,
      query: searchQuery,
      archived: archived,
      preference: preference,
      restriction: restriction,
    },
  });
  return response.data;
};

/**
 * Delete weekly menu
 */
export const deleteWeeklyMenuApi = async (id: string) => {
  const response = await axiosInstance.delete(`weekly-menu/${id}`);
  return response.data;
};

/**
 * Archive weekly menu
 */
export const archiveWeeklyMenuApi = async (id: string) => {
  const response = await axiosInstance.patch(`weekly-menu/archive/${id}`);
  return response.data;
};

/**
 * Unarchive weekly menu
 */
export const unarchiveWeeklyMenuApi = async (id: string) => {
  const response = await axiosInstance.patch(`weekly-menu/unarchive/${id}`);
  return response.data;
};

/**
 * Create weekly menu
 */
export const createWeeklyMenuApi = async (data: CreateWeeklyMenuModalForm) => {
  const response = await axiosInstance.post("weekly-menu", data);
  return response.data;
};

/**
 * Create a copy of the weekly menu
 */
export const createCopyWeeklyMenuApi = async (id: string) => {
  const response = await axiosInstance.post(`weekly-menu/copy/${id}`);
  return response.data;
};

/**
 * Update weekly menu
 */
export const updateWeeklyMenuApi = async ({
  id,
  data,
}: {
  id: string;
  data: CreateWeeklyMenuModalForm;
}) => {
  const response = await axiosInstance.patch(`weekly-menu/${id}`, data);
  return response.data;
};
