import { showCustomToast } from "@/hooks/showCustomToast";
import { Filters, Meal } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInterceptors";

export interface ApiError {
  response?: {
    data?: {
      message: string;
    };
  };
  message?: string;
}

interface MealsState {
  meals: Record<number, Meal[]>;
  mainLoading: boolean;
  loading: boolean;
  currentPage: number;
  lastFetched: number | null;
  limit: number;
  totalResults: number;
  totalPages: number;
  filters: {
    category: string | null;
    preference: string | null;
    restriction: string | null;
  };
}

const initialState: MealsState = {
  meals: {},
  loading: false,
  mainLoading: false,
  lastFetched: null,
  totalResults: 0,
  currentPage: 1,
  limit: 18,
  totalPages: 0,
  filters: { category: null, preference: null, restriction: null },
};

// This function is used to add a meal
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

// This function is used to get all meals
export const getMeals = createAsyncThunk(
  "mealsDetails/getMeals",
  async (
    {
      page = 1,
      limit = 18,
      category,
      preference,
      restriction,
    }: {
      page?: number;
      limit?: number;
      category: string | null;
      preference: string | null;
      restriction: string | null;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get("/meals", {
        params: { page, limit, category, preference, restriction },
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

// Delete meal permanently from the database
export const deleteMeal = createAsyncThunk(
  "mealsDetails/deleteMeal",
  async (mealId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/meals", {
        params: { mealId },
      });
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

// Update meal details
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

const mealDetailsSlice = createSlice({
  name: "mealsDetails",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
      state.meals = {};
      state.currentPage = 1;
    },
    cleanAll: (state) => {
      state.meals = {};
      state.currentPage = 1;
      state.filters = { category: null, preference: null, restriction: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMeal.fulfilled, (state, action) => {
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
          title: (action.payload as string) || "An error occurred",
        });
      })
      .addCase(getMeals.pending, (state) => {
        state.mainLoading = true;
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
          state.mainLoading = false;
        },
      )
      .addCase(getMeals.rejected, (state) => {
        state.mainLoading = false;
      })
      .addCase(deleteMeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMeal.fulfilled, (state, action) => {
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
          title: (action.payload as string) || "An error occurred",
        });
      })
      .addCase(updateMeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMeal.fulfilled, (state, action) => {
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
          title: (action.payload as string) || "An error occurred",
        });
      });
  },
});

export const { setFilters, setCurrentPage, cleanAll } =
  mealDetailsSlice.actions;
export default mealDetailsSlice.reducer;
