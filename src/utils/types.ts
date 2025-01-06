/**
 * ApiError interface for the api error object
 */
export interface ApiError {
  response?: {
    data?: {
      message: string;
    };
  };
  message?: string;
}

/**
 * User details interface for the user details object
 */
export interface UserDetails {
  _id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName?: string;
  profileImage: string;
  role: string;
  plan?: string;
  googleId?: string;
  facebookId?: string;
  is2FAEnabled: boolean;
  isVerified?: boolean;
  registrationCompleted?: boolean;
  createdAt?: string;
  __v?: number;
  subscriptionStatus?: string;
  subscriptionCancelAtPeriodEnd?: boolean;
  trialEnd?: string;
  subscriptionId?: string;
  subscriptionPlan?: string;
  subscriptionCancelAt?: string;
  hasUsedFreeTrial: boolean;
  archivedData?: {
    messageRead: boolean;
    ingredients: number | null;
    meals: number | null;
    mealWeekTypes: number | null;
    clients: number | null;
  };
}

/**
 * Ingredients interface used for the ingredients object
 */
export interface IngredientsForMealModal {
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
export interface IngredientFromServer {
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
 * Ingredient to create or update interface
 */
export interface IngredientToCreateOrUpdate {
  title: string;
  amount: number;
  unit?: string;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
  currentAmount?: number;
  ingredientId?: string;
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
  archived?: boolean;
  ingredients: IngredientsForMealModal[];
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

// Weekly menu bio interface
export interface WeeklyMenuBio {
  _id: string;
  title: string;
  description: string;
  preferences: string[];
  restrictions: string[];
  status: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

// Weekly menu filters interface
export interface WeeklyMenyFilters {
  preference: { key: string; title: string } | null;
  restriction: { key: string; title: string } | null;
  archived: { key: boolean; title: string } | null;
}

// Weekly menu by id interface
export interface Day {
  _id: string;
  day: number;
  meals: MealAssignment[];
  nutrition: Nutrition;
}

// Meal assignment interface
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

// Meal for current day interface
export interface MealForCurrentDay {
  _id: string;
  title: string;
  archived?: boolean;
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

// Nutrition interface
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

// Single weekly menu by id interface
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

/**
 * Meals state interface for the meals state object
 */
export interface MealsState {
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

/**
 * Meals details state interface for the meals details state object
 */
export interface PersonalDetailsState {
  details: Partial<UserDetails>;
  updateLoading: boolean;
  imageLoading: boolean;
  deleteImageLoading: boolean;
  updateDetailsLoading: boolean;
  request2FALoading: boolean;
  verify2FALoading: boolean;
}

/**
 * Interface for the paginated response of the ingredients
 */
export interface PaginatedIngredientsResponse {
  status: string;
  results: number;
  total: number;
  currentPage: number;
  totalPages: number;
  data: IngredientFromServer[] | [];
}
