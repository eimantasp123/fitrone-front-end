import { configureStore } from "@reduxjs/toolkit";
import personalDetailsReducer from "./services/reduxSlices/Profile/personalDetailsSlice";
import dietPlanDetailsReducer from "./services/reduxSlices/DietPlan/dietPlanDetailsSlice";
import mealsPlanDetailsReducer from "./services/reduxSlices/Meals/mealDetailsSlice";

export const store = configureStore({
  reducer: {
    personalDetails: personalDetailsReducer,
    dietPlanDetails: dietPlanDetailsReducer,
    mealsDetails: mealsPlanDetailsReducer,
  },
});
