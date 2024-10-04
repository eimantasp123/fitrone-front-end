import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDietPlanDetails } from "../../services/reduxSlices/DietPlan/dietPlanDetailsSlice";
import DefaultMealPlan from "../MealPlanForm/DefaultMealPlan";
import DietPlanDashboard from "./DietPlanDashboard";

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
      {loading ? (
        <div className="container mx-auto h-[calc(100dvh-5rem)] max-h-[800px] w-full max-w-[1500px] overflow-y-auto p-4 text-center scrollbar-none 3xl:mt-6">
          <div className="flex h-full items-center justify-center text-center">
            <Spinner size="lg" speed="0.65s" />
          </div>
        </div>
      ) : details && details.status === "none" ? (
        <div className="container mx-auto h-[calc(100dvh-5rem)] max-h-[800px] w-full max-w-[1500px] overflow-y-auto p-4 text-center scrollbar-none 3xl:mt-6">
          <DefaultMealPlan />
        </div>
      ) : (
        <DietPlanDashboard details={details} />
      )}
    </>
  );
}
