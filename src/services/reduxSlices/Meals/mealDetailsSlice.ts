import { showCustomToast } from "@/hooks/showCustomToast";
import axiosInstance from "@/utils/axiosInterceptors";
import { Filters, Meal } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  generalLoading: boolean;
  loading: boolean;
  currentPage: number;
  lastFetched: number | null;
  limit: number;
  totalResults: number;
  totalPages: number;
  filters: {
    category: { key: string; title: string } | null;
    preference: { key: string; title: string } | null;
    restriction: { key: string; title: string } | null;
  };
}

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

// Delete meal permanently from the database
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
    cleanAllMeals: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMeal.fulfilled, (state, action) => {
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
      })
      .addCase(addMeal.rejected, (state, action) => {
        state.loading = false;
        showCustomToast({
          status: "error",
          title: (action.payload as string) || "An error occurred",
        });
      })
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
      )
      .addCase(getMeals.rejected, (state, actions) => {
        const page = actions.meta.arg.page ?? 1;
        if (page === 1 && !state.meals[1]) {
          state.generalLoading = false;
        }
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

export const { setFilters, setCurrentPage, cleanAllMeals } =
  mealDetailsSlice.actions;
export default mealDetailsSlice.reducer;
