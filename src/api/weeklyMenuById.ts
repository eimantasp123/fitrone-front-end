import axiosInstance from "@/utils/axiosInterceptors";

/**
 * Fetch weekly menu by id
 */
export const fetchWeeklyMenuById = async (id: string) => {
  const response = await axiosInstance.get(`weekly-menu/${id}`);
  return response.data;
};

/**
 * Delete meal from current day
 */
export const deleteMealFromCurrentDay = async ({
  mealObjectInArrayId,
  dayId,
  weeklyMenuId,
}: {
  mealObjectInArrayId: string;
  dayId: string;
  weeklyMenuId: string;
}) => {
  const response = await axiosInstance.delete(
    `weekly-menu/${weeklyMenuId}/meal`,
    {
      params: {
        mealObjectInArrayId,
        dayId,
      },
    },
  );
  return response.data;
};

/**
 * Add meals to current day
 */
export const addMealsToCurrentDay = async ({
  meals,
  dayId,
  weeklyMenuId,
}: {
  meals: string[] | null;
  dayId: string | null;
  weeklyMenuId: string;
}) => {
  const response = await axiosInstance.post(
    `weekly-menu/${weeklyMenuId}/meal`,
    {
      meals,
      dayId,
    },
  );
  return response.data;
};
