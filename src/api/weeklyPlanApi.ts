import axiosInstance from "@/utils/axiosInterceptors";
import { QueryKey } from "@tanstack/react-query";

/**
 * Set timezone for the user
 */
export const setTimeZone = async (timezone: string) => {
  const response = await axiosInstance.patch("weekly-plan/set-timezone", {
    timezone,
  });
  return response.data;
};

/**
 * Fetch week plan for the current week
 */
export const fetchWeeklyPlan = async (year: number, weekNumber: number) => {
  const response = await axiosInstance.get(
    `weekly-plan?year=${year}&week=${weekNumber}`,
  );
  return response.data;
};

/**
 * Update the weekly plan with the selected menu
 */
export const updateWeeklyPlan = async (
  selectedMenu: string[],
  weeklyPlanId: string,
) => {
  const response = await axiosInstance.patch(
    `weekly-plan/${weeklyPlanId}/assign-menu`,
    {
      menus: selectedMenu,
    },
  );
  return response.data;
};

/**
 * Delete the weekly plan
 */
export const deleteWeeklyPlan = async (
  year: number,
  week: number,
  menuId: string,
) => {
  const response = await axiosInstance.delete(`weekly-plan/delete-menu`, {
    params: {
      menuId,
      year,
      week,
    },
  });
  return response.data;
};

/**
 * Manage publish weekly plan
 */
export const managePublishWeeklyPlan = async (
  year: number,
  week: number,
  menuId: string,
  publish: boolean,
) => {
  console.log("menuId", menuId);
  const response = await axiosInstance.patch(
    `weekly-plan/manage-publish-menu`,
    {
      year,
      week,
      menuId,
      publish,
    },
  );
  return response.data;
};

/**
 * Get the weekly plan menu details
 */
export const fetchCurrentWeeklyPlanMenuDetails = async ({
  queryKey,
}: {
  queryKey: QueryKey;
}) => {
  const [, weekPlanId, weekPlanMenuId] = queryKey;
  const response = await axiosInstance.get(
    `weekly-plan/${weekPlanId}/menu-details/${weekPlanMenuId}`,
  );
  return response.data;
};

/**
 * Assign clients to the weekly plan menu
 */
export const assignClientsToWeeklyPlanMenu = async ({
  weeklyPlanId,
  weeklyPlanMenuId,
  clients,
}: {
  weeklyPlanId: string;
  weeklyPlanMenuId: string;
  clients: string[];
}) => {
  const response = await axiosInstance.patch(
    `weekly-plan/${weeklyPlanId}/assign-clients`,
    {
      menuId: weeklyPlanMenuId,
      clients,
    },
  );
  return response.data;
};

/**
 * Remove client from the weekly plan menu
 */
export const removeClientFromWeeklyPlanMenu = async ({
  weeklyPlanId,
  weeklyPlanMenuId,
  clientId,
}: {
  weeklyPlanId: string;
  weeklyPlanMenuId: string;
  clientId: string;
}) => {
  const response = await axiosInstance.patch(
    `weekly-plan/${weeklyPlanId}/remove-client`,
    {
      menuId: weeklyPlanMenuId,
      clientId,
    },
  );
  return response.data;
};

/**
 * Assign group to the weekly plan menu
 */
export const assignGroupToWeeklyPlanMenu = async ({
  weeklyPlanId,
  weeklyPlanMenuId,
  groupId,
}: {
  weeklyPlanId: string;
  weeklyPlanMenuId: string;
  groupId: string;
}) => {
  const response = await axiosInstance.patch(
    `weekly-plan/${weeklyPlanId}/assign-group`,
    {
      menuId: weeklyPlanMenuId,
      groupId,
    },
  );
  return response.data;
};

/**
 * Remove group from the weekly plan menu
 */
export const removeGroupFromWeeklyPlanMenu = async ({
  weeklyPlanId,
  weeklyPlanMenuId,
  groupId,
}: {
  weeklyPlanId: string;
  weeklyPlanMenuId: string;
  groupId: string;
}) => {
  const response = await axiosInstance.patch(
    `weekly-plan/${weeklyPlanId}/remove-group`,
    {
      menuId: weeklyPlanMenuId,
      groupId,
    },
  );
  return response.data;
};
