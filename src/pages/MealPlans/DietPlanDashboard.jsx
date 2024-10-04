import { Tooltip, useDisclosure } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { AiOutlineBarChart } from "react-icons/ai"; // Example: AiOutlineBarChart
import { BiCircle } from "react-icons/bi";
import { FaBurn, FaTachometerAlt } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { Outlet } from "react-router-dom";
import PrimaryButton from "../../components/common/PrimaryButton";
import DeviceButton from "../../components/common/DeviceButton";

export default function DietPlanDashboard({ details }) {
  if (Object.keys(details).length === 0) return null;

  const { planBalance } = details;
  const { nutritionInfo } = details.planBalance;

  const fitnessGoal = planBalance.fitnessGoal
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase());

  // Meal Nutrition Info
  const mealCalories = 219;
  const mealProtein = 10;
  const mealCarbs = 20;
  const mealFat = 5;

  return (
    <div className="container mx-auto flex h-full w-full max-w-[1500px] flex-col text-center 3xl:mt-6">
      <div className="sticky top-0 flex w-full select-none flex-col bg-backgroundSecondary px-6 py-5">
        <div className="flex w-full items-center justify-center gap-4">
          {/* Kcal */}
          <NutritionInfoCard
            barColor="bg-red-500"
            mealValue={mealCalories}
            dailyValue={nutritionInfo.kcal}
            goalName="calorie"
            unit="kcal"
            icon={<FaBurn className="text-red-500" />}
            description="Your daily calorie intake goal vs. how many calories you've consumed in meals today."
          />

          {/* Protein */}
          <NutritionInfoCard
            barColor="bg-green-500"
            mealValue={mealProtein}
            dailyValue={nutritionInfo.protein}
            goalName="protein"
            unit="g."
            icon={<BiCircle className="text-green-600" />}
            description="This is your daily protein intake goal and the amount of protein you've had in meals today."
          />

          {/* Carbs */}
          <NutritionInfoCard
            barColor="bg-sky-500"
            mealValue={mealCarbs}
            dailyValue={nutritionInfo.carbs}
            goalName="carbs"
            unit="g."
            icon={<FaTachometerAlt className="text-sky-500" />}
            description="Your daily carbohydrate goal and the amount of carbs consumed in your meals today."
          />

          {/* Fats */}
          <NutritionInfoCard
            barColor="bg-yellow-500"
            mealValue={mealFat}
            dailyValue={nutritionInfo.fat}
            goalName="fat"
            unit="g."
            icon={<AiOutlineBarChart className="text-yellow-500" />}
            description="Your daily fat intake goal and the amount of fat in today's meals."
          />

          <div className="mr-5 flex items-center justify-center gap-4">
            <span className="flex size-10 items-center justify-center rounded-full bg-background shadow-custom-light">
              <GoGoal />
            </span>
            <div className="flex gap-3">
              <div className="flex flex-col items-start">
                <div className="text-nowrap text-[13px] font-semibold">
                  Fitness Goal
                </div>
                <div className="text-nowrap text-[13px]">{fitnessGoal}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Outlet */}
      <Outlet />

      {/*  */}
      <div className="flex h-screen w-full gap-5 p-5">
        <div className="w-[20%] rounded-2xl border border-borderColor p-8 shadow-custom-light">
          <h3 className="text-md font-semibold">
            How would you like to create your meal plan?
          </h3>
          <div className="mt-5 space-y-3 text-sm">
            <PrimaryButton text="Create Yourself" />
            <DeviceButton text="Generate Recipe" />
            <DeviceButton text="Fitrone AI Assistant" />
          </div>
        </div>

        <div className="w-[79%] px-5">
          <h3 className="text-xl font-bold">Choose a Meal Frequency</h3>
        </div>
      </div>
    </div>
  );
}

DietPlanDashboard.propTypes = {
  details: PropTypes.object,
};

// NutritionInfoCard Component for DietPlanDashboard
function NutritionInfoCard({
  icon,
  goalName,
  dailyValue,
  mealValue,
  barColor,
  unit,
  description,
}) {
  const { onOpen, onClose } = useDisclosure();
  return (
    <Tooltip
      sx={{ fontSize: "13px" }}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      label={description}
      padding="15px"
      fontWeight={400}
    >
      <div className="flex w-full items-center justify-center gap-4">
        <span className="flex size-10 items-center justify-center rounded-full bg-background shadow-custom-light">
          {icon}
        </span>
        <div className="flex flex-col justify-center">
          <div className="flex justify-between gap-3">
            <div className="flex flex-col items-start">
              <p className="text-[13px]">{`Daily ${goalName} goal`}</p>
              <span className="text-[15px] font-semibold">
                {dailyValue}
                <span className="pl-1">{unit}</span>
              </span>
            </div>

            <hr className="h-10 border-r border-borderColor" />

            <div className="flex flex-col items-end">
              <p className="text-[13px]">{`${goalName.charAt(0).toUpperCase() + goalName.slice(1)} in meals`}</p>
              <span className="text-[15px] font-semibold">
                {mealValue} <span>{unit}</span>
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-1 h-[5px] w-full overflow-hidden rounded-full bg-gray-300">
            <div
              className={`h-[5px] rounded-full ${barColor}`}
              style={{
                width: `${(mealValue / dailyValue) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </Tooltip>
  );
}

NutritionInfoCard.propTypes = {
  goalName: PropTypes.string,
  dailyValue: PropTypes.number,
  mealValue: PropTypes.number,
  barColor: PropTypes.string,
  iconColor: PropTypes.string,
  icon: PropTypes.element,
  unit: PropTypes.string,
  description: PropTypes.string,
};
