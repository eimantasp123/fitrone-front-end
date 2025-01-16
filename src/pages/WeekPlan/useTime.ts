import { formatDate } from "@/utils/helper";
import {
  addWeeks,
  endOfWeek,
  format,
  getISOWeek,
  getYear,
  startOfWeek,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { enUS, lt } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";

// Validate the timezone
const validateTimeZone = (timezone: string | null): string => {
  try {
    if (!timezone) {
      return "UTC"; // Fallback to UTC
    }
    Intl.DateTimeFormat(undefined, { timeZone: timezone }).resolvedOptions();
    return timezone;
  } catch {
    return "UTC"; // Fallback to UTC
  }
};

/**
 * Hook for managing the time and week navigation
 */
const useTime = (timezone: string | null) => {
  // Validate the timezone
  const validatedTimezone = validateTimeZone(timezone);

  // Formatted week range
  const [formattedWeekRange, setFormattedWeekRange] = useState<string>("");

  // Initialize with the current date in the user's timezone
  const [currentDate, setCurrentDate] = useState<Date>(
    toZonedTime(new Date(), validatedTimezone),
  );

  // Get the locale
  const lng = localStorage.getItem("i18nextLng");
  const locale = lng === "lt-LT" ? lt : enUS;

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

  // Get the week number and year
  const weekNumber = useMemo(() => getISOWeek(currentDate), [currentDate]);
  const year = useMemo(() => getYear(currentDate), [currentDate]);

  // Navigate weeks based on the offset
  const navigateWeeks = (offset: number) => {
    const newDate = addWeeks(currentDate, offset);
    setCurrentDate(newDate);
  };

  // Update current date whenever the timezone changes
  useEffect(() => {
    setCurrentDate(toZonedTime(new Date(), validatedTimezone));
  }, [validatedTimezone]);

  // Update formatted week range
  useEffect(() => {
    const formattedStart = format(weekStart, "dd MMMM", { locale });
    const formattedEnd = format(weekEnd, "dd MMMM", { locale });
    setFormattedWeekRange(
      `${formatDate(formattedStart)} - ${formatDate(formattedEnd)}`,
    );
  }, [weekStart, weekEnd, locale]);

  return { weekNumber, formattedWeekRange, year, navigateWeeks };
};

export default useTime;
