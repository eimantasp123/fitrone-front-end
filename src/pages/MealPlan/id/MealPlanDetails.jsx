import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import { BiCircle } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import {
  FaArrowLeft,
  FaBurn,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaTachometerAlt,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "../../../components/common/PrimaryButton";
import InfoCard from "../components/client/InfoCard";
import { weekMealPlan } from "../mockData/weekMealPlan";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
};

const MealPlanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrevDay = () => {
    setDirection(-1);
    setCurrentDayIndex((prev) =>
      prev === 0 ? weekMealPlan.lenght - 1 : prev - 1,
    );
  };

  const handleNextDay = () => {
    setDirection(1);
    setCurrentDayIndex((prev) =>
      prev === weekMealPlan.length - 1 ? 0 : prev + 1,
    );
  };

  const currentDay = weekMealPlan[currentDayIndex];

  useEffect(() => {
    console.log(id);
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  const openChat = () => {
    navigate(`/messages`);
  };

  return (
    <div className="container relative mx-auto h-auto w-full overflow-y-hidden">
      {/* Absolute elements */}
      <div className="sticky top-0 flex h-32 items-center bg-gradient-to-br from-black to-primary pl-16">
        <button
          className="absolute right-4 top-4 flex items-center gap-2 rounded-full border bg-white px-6 py-1 text-sm transition-colors duration-300 ease-in-out hover:bg-neutral-200 hover:text-black dark:text-black"
          onClick={goBack}
        >
          <FaArrowLeft />
          Back
        </button>
        <div className="flex items-center gap-4">
          <div
            style={{ backgroundImage: "url('/companyLogo/7pack.jpeg')" }}
            className="size-20 rounded-full bg-blue-400 bg-cover bg-center"
          ></div>
          <h4 className="text-xl font-semibold text-white">7 Pack</h4>
          <button className="rounded-full border border-white px-6 py-[5px] text-sm text-white transition-colors duration-200 ease-out hover:bg-white hover:text-black hover:dark:bg-white">
            Supplier deals
          </button>
        </div>
      </div>
      <div className="flex">
        {/* Info about supplier */}
        <div className="m-2 h-[500px] w-[30%] py-6 pl-8 pr-2">
          <h3 className="mb-2 font-semibold text-textPrimary">
            About Supplier
          </h3>
          <p className="text-textSecondary">
            7 Pack is a leading organization dedicated to delivering innovative
            solutions in the food sector. With a strong commitment to
            excellence, we focus on providing high-quality products and services
            that meet the evolving needs of our customers.
          </p>
          <h3 className="my-5 border-t-[1px] border-borderColor pt-4 font-semibold text-textPrimary">
            Contact Information
          </h3>
          <div className="mb-4 flex items-center gap-5">
            <span className="flex size-8 items-center justify-center rounded-full bg-background shadow-sm">
              <HiOutlineMail />
            </span>
            <div className="cursor-pointer leading-snug">
              <h6 className="font-semibold">Email address</h6>
              <span className="text-[15px] text-textSecondary">
                info@gmail.com
              </span>
            </div>
          </div>
          <div className="mb-4 flex items-center gap-5">
            <span className="flex size-8 items-center justify-center rounded-full bg-background shadow-sm">
              <BsTelephone />
            </span>
            <div className="cursor-pointer leading-snug">
              <h6 className="font-semibold">Phone</h6>
              <span className="text-[15px] text-textSecondary">
                +370600220054
              </span>
            </div>
          </div>
          <PrimaryButton
            onClick={openChat}
            text="Contact Supplier"
            className="px-12 py-2"
          />
        </div>
        {/* Info about meal plan */}
        <div className="flex w-full flex-col items-center gap-5 overflow-x-hidden px-10 py-4">
          {/* Buttons for slider */}
          <div>Week 32 (October 21-25d.)</div>
          <div className="flex w-full select-none justify-evenly">
            {/* Previous */}
            <div className="flex w-1/3 justify-center">
              <div
                onClick={handlePrevDay}
                className={`flex w-48 cursor-pointer items-center justify-center gap-3 ${weekMealPlan.length === 1 || currentDayIndex === 0 ? "hidden" : "block"} rounded-full bg-background py-2 shadow-custom-light4 transition-colors duration-200 ease-in hover:bg-neutral-200 dark:hover:bg-neutral-800`}
              >
                <FaLongArrowAltLeft />
                <p>
                  {
                    weekMealPlan[
                      currentDayIndex === 0
                        ? weekMealPlan.length - 1
                        : currentDayIndex - 1
                    ].day
                  }
                </p>
              </div>
            </div>
            {/* Current day */}
            <h2 className="w-1/3 text-center text-2xl font-semibold">
              {currentDay.day}
            </h2>
            {/* Next */}
            <div className="flex w-1/3 justify-center">
              <div
                onClick={handleNextDay}
                className={`flex w-48 cursor-pointer ${weekMealPlan.length === 1 || currentDayIndex === weekMealPlan.length - 1 ? "hidden" : "block"} items-center justify-center gap-3 rounded-full bg-background py-2 shadow-custom-light4 transition-colors duration-200 ease-in hover:bg-neutral-200 dark:hover:bg-neutral-800`}
              >
                <p>
                  {
                    weekMealPlan[
                      currentDayIndex === weekMealPlan.length - 1
                        ? 0
                        : currentDayIndex + 1
                    ].day
                  }
                </p>
                <FaLongArrowAltRight />
              </div>
            </div>
          </div>

          {/* Meal details */}
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={currentDayIndex}
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="custom-scrollbar-mealplan mt-1 flex h-fit max-h-[450px] w-full flex-col items-start justify-start gap-4 overflow-y-auto rounded-lg bg-background p-10 shadow-custom-light2 3xl:max-h-[700px]"
            >
              {/* Meal 1: Breakfast */}
              {currentDay.meals.map((meal, index) => (
                <div
                  key={index}
                  className="flex w-full items-center justify-between border-b border-gray-200 pb-2"
                >
                  {/* Meal Name and Calorie Count */}
                  <div className="mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{meal.meal_type}:</h3>
                      <span className="font-normal">{meal.meal_name}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-10 py-2">
                      {/* Protein */}
                      <InfoCard
                        value={meal.nutrition.protein}
                        title="Protein"
                        unit="g."
                        icon={<BiCircle className="text-green-600" />}
                        className="bg-transoparent p-0"
                        width="w-fit"
                      />

                      {/* Carbs */}
                      <InfoCard
                        value={meal.nutrition.carbs}
                        title="Carbohydrate"
                        unit="g."
                        icon={<FaTachometerAlt className="text-sky-500" />}
                        className="bg-transoparent p-0"
                        width="w-fit"
                      />

                      {/* Fats */}
                      <InfoCard
                        value={meal.nutrition.fat}
                        title="Fat"
                        unit="g."
                        icon={<AiOutlineBarChart className="text-yellow-500" />}
                        className="bg-transoparent p-0"
                        width="w-fit"
                      />
                    </div>
                  </div>
                  <InfoCard
                    value={meal.nutrition.kcal}
                    title="Calories"
                    unit="kcal"
                    icon={<FaBurn className="text-red-500" />}
                    width="w-fit"
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MealPlanDetails;
