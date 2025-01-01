import { showCustomToast } from "@/hooks/showCustomToast";
import axiosInstance from "@/utils/axiosInterceptors";
import { ApiError, Filters, Meal, MealsState } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Initial state for meals
 */
const initialState: MealsState = {
  meals: {},
  loading: false,
  generalLoading: false,
  lastFetched: null,
  totalResults: 0,
  currentPage: 1,
  limit: 16,
  totalPages: 0,
  filters: { category: null, preference: null, restriction: null },
};

/**
 * Add a new meal
 * @param mealData - FormData containing meal details
 */
export const addMeal = createAsyncThunk(
  "mealsDetails/addMeal",
  async (mealData: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/meals", mealData);
      return response.data;
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

/**
 * Get all meals with optional filters
 */
export const getMeals = createAsyncThunk(
  "mealsDetails/getMeals",
  async (
    {
      page,
      limit,
      category,
      preference,
      restriction,
    }: {
      page: number;
      limit: number;
      category: { key: string; title: string } | null;
      preference: { key: string; title: string } | null;
      restriction: { key: string; title: string } | null;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get("/meals", {
        params: {
          page,
          limit,
          category: category?.key,
          preference: preference?.key,
          restriction: restriction?.key,
        },
      });
      return {
        data: response.data.data,
        totalPages: response.data.totalPages,
        currentPage: page,
        totalResults: response.data.totalResults,
      };
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

/**
 * Delete a meal permanently
 */
export const deleteMeal = createAsyncThunk(
  "mealsDetails/deleteMeal",
  async (mealId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/meals/${mealId}`);
      return response.data;
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

/**
 * Update meal details
 */
export const updateMeal = createAsyncThunk(
  "mealsDetails/updateMeal",
  async (
    { mealId, mealData }: { mealId: string; mealData: FormData },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.put(`/meals/${mealId}`, mealData);
      return response.data;
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

/**
 * Slice to manage meals details
 */
const mealDetailsSlice = createSlice({
  name: "mealsDetails",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setGeneralLoading: (state, action: PayloadAction<boolean>) => {
      state.generalLoading = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
      state.meals = {};
      state.currentPage = 1;
    },
    cleanAllMeals: () => initialState,
  },
  extraReducers: (builder) => {
    /**
     * Add a new meal
     */
    builder.addCase(addMeal.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.status === "success" && !action.payload.warning) {
        showCustomToast({
          status: "success",
          title: action.payload.message,
        });
      }
      if (action.payload.warning) {
        showCustomToast({
          status: "warning",
          title: action.payload.warning,
        });
      }
    });

    /**
     * Get all meals with optional filters
     */
    builder
      .addCase(getMeals.pending, (state, action) => {
        const page = action.meta.arg.page ?? 1;
        if (page === 1 && !state.meals[1]) {
          state.generalLoading = true;
        }
      })
      .addCase(
        getMeals.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: Meal[];
            totalPages: number;
            currentPage: number;
            totalResults: number;
          }>,
        ) => {
          const { data, totalPages, currentPage, totalResults } =
            action.payload;
          state.meals[currentPage] = data;
          state.totalPages = totalPages;
          state.totalResults = totalResults;
          state.lastFetched = new Date().getTime();
          state.generalLoading = false;
        },
      );

    /**
     * Delete a meal permanently
     */
    builder.addCase(deleteMeal.fulfilled, (state, action) => {
      state.loading = false;
      showCustomToast({
        status: "success",
        title: action.payload.message,
      });
    });

    /**
     * Update meal details
     */
    builder.addCase(updateMeal.fulfilled, (state, action) => {
      state.loading = false;
      showCustomToast({
        status: "success",
        title: action.payload.message,
      });
    });
  },
});

export const { setFilters, setCurrentPage, cleanAllMeals } =
  mealDetailsSlice.actions;
export default mealDetailsSlice.reducer;
