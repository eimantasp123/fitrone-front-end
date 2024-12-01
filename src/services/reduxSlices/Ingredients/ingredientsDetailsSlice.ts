import { showCustomToast } from "@/hooks/showCustomToast";
import axiosInstance from "@/utils/axiosInterceptors";
import { IngredientForOnce, IngredientUpdate } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiError } from "../Meals/mealDetailsSlice";

interface IngredientsDetailsState {
  ingredients: Record<number, IngredientForOnce[]>;
  loading: boolean;
  mainLoading: boolean;
  currentPage: number;
  lastFetched: number | null;
  totalPages: number;
  searchQuery: string;
  limit: number;
  searchResults: boolean;
}

// Initial state of the ingredients details slice
const initialState: IngredientsDetailsState = {
  ingredients: {},
  loading: false,
  mainLoading: false,
  currentPage: 1,
  searchResults: false,
  limit: 3,
  searchQuery: "",
  lastFetched: null,
  totalPages: 1,
};

// This function is used to get all ingredients
export const getIngredients = createAsyncThunk(
  "ingredientsDetails/getIngredients",
  async (
    {
      page,
      limit,
    }: {
      page: number;
      limit: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get("ingredients", {
        params: {
          page,
          limit,
        },
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

// This function is used to search for ingredients
export const searchIngredients = createAsyncThunk(
  "ingredientsDetails/searchIngredients",
  async (
    {
      query,
    }: {
      query: string;
    },
    { rejectWithValue },
  ) => {
    try {
      console.log("query", query);
      const response = await axiosInstance.get("ingredients/search", {
        params: {
          query,
        },
      });
      return response.data;
    } catch (error: unknown) {
      const typedError = error as ApiError;
      if (typedError.response?.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      }
      return rejectWithValue("paieškos errors");
    }
  },
);

// This function is used to update an ingredient
export const updateIngredient = createAsyncThunk(
  "ingredientsDetails/updateIngredient",
  async (
    {
      ingredientId,
      data,
    }: {
      ingredientId: string;
      data: IngredientUpdate;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.put(
        `ingredients/${ingredientId}`,
        data,
      );
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

// Delete ingredient permanently from the database
export const deleteIngredient = createAsyncThunk(
  "ingredientsDetails/deleteIngredient",
  async ({ ingredientId }: { ingredientId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `ingredients/${ingredientId}`,
      );
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

// This slice contains all the reducers related to ingredients
const ingredientsDetailsSlice = createSlice({
  name: "ingredientsDetails",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setIngredientsEmpty: (state) => {
      state.ingredients = {};
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.mainLoading = true;
        state.searchResults = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.mainLoading = false;
        state.totalPages = action.payload.totalPages;
        state.ingredients[action.payload.currentPage] = action.payload.data;
        state.lastFetched = new Date().getTime();
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.mainLoading = false;
        showCustomToast({
          status: "error",
          title: action.payload as string,
        });
      })
      .addCase(searchIngredients.pending, (state) => {
        state.mainLoading = true;
      })
      .addCase(searchIngredients.fulfilled, (state, action) => {
        state.mainLoading = false;
        state.currentPage = 1;
        state.searchResults = true;
        state.ingredients = {};
        state.totalPages = 1;
        state.ingredients[1] = action.payload.data;
        state.lastFetched = new Date().getTime();
      })
      .addCase(searchIngredients.rejected, (state, action) => {
        state.mainLoading = false;
        state.searchResults = false;
        showCustomToast({
          status: "error",
          title: action.payload as string,
        });
      })
      .addCase(updateIngredient.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateIngredient.fulfilled, (state, action) => {
        state.loading = false;
        const updatedIngredient = action.payload.data;
        const ingredientId = updatedIngredient.ingredientId;
        Object.keys(state.ingredients).forEach((page) => {
          state.ingredients[Number(page)] = state.ingredients[Number(page)].map(
            (ingredient) =>
              ingredient.ingredientId === ingredientId
                ? { ...ingredient, ...updatedIngredient }
                : ingredient,
          );
        });
        showCustomToast({
          status: "success",
          title: action.payload.message,
        });
      })
      .addCase(updateIngredient.rejected, (state, action) => {
        state.loading = false;
        showCustomToast({
          status: "error",
          title: action.payload as string,
        });
      })
      .addCase(deleteIngredient.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteIngredient.fulfilled, (state, action) => {
        state.loading = false;
        showCustomToast({
          status: "success",
          title: action.payload.message,
        });
      })
      .addCase(deleteIngredient.rejected, (state, action) => {
        state.loading = false;
        showCustomToast({
          status: "error",
          title: action.payload as string,
        });
      });
  },
});

export const { setCurrentPage, setSearchQuery } =
  ingredientsDetailsSlice.actions;
export default ingredientsDetailsSlice.reducer;
