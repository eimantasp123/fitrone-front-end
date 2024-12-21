import axiosInstance from "@/utils/axiosInterceptors";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  details: {},
  createDietPlanBalanceLoading: false,
  loading: false,
  lastFetched: null,
};

// This function is used to create a diet plan
export const createDietPlanBalance = createAsyncThunk(
  "dietPlanDetails/createDietPlanBalance",
  async (details, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/meal-plan/balance", details);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create diet plan",
      );
    }
  },
);

// Get the diet plan details
export const getDietPlanBalance = createAsyncThunk(
  "dietPlanDetails/getDietPlanBalance",
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

export const updateDietPlanBalance = createAsyncThunk(
  "dietPlanDetails/updateDietPlanBalance",
  async (details, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/meal-plan/balance", details);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update diet plan",
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
      .addCase(createDietPlanBalance.pending, (state) => {
        state.createDietPlanBalanceLoading = true;
      })
      .addCase(createDietPlanBalance.fulfilled, (state, action) => {
        state.createDietPlanBalanceLoading = false;
        state.details = action.payload.data;
        state.lastFetched = Date.now();
      })
      .addCase(createDietPlanBalance.rejected, (state, action) => {
        state.createDietPlanBalanceLoading = false;
        state.error = action.payload;
      })
      .addCase(getDietPlanBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDietPlanBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload.data;
        state.lastFetched = Date.now();
      })
      .addCase(getDietPlanBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDietPlanBalance.pending, (state) => {
        state.createDietPlanBalanceLoading = true;
      })
      .addCase(updateDietPlanBalance.fulfilled, (state, action) => {
        state.createDietPlanBalanceLoading = false;
        state.details = action.payload.data;
        state.lastFetched = Date.now();
      })
      .addCase(updateDietPlanBalance.rejected, (state, action) => {
        state.createDietPlanBalanceLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setDietPlanDetails } = dietPlanDetailsSlice.actions;
export default dietPlanDetailsSlice.reducer;
