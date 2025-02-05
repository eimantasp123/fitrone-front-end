import axiosInstance from "@/utils/axiosInterceptors";
import { QueryKey } from "@tanstack/react-query";

/**
 * Set timezone for the user
 */
export const setTimeZone = async (timezone: string) => {
  const response = await axiosInstance.patch("week-plan/set-timezone", {
    timezone,
  });
  return response.data;
};

/**
 * Fetch week plan for the current week
 */
export const fetchWeekPlan = async (year: number, weekNumber: number) => {
  const response = await axiosInstance.get(
    `week-plan?year=${year}&week=${weekNumber}`,
  );
  return response.data;
};

/**
 * Update the week plan with the selected menu
 */
export const updateWeekPlan = async (
  selectedMenu: string[],
  weekPlanId: string,
) => {
  const response = await axiosInstance.patch(
    `week-plan/${weekPlanId}/assign-menu`,
    {
      menus: selectedMenu,
    },
  );
  return response.data;
};

/**
 * Delete the week plan
 */
export const deleteWeekPlan = async (
  year: number,
  week: number,
  menuId: string,
) => {
  const response = await axiosInstance.delete(`week-plan/delete-menu`, {
    params: {
      menuId,
      year,
      week,
    },
  });
  return response.data;
};

/**
 * Manage publish week plan
 */
export const managePublishWeekPlan = async (
  year: number,
  week: number,
  menuId: string,
  publish: boolean,
) => {
  const response = await axiosInstance.patch(`week-plan/manage-publish-menu`, {
    year,
    week,
    menuId,
    publish,
  });
  return response.data;
};

/**
 * Get the week plan menu details
 */
export const fetchCurrentWeekPlanMenuDetails = async ({
  queryKey,
}: {
  queryKey: QueryKey;
}) => {
  const [, weekPlanId, weekPlanMenuId] = queryKey;
  const response = await axiosInstance.get(
    `week-plan/${weekPlanId}/menu-details/${weekPlanMenuId}`,
  );
  return response.data;
};

/**
 * Assign clients to the week plan menu
 */
export const assignClientsToWeekPlanMenu = async ({
  weekPlanId,
  weekPlanMenuId,
  clients,
}: {
  weekPlanId: string;
  weekPlanMenuId: string;
  clients: string[];
}) => {
  const response = await axiosInstance.patch(
    `week-plan/${weekPlanId}/assign-clients`,
    {
      menuId: weekPlanMenuId,
      clients,
    },
  );
  return response.data;
};

/**
 * Remove client from the week plan menu
 */
export const removeClientFromWeekPlanMenu = async ({
  weekPlanId,
  weekPlanMenuId,
  clientId,
}: {
  weekPlanId: string;
  weekPlanMenuId: string;
  clientId: string;
}) => {
  const response = await axiosInstance.patch(
    `week-plan/${weekPlanId}/remove-client`,
    {
      menuId: weekPlanMenuId,
      clientId,
    },
  );
  return response.data;
};

/**
 * Assign group to the week plan menu
 */
export const assignGroupToWeekPlanMenu = async ({
  weekPlanId,
  weekPlanMenuId,
  groupId,
}: {
  weekPlanId: string;
  weekPlanMenuId: string;
  groupId: string;
}) => {
  const response = await axiosInstance.patch(
    `week-plan/${weekPlanId}/assign-group`,
    {
      menuId: weekPlanMenuId,
      groupId,
    },
  );
  return response.data;
};

/**
 * Remove group from the week plan menu
 */
export const removeGroupFromWeekPlanMenu = async ({
  weekPlanId,
  weekPlanMenuId,
  groupId,
}: {
  weekPlanId: string;
  weekPlanMenuId: string;
  groupId: string;
}) => {
  const response = await axiosInstance.patch(
    `week-plan/${weekPlanId}/remove-group`,
    {
      menuId: weekPlanMenuId,
      groupId,
    },
  );
  return response.data;
};
