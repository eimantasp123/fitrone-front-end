import axiosInstance from "@/utils/axiosInterceptors";

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
