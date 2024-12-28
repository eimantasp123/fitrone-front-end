/**
 * Ingredients interface for the ingredients object
 */
export interface Ingredients {
  _id?: string;
  title: string;
  currentAmount?: number;
  amount?: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredientId: string;
}

/**
 * Ingredient interface for the ingredient object
 */
export interface IngredientForOnce {
  ingredientId: string;
  title: string;
  unit: string;
  amount: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

/**
 * Ingredient interface for the ingredient object update
 */
export interface IngredientUpdate {
  title: string;
  unit: string;
  amount: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

/**
 * Filters interface for the filters object
 */
export interface Filters {
  category: { key: string; title: string } | null;
  preference: { key: string; title: string } | null;
  restriction: { key: string; title: string } | null;
}

/**
 * Meal interface for the meal object
 */
export interface Meal {
  _id: string;
  title: string;
  description: string;
  ingredients: Ingredients[];
  category:
    | "breakfast"
    | "lunch"
    | "dinner"
    | "snack"
    | "drink"
    | "dessert"
    | "other";
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  image?: string;
  createdAt: string;
  preferences: string[];
  restrictions: string[];
}

/**
 * Form data for creating a new weekly menu
 */
export interface CreateWeeklyMenuModalForm {
  title: string;
  description?: string | null;
  preferences?: string[] | null;
  restrictions?: string[] | null;
}

/**
 * Weekly menu interface for the weekly menu object
 */
export interface WeeklyMenuState {
  weeklyMenu: Record<number, WeeklyMenuBio[]>;
  loading: boolean;
  generalLoading: boolean;
  lastFetched: number | null;
  filters: WeeklyMenyFilters;
  totalResults: number;
  currentPage: number;
  limit: number;
  totalPages: number;
  searchQuery: string | null;
}

export interface WeeklyMenuBio {
  _id: string;
  title: string;
  description: string;
  preferences: string[];
  restrictions: string[];
  nutrition: Nutrition;
  status: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WeeklyMenyFilters {
  preference: { key: string; title: string } | null;
  restriction: { key: string; title: string } | null;
  archived: { key: boolean; title: string } | null;
}

export interface Day {
  _id: string;
  day: number;
  meals: MealAssignment[];
}

export interface MealAssignment {
  _id: string;
  category:
    | "breakfast"
    | "lunch"
    | "dinner"
    | "snack"
    | "drink"
    | "dessert"
    | "other";
  meal: MealForCurrentDay;
}

export interface MealForCurrentDay {
  _id: string;
  title: string;
  description: string;
  image: string;
  nutrition: Nutrition;
  preferences: string[];
  restrictions: string[];
  category:
    | "breakfast"
    | "lunch"
    | "dinner"
    | "snack"
    | "drink"
    | "dessert"
    | "other";
}

export interface Nutrition {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

/**
 * Weekly menu by id interface for the weekly menu by id object
 */
export interface WeeklyMenuByIdState {
  data: Record<string, SingleWeeklyMenuById>;
  loading: boolean;
  generalLoading: boolean;
  lastFetched: number | null;
}

export interface SingleWeeklyMenuById {
  _id: string;
  title: string;
  description: string;
  preferences: string[];
  restrictions: string[];
  days: Day[];
  nutrition: Nutrition;
  status: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}
