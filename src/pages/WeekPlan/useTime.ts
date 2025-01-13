import { useEffect, useMemo, useState } from "react";
import { enUS, lt } from "date-fns/locale";
import { addWeeks, endOfWeek, format, getISOWeek, startOfWeek } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { formatDate } from "@/utils/helper";

// Validate the timezone
const validateTimeZone = (timezone: string): string => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone }).resolvedOptions();
    return timezone;
  } catch {
    return "UTC"; // Fallback to UTC
  }
};

/**
 * Hook for managing the time and week navigation
 */
const useTime = (timezone: string) => {
  // Validate the timezone
  const validatedTimezone = validateTimeZone(timezone);

  // Initialize with the current date in the user's timezone
  const [currentDate, setCurrentDate] = useState<Date>(
    toZonedTime(new Date(), validatedTimezone),
  );
  const [formattedWeekRange, setFormattedWeekRange] = useState<string>("");
  const [backendDateRange, setBackendDateRange] = useState<{
    startDate: string;
    endDate: string;
  } | null>(null);

  // Get the locale
  const lng = localStorage.getItem("i18nextLng");
  const locale = lng === "lt" ? lt : enUS;

  console.log("currenrDate:", currentDate);
  // Derived state for week start
  const weekStart = useMemo(
    () => startOfWeek(currentDate, { weekStartsOn: 1 }),
    [currentDate],
  );

  // Derived state for week end
  const weekEnd = useMemo(
    () => endOfWeek(currentDate, { weekStartsOn: 1 }),
    [currentDate],
  );

  // Get the week number
  const weekNumber = useMemo(() => getISOWeek(currentDate), [currentDate]);

  // Navigate weeks based on the offset
  const navigateWeeks = (offset: number) => {
    const newDate = addWeeks(currentDate, offset);
    setCurrentDate(newDate);
  };

  // Update formatted week range
  useEffect(() => {
    const formattedStart = format(weekStart, "dd MMMM", { locale });
    const formattedEnd = format(weekEnd, "dd MMMM", { locale });
    setFormattedWeekRange(
      `${formatDate(formattedStart)} - ${formatDate(formattedEnd)}`,
    );
  }, [weekStart, weekEnd, locale]);

  // Update backend-friendly date range
  useEffect(() => {
    const startFormatted = fromZonedTime(weekStart, validatedTimezone);
    const endFormatted = fromZonedTime(weekEnd, validatedTimezone);
    setBackendDateRange({
      startDate: startFormatted.toISOString(),
      endDate: endFormatted.toISOString(),
    });
  }, [weekStart, weekEnd, validatedTimezone]);

  return { weekNumber, formattedWeekRange, backendDateRange, navigateWeeks };
};

export default useTime;
