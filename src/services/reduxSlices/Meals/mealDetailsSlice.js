import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInterceptors";
import { showCustomToast } from "@/hooks/showCustomToast";

const initialState = {
  meals: [],
  loading: false,
  mainLoading: false,
  lastFetched: null,
};

// This function is used to add a meal
export const addMeal = createAsyncThunk(
  "mealsDetails/addMeal",
  async (mealData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/meals/add-meal", mealData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// This function is used to get all meals
export const getMeals = createAsyncThunk(
  "mealsDetails/getMeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/meals");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// Delete meal permanently from the database
export const deleteMeal = createAsyncThunk(
  "mealsDetails/deleteMeal",
  async (mealId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/meals", {
        params: { mealId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// Update meal details
export const updateMeal = createAsyncThunk(
  "mealsDetails/updateMeal",
  async (mealData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/meals/${mealData._id}`,
        mealData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const mealDetailsSlice = createSlice({
  name: "mealsDetails",
  initialState,
  reducers: {
    setMealDetails: (state, action) => {
      state.details = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMeal.fulfilled, (state, action) => {
        console.log(action.payload);
        state.meals = [action.payload.data, ...state.meals];
        state.loading = false;
        showCustomToast({
          status: "success",
          title: action.payload.message,
        });
      })
      .addCase(addMeal.rejected, (state, action) => {
        state.loading = false;
        showCustomToast({
          status: "error",
          title: action.payload || "An error occurred",
        });
      })
      .addCase(getMeals.pending, (state) => {
        state.mainLoading = true;
      })
      .addCase(getMeals.fulfilled, (state, action) => {
        state.meals = action.payload.data;
        state.mainLoading = false;
        state.lastFetched = new Date().getTime();
      })
      .addCase(getMeals.rejected, (state) => {
        state.mainLoading = false;
      })
      .addCase(deleteMeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMeal.fulfilled, (state, action) => {
        state.meals = state.meals.filter(
          (meal) => meal._id !== action.payload.data._id,
        );
        state.loading = false;
        showCustomToast({
          status: "success",
          title: action.payload.message,
        });
      })
      .addCase(deleteMeal.rejected, (state, action) => {
        state.loading = false;
        showCustomToast({
          status: "error",
          title: action.payload || "An error occurred",
        });
      })
      .addCase(updateMeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMeal.fulfilled, (state, action) => {
        state.meals = state.meals.map((meal) =>
          meal._id === action.payload.data._id ? action.payload.data : meal,
        );
        state.loading = false;
        showCustomToast({
          status: "success",
          title: action.payload.message,
        });
      })
      .addCase(updateMeal.rejected, (state, action) => {
        state.loading = false;
        showCustomToast({
          status: "error",
          title: action.payload || "An error occurred",
        });
      });
  },
});

export const { setMealDetails } = mealDetailsSlice.actions;
export default mealDetailsSlice.reducer;
