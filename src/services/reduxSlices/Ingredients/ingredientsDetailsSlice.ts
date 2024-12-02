import { showCustomToast } from "@/hooks/showCustomToast";
import axiosInstance from "@/utils/axiosInterceptors";
import { IngredientForOnce, IngredientUpdate } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiError } from "../Meals/mealDetailsSlice";

interface IngredientsDetailsState {
  ingredients: Record<number, IngredientForOnce[]>;
  filteredIngredients: Record<number, IngredientForOnce[]> | null; // Search results
  loading: boolean;
  mainLoading: boolean;
  currentPage: number;
  lastFetched: number | null;
  totalPages: number;
  searchQuery: string;
  pageSize: number;
  searchResults: boolean;
}

// Initial state of the ingredients details slice
const initialState: IngredientsDetailsState = {
  ingredients: {},
  filteredIngredients: null,
  loading: false,
  mainLoading: false,
  currentPage: 1,
  searchResults: false,
  pageSize: 24,
  searchQuery: "",
  lastFetched: null,
  totalPages: 1,
};

// This function is used to get all ingredients
export const getIngredients = createAsyncThunk(
  "ingredientsDetails/getIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("ingredients");
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
    setSearchQuery: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase();
      state.searchQuery = query;

      // Get all ingredients from the original `ingredients` object
      const allIngredients = Object.values(state.ingredients).flat();

      if (query) {
        // Filter ingredients based on the query
        const filtered = allIngredients.filter((ingredient) =>
          ingredient.title.toLowerCase().includes(query),
        );
        state.currentPage = 1;
        state.filteredIngredients = { 1: filtered };
        state.searchResults = true;
        state.totalPages = 1;
      } else {
        // Reset the search results
        state.filteredIngredients = null;
        state.searchResults = false;
        state.totalPages = Math.ceil(allIngredients.length / state.pageSize);
      }
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
        const ingredientsData = action.payload.data;
        const paginatedData: Record<number, IngredientForOnce[]> = {};
        // Paginate the data
        ingredientsData.forEach(
          (ingredient: IngredientForOnce, index: number) => {
            const pageNumber: number = Math.floor(index / state.pageSize) + 1;
            if (!paginatedData[pageNumber]) {
              paginatedData[pageNumber] = [];
            }
            paginatedData[pageNumber].push(ingredient);
          },
        );
        state.ingredients = paginatedData;
        state.totalPages = Math.ceil(
          action.payload.data.length / state.pageSize,
        );
        state.lastFetched = new Date().getTime();
        state.searchResults = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.mainLoading = false;
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

        // Extract the updated ingredient
        const updatedIngredient = action.payload.data;
        const ingredientId = updatedIngredient.ingredientId;

        // Update the ingredient in the state
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
