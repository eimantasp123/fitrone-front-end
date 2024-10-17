import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import MealDashboardHeader from "./MealDashboardHeader";

export default function DietPlanDashboard({ details }) {
  if (Object.keys(details).length === 0) return null;

  return (
    <div className="container mx-auto flex h-full w-full max-w-[1500px] flex-col text-center 3xl:mt-6">
      <div className="sticky top-0 flex select-none flex-col gap-3 bg-backgroundSecondary px-3 py-1 md:px-6">
        {/* Header */}
        <MealDashboardHeader details={details} />

        {/* Filters */}
        <div className="flex items-center justify-center gap-4">
          filters go here
        </div>
      </div>
      <Outlet />
    </div>
  );
}

DietPlanDashboard.propTypes = {
  details: PropTypes.object,
};
