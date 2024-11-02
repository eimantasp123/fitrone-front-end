import { useDisclosure, useMediaQuery } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import DrawerForFilter from "./components/client/DrawerForFilter";
import HeaderFilters from "./components/client/HeaderFilters";
import MealDashboardHeader from "./components/client/MealDashboardHeader";
import { MealPlanCard } from "./components/client/MealPlanCard";

const options = [
  "Denmark",
  "Sweden",
  "Norway",
  "denmark1",
  "sweden1",
  "norway1",
  "denmark2",
  "sweden2",
  "norway2",
  "denmark3",
  "sweden4",
  "norway5",
];

const mealPlans = Array(12).fill({
  id: 123456,
  title: "Plan Name and Description",
  supplier: "HealthyLife Meals",
  calories: 1600,
  protein: 120,
  carbs: 100,
  fats: 60,
  price: 10,
  weeklyPlan: 70,
  location: "Šiauliai",
  rating: 4.5,
});

export default function MealPlanDashboard({ details }) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");

  // Close the drawer when the screen size exceeds the md breakpoint
  useEffect(() => {
    if (isLargerThanMd && isOpen) {
      onClose();
    }
  }, [isLargerThanMd, isOpen, onClose]);

  return (
    <>
      <div className="container mx-auto flex w-full max-w-[1500px] flex-col overflow-y-auto pb-0 text-center scrollbar-thin 3xl:mt-6">
        <div className="sticky top-0 z-10 bg-backgroundSecondary p-2 md:p-4 md:pb-2">
          <div className="hidden select-none flex-col rounded-lg border bg-background shadow-sm md:flex">
            {/* Top Header */}
            <MealDashboardHeader details={details} />
            {/* Filters */}
            <HeaderFilters options={options} />
          </div>
          {/* Drawer for filter on mobile device */}
          <div className="md:hidden">
            <button
              onClick={onOpen}
              className="w-full rounded-lg border bg-background py-2 text-textPrimary"
            >
              Filters & Meal balance
            </button>
            <DrawerForFilter
              isOpen={isOpen}
              onClose={onClose}
              details={details}
              options={options}
            />
          </div>
        </div>
        {/* Meal plans cards */}
        <div className="mx-2 grid grid-cols-1 gap-4 px-2 pb-8 pt-2 xl:grid-cols-2">
          {mealPlans.map((mealPlan, index) => (
            <MealPlanCard key={index} {...mealPlan} />
          ))}
        </div>
      </div>
    </>
  );
}

MealPlanDashboard.propTypes = {
  details: PropTypes.object,
};
