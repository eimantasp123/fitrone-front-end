import InfoCard from "./InfoCard";
import { FaBurn, FaTachometerAlt } from "react-icons/fa";
import { BiCircle } from "react-icons/bi";
import { AiOutlineBarChart } from "react-icons/ai";
import { GoGoal } from "react-icons/go";
import { Tooltip, useDisclosure } from "@chakra-ui/react";
import PropTypes from "prop-types";
import DraweForBalance from "./DraweForBalance";
import { CiEdit } from "react-icons/ci";

export default function MealDashboardHeader({ details }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();

  if (Object.keys(details).length === 0) return null;

  const { planBalance } = details;
  const { nutritionInfo } = details.planBalance;

  const fitnessGoal = planBalance.fitnessGoal
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase());

  return (
    <div className="flex flex-col items-center justify-between gap-0 border-b-[1px] border-borderColor md:flex-row md:gap-5">
      <div className="flex flex-grow flex-wrap gap-2 py-2 lg:gap-4">
        {/* Kcal */}
        <InfoCard
          value={nutritionInfo.kcal}
          title="Daily calorie goal"
          unit="kcal"
          icon={<FaBurn className="text-red-500" />}
          description="Your daily calorie target reflects the energy your body needs to achieve your fitness goals, whether that’s weight loss, muscle gain, or maintenance. Staying within this range ensures you’re fueling your body properly while making progress towards your goal."
        />

        {/* Protein */}
        <InfoCard
          value={nutritionInfo.protein}
          title="Daily Protein Goal"
          unit="g."
          icon={<BiCircle className="text-green-600" />}
          description="Protein is essential for muscle growth, repair, and recovery. Meeting your daily protein intake helps build lean muscle and supports a healthy metabolism, especially when paired with regular exercise."
        />

        {/* Carbs */}
        <InfoCard
          value={nutritionInfo.carbs}
          title="Daily Carbohydrate Goal"
          unit="g."
          icon={<FaTachometerAlt className="text-sky-500" />}
          description="Carbohydrates provide the energy needed to power your workouts and daily activities. Consuming the right amount helps fuel performance, while maintaining balance aids in achieving fat loss or muscle gain."
        />

        {/* Fats */}
        <InfoCard
          value={nutritionInfo.fat}
          title="Daily Fat Goal"
          unit="g."
          icon={<AiOutlineBarChart className="text-yellow-500" />}
          description="Healthy fats are vital for hormone production and overall health. Hitting your daily fat target ensures proper nutrient absorption and supports metabolism, helping you reach your fitness objectives."
        />

        {/* Fitness goal */}
        <InfoCard
          value={fitnessGoal}
          title="Fitness Goal"
          icon={<GoGoal className="text-textPrimary" />}
        />
      </div>

      {/* Edit */}
      <div className="">
        <Tooltip
          isOpen={isOpen}
          sx={{ fontSize: "14px" }}
          label="Edit meal balance"
          fontSize="md"
          placement="auto"
        >
          <button
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            onClick={drawerOnOpen}
            className="border-border right-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border bg-background text-textPrimary shadow-custom-light2 transition-colors duration-200 ease-in-out"
          >
            <CiEdit className="text-md" />
          </button>
        </Tooltip>
      </div>
      {/* Drawer for edit balance */}
      <DraweForBalance
        headerTitle="Edit Your Meal Balance"
        isOpen={drawerIsOpen}
        onClose={drawerOnClose}
      />
    </div>
  );
}

MealDashboardHeader.propTypes = {
  details: PropTypes.object,
};
