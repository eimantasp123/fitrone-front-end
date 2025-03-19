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
  timezone?: string | null;
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
    weeklyMenus: number | null;
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
 * Week plan modal assign filters interface for the week plan modal assign filters object
 */
export interface WeekPlanModalAssignFilters {
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
  ingredients: IngredientToCreateOrUpdate[];
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
/**
 * Interface for the paginated response of the meals
 */
export interface PaginatedMealsResponse {
  status: string;
  results: number;
  total: number;
  currentPage: number;
  totalPages: number;
  data: Meal[] | [];
}

/**
 * Weekly menu by id interface for the weekly menu by id object
 */

export interface WeeklyMenuByIdResponse {
  status: string;
  data: SingleWeeklyMenuById;
}

/**
 * Format data for meal modal
 */
export interface FormMealData {
  title: string;
  description?: string;
  ingredients?:
    | {
        title: string;
        amount: number;
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
        currentAmount: number;
      }[]
    | null;
  image?: File | "delete" | null;
}

/**
 * Search result interface for the meal modal
 */
export interface SearchResultFromDatabase {
  ingredientId: string;
  title: string;
  amount: number;
  unit: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

/**
 * Weekly plan item card props interface
 */
export interface WeeklyPlanItemCardProps {
  _id: string;
  menu: {
    _id: string;
    title: string;
    description: string | null;
    preferences: string[] | null;
    restrictions: string[] | null;
  };
  published: boolean;
  assignedClients?: string[] | null;
  // assignedGroups?: string[] | null;
}

/**
 * Filter interface for customers header
 */
export interface CustomersFilters {
  preference: { key: string; title: string } | null;
  status: { key: boolean; title: string } | null;
  gender: { key: string; title: string } | null;
}

/**
 * Interface for customer add form
 */
export interface CustomerAddForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  height: number;
  weight: number;
  additionalInfo?: string;
  weeklyMenuQuantity?: number;
  weightGoal?: number;
  gender: string;
  foodAllergies?: string;
  physicalActivityLevel: string;
  fitnessGoal: string;
  preferences: string[];
  restrictions?: string[];
  address: string;
}

/**
 * Interface for customer edit form
 */
export interface CustomerEditForm extends CustomerAddForm {
  _id: string;
  status: string;
  latitude: string;
  longitude: string;
  recommendedNutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null;
}

/**
 *  Customer interface for the customer object
 */
export interface PaginatedCustomersResponse {
  status: string;
  results: number;
  total: number;
  currentPage: number;
  totalPages: number;
  data: CustomerEditForm[];
}

/**
 * Order interface for the order object
 */
export interface Order {
  _id: string;
  year: number;
  weekNumber: number;
  day: number;
  status: "not_done" | "preparing" | "done";
  expired: boolean;
  date: string;
  active: boolean;
}

/**
 * Order by id interface for curent day category object
 */
export interface OrderMealsByCategory {
  _id: string;
  mealsPerCategory: number;
  category: string;
  meals: SingleDayMealForOrderDay[];
}

/**
 * Order by id interface for the single day meal object
 */
export interface SingleDayMealForOrderDay {
  _id: string;
  mealTitle: string;
  mealDescription?: string | null;
  ingredients: {
    title: string;
    generalAmount: number;
    currentAmount: number;
    unit: string;
  }[];
  portions: number;
  weeklyMenuTitle: string;
  status: "not_done" | "preparing" | "done";
  customers: {
    firstName: string;
    lastName: string;
    quantity: number;
  }[];
}

/**
 * Order by id interface for the order by id object
 */
export interface OrderByIdResponse {
  status: string;
  data: {
    _id: string;
    year: number;
    weekNumber: number;
    day: number;
    status: "not_done" | "preparing" | "done";
    expired: boolean;
    date: string;
    categories: OrderMealsByCategory[];
  };
  generalInsights: OrderByIdGeneralInsights[];
}

/**
 * Order by id general insights interface for the order by id general insights object
 */
export interface OrderByIdGeneralInsights {
  firstName: string;
  lastName: string;
  categories: {
    category: string;
    meals: {
      mealTitle: string;
      quantity: number;
    }[];
  }[];
}

/**
 * Ingredient list response for order day
 */
export interface IngredientListResponse {
  status: string;
  data: {
    expired: boolean;
    generalList: SingleDayIngredientList[];
    combinedList: WeekCombinedIngredientList[];
  };
}

/**
 * Single day ingredient list for order day
 */
export interface SingleDayIngredientList {
  _id: string;
  year: number;
  weekNumber: number;
  day: number;
  status: "not_done" | "done";
  date: string;
  expired: boolean;
  ingredients: SingleIngredient[];
}

/**
 * Week combined ingredient list for order day
 */
export interface WeekCombinedIngredientList {
  combineListDocId: string;
  year: number;
  weekNumber: number;
  expired: boolean;
  dayCombined: number[];
  ingredients: SingleIngredient[];
}

/**
 * Single ingredient interface for ingredients list
 */
export interface SingleIngredient {
  _id: string;
  title: string;
  generalAmount: number;
  unit: string;
  stockAmount: number | null;
  restockNeeded: number | null;
  mealsToUse: {
    meal: string;
    quantity: number;
    amountPerPortion: number;
  }[];
}

/**
 * Dashboard limits response interface
 */
export interface DashboardLimitsResponse {
  status: string;
  data: {
    plan: "base" | "basic" | "pro" | "premium";
    usageLimits: Record<string, { currentCount: number; limit: number }>;
    features: {
      aiSearch: boolean;
      clientRequestForm: boolean;
    };
  };
}

/**
 * Meal response interface for the meal response object
 */
export interface MealResponse {
  status: string;
  results: number;
  total: number;
  currentPage: number;
  totalPages: number;
  data: Meal[] | [];
}
