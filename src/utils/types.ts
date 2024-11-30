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

export interface Filters {
  category: string | null;
  preference: string | null;
  restriction: string | null;
}

export interface Meal {
  _id: string;
  title: string;
  description: string;
  ingredients: Ingredients[];
  category: string;
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
