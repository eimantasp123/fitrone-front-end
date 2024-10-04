import { useColorMode, useDisclosure } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import PrimaryButtonWithLink from "../../components/common/PrimaryButtonWithLink";
import SupportModal from "../../components/SupportModal";

export default function DefaultMealPlan() {
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <>
      <div
        className={`relative flex h-full min-h-[650px] w-full flex-col justify-center rounded-2xl border-[1.5px] ${
          colorMode === "dark" ? "border-primary" : "border-neutral-400"
        } border-dashed bg-background p-6`}
      >
        <div className="flex max-w-[1300px] flex-col items-center self-center">
          <h1 className="mb-6 text-2xl font-semibold text-textPrimary md:text-3xl">
            Ready to Create Your Personalized Meal Plan?
          </h1>
          <p className="mb-10 text-center text-textSecondary">
            Building the perfect meal plan has never been easier! Our
            step-by-step guide will help you craft a nutrition plan tailored to
            your body, your goals, and your preferences. Whether you’re aiming
            to lose weight, gain muscle, or maintain balance, we’ve got you
            covered.
          </p>
          <h4 className="mb-2 mt-5 text-start text-xl font-semibold">
            Follow These Easy Steps to Get Started:
          </h4>

          <div className="my-5 flex gap-8 pl-4">
            {/*  */}
            <div className="flex w-1/3 flex-col items-center gap-2 rounded-xl border border-borderColor p-6 text-textSecondary shadow-custom-light2">
              <div className="mb-2 flex size-8 items-center justify-center rounded-full border border-borderColor bg-primary text-black shadow-custom-light2">
                <span className="font-semibold">1</span>
              </div>
              <h4 className="font-semibold text-textPrimary">
                Calculate Your Daily Calorie Needs
              </h4>{" "}
              <p>
                We’ll determine how many calories you need to meet your fitness
                goals. Just enter your basic details like age, weight, and
                activity level, and we’ll do the rest!
              </p>
            </div>
            {/*  */}
            <div className="flex w-1/3 flex-col items-center gap-2 rounded-xl border border-borderColor p-6 text-textSecondary shadow-custom-light2">
              <div className="mb-2 flex size-8 items-center justify-center rounded-full border border-borderColor bg-primary text-black shadow-custom-light2">
                <span className="font-semibold">2</span>
              </div>
              <h4 className="font-semibold text-textPrimary">
                Customize Your Meals
              </h4>{" "}
              <p>
                Choose meals for breakfast, lunch, dinner, and snacks. You can
                either create your own recipes or let our AI suggest balanced,
                delicious meals based on your preferences and dietary needs.
              </p>
            </div>
            {/*  */}
            <div className="flex w-1/3 flex-col items-center gap-2 rounded-xl border border-borderColor p-6 text-textSecondary shadow-custom-light2">
              <div className="mb-2 flex size-8 items-center justify-center rounded-full border border-borderColor bg-primary text-black shadow-custom-light2">
                <span className="font-semibold">3</span>
              </div>
              <h4 className="font-semibold text-textPrimary">Save and Track</h4>{" "}
              <p>
                Once your plan is ready, save it and start tracking your daily
                progress. We’ll help you stay on course by monitoring your
                activity, adjusting your plan as needed, and keeping you
                motivated.
              </p>
            </div>
          </div>

          <PrimaryButtonWithLink
            to="/meal-plan-balance"
            text="Start Creating My Meal Plan"
            className="mt-8 w-80 py-3 text-center shadow-custom-light2"
          />

          <p className="absolute bottom-6 left-1/2 mt-4 -translate-x-1/2 text-center text-textSecondary">
            Need help? Contact{" "}
            <span
              onClick={onOpen}
              className="cursor-pointer font-semibold text-textPrimary"
            >
              Support
            </span>{" "}
            or check our
            <NavLink to="/faq" className="font-semibold text-textPrimary">
              {" "}
              FAQ{" "}
            </NavLink>
            section.
          </p>
        </div>
      </div>
      <SupportModal isModalOpen={isModalOpen} onClose={onClose} />
    </>
  );
}
