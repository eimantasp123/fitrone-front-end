import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInterceptors";

const initialState = {
  details: {},
  createDietPlanLoading: false,
  loading: false,
  lastFetched: null,
};

// This function is used to create a diet plan
export const createDietPlan = createAsyncThunk(
  "dietPlanDetails/createDietPlan",
  async (details, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/meal-plan", details);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create diet plan",
      );
    }
  },
);

// Get the diet plan details
export const getDietPlanDetails = createAsyncThunk(
  "dietPlanDetails/getDietPlanDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/meal-plan");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to get diet plan details",
      );
    }
  },
);

const dietPlanDetailsSlice = createSlice({
  name: "dietPlanDetails",
  initialState,
  reducers: {
    setDietPlanDetails: (state, action) => {
      state.details = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDietPlan.pending, (state) => {
        state.createDietPlanLoading = true;
      })
      .addCase(createDietPlan.fulfilled, (state, action) => {
        state.createDietPlanLoading = false;
        console.log(action.payload.data.mealPlan);
        state.details = action.payload.data.mealPlan;
        state.lastFetched = Date.now();
      })
      .addCase(createDietPlan.rejected, (state, action) => {
        state.createDietPlanLoading = false;
        state.error = action.payload;
      })
      .addCase(getDietPlanDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDietPlanDetails.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data.mealPlan);
        state.details = action.payload.data.mealPlan;
        state.lastFetched = Date.now();
      })
      .addCase(getDietPlanDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setDietPlanDetails } = dietPlanDetailsSlice.actions;
export default dietPlanDetailsSlice.reducer;
