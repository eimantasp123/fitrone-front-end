import useTime from "@/pages/WeeklyPlan/useTime";
import { useAppSelector } from "@/store";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the shape of the context
interface WeekOrderContextType {
  week: number;
  currentYear: number;
  formattedWeekRange: string;
  navigateWeeks: (weeks: number) => void;
}

// Create the context with an initial undefined value
const WeekOrderContext = createContext<WeekOrderContextType | undefined>(
  undefined,
);

// Create the provider component
export const WeekOrderProvider = ({ children }: { children: ReactNode }) => {
  const { details: user } = useAppSelector((state) => state.personalDetails);
  const [week, setWeek] = useState(1);
  const [currentYear, setCurrentYear] = useState(2025);
  const { weekNumber, formattedWeekRange, year, navigateWeeks } = useTime(
    user.timezone ?? null,
  );

  // Function to set the week and year when navigating
  useEffect(() => {
    setWeek(weekNumber);
    setCurrentYear(year);
  }, [weekNumber, year]);

  return (
    <WeekOrderContext.Provider
      value={{ week, formattedWeekRange, currentYear, navigateWeeks }}
    >
      {children}
    </WeekOrderContext.Provider>
  );
};

// Custom hook to use the context
export const useWeekOrder = (): WeekOrderContextType => {
  const context = useContext(WeekOrderContext);
  if (!context) {
    throw new Error("useWeekOrder must be used within a WeekOrderProvider");
  }
  return context;
};
