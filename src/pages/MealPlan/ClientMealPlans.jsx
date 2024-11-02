import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDietPlanBalance } from "../../services/reduxSlices/DietPlan/dietPlanDetailsSlice";
import MealPlanDashboard from "./MealPlanDashboard";
import NoBalance from "./components/client/NoBalance";

export default function ClientMealPlans() {
  const { details, lastFetched, loading } = useSelector(
    (state) => state.dietPlanDetails,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !Object.keys(details).length ||
      lastFetched < Date.now() - 1000 * 60 * 10
    ) {
      dispatch(getDietPlanBalance());
    }
  }, [dispatch, details, lastFetched]);

  return (
    <>
      {loading ? (
        <div className="mt-60 flex w-full items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : details.status === "none" ? (
        <NoBalance />
      ) : (
        <MealPlanDashboard details={details} />
      )}
    </>
  );
}
