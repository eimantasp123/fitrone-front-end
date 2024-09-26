import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorPageForLayout from "../../components/ErrorPageForLayout";
import { getDietPlanDetails } from "../../services/reduxSlices/DietPlan/dietPlanDetailsSlice";
import MealPlanStatus from "./MealPlanStatus";

export default function GeneralMealPlansController() {
  const { details, loading, lastFetched } = useSelector(
    (state) => state.dietPlanDetails,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const tenMinutes = 10 * 60 * 1000; // 10 minutes
    const shouldFetch =
      !details ||
      Object.keys(details).length === 0 ||
      Date.now() - lastFetched > tenMinutes;
    if (shouldFetch) {
      dispatch(getDietPlanDetails());
    }
  }, [dispatch, details, lastFetched]);

  return (
    <>
      <div className="container mx-auto h-[calc(100dvh-5rem)] max-h-[800px] w-full max-w-[1500px] p-6">
        {loading ? (
          <div className="flex h-full items-center justify-center text-center">
            <Spinner size="lg" speed="0.65s" />
          </div>
        ) : details.status === "none" ? (
          <MealPlanStatus
            title="No Meal Plan Yet!"
            description="It looks like you haven’t prepared a meal plan yet. To get started, simply fill out the form below, and we’ll help create a personalized plan tailored to your nutritional needs."
            buttonText="Create Meal Plan"
            buttonLink="/meal-plan-form"
            additionalInfo="Not sure where to start? You can consult with a nutritionist to help you determine the best meal plan for your goals. Upgrade to our premium plan to access personalized meal plans, expert guidance, and more."
          />
        ) : details.status === "pending" ? (
          <MealPlanStatus
            title="Your Meal Plan Request Has Been Submitted!"
            description="Thank you for submitting your personalized diet plan request. Our certified nutritionists and trainers are now reviewing the details you provided. Once your meal plan is ready, you’ll receive an email notification, and you’ll be able to access your plan right here."
            additionalInfo="Please check back soon, and feel free to reach out to our support team if you have any questions in the meantime."
          />
        ) : details.status === "approved" ? (
          <div>Diet plans is ready</div>
        ) : details.status === "rejected" ? (
          <ErrorPageForLayout
            title="Meal Plan Submission Unsuccessful"
            description="Unfortunately, your meal plan was not approved. Don’t worry, you can review your submission and create a new plan tailored to your needs. Let's try again!"
            buttonText="Create Meal Plan"
            buttonLink="/meal-plan-form"
          />
        ) : (
          <ErrorPageForLayout
            title="Error: No Meal Plan Found"
            description=" Oops! It seems like there is no meal plan available. You can create a
        new meal plan or go back to the dashboard and try again."
            buttonText="Go to dashboard"
            buttonLink="/"
          />
        )}
      </div>
    </>
  );
}
