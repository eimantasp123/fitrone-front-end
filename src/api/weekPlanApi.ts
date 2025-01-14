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
