import * as yup from "yup";

const schema = yup.object().shape({
  // Basic Information
  age: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value,
    )
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be a whole number")
    .max(120, "Age must be less than or equal to 120 years"),

  gender: yup.string().required("Gender is required"),
  height: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value,
    )
    .nullable()
    .required("Height is required")
    .positive("Height must be a positive number")
    .integer("Height must be a whole number")
    .max(250, "Height must be less than or equal to 250 cm"),
  weight: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value,
    )
    .nullable()
    .required("Weight is required")
    .positive("Weight must be a positive number")
    .integer("Weight must be a whole number")
    .max(400, "Weight must be less than or equal to 400 kg"),

  // Health Goals
  fitnessGoal: yup.string().required("Primary fitness goal is required"),
  weightGoals: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value,
    )
    .nullable()
    .max(400, "Weight goals must be less than or equal to 400 kg"),

  // Dietary Preferences & Restrictions
  dietaryPreferences: yup.string().required("Dietary preferences are required"),
  dietaryRestrictions: yup
    .string()
    .required("Dietary restrictions are required"),
  foodAllergies: yup
    .string()
    .required("Food allergies are required")
    .max(300, "Food allergies must be less than or equal to 300 characters"),

  // Meal Preferences
  mealsPerDay: yup.string().required("Meals per day preference is required"),
  snacksPerDay: yup.string().required("Snacks per day preference is required"),
  portionSize: yup.string().required("Portion size preference is required"),

  // Lifestyle Information
  physicalActivityLevel: yup.string().required("Activity level is required"),
  occupation: yup
    .string()
    .nullable()
    .required("Occupation is required")
    .max(300, "Occupation must be less than or equal to 300 characters"),

  // Health Information
  medicalConditions: yup
    .string()
    .nullable()
    .max(
      300,
      "Medical conditions must be less than or equal to 300 characters",
    ),
  medications: yup
    .string()
    .nullable()
    .max(300, "Medications must be less than or equal to 300 characters"),
  sleepPatterns: yup.string().required("Sleep patterns are required"),
  stressLevels: yup.string().required("Stress levels are required"),

  // Meal Preparation & Cooking
  mealPrepAbility: yup
    .string()
    .required("Meal preparation ability is required"),
  mealPrepTime: yup.string().required("Meal preparation time is required"),
  foodBudget: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value,
    )
    .nullable()
    .max(50000, "Food budget must be less than or equal to 50000"),

  // Personal Preferences
  favoriteFoods: yup
    .string()
    .nullable()
    .max(300, "Favorite foods must be less than or equal to 300 characters"),
  foodsToAvoid: yup
    .string()
    .nullable()
    .max(300, "Foods to avoid must be less than or equal to 300 characters"),

  // Hydration & Alcohol Consumption
  hydration: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value,
    )
    .nullable()
    .required("Hydration is required")
    .positive("Hydration must be a positive number")
    .integer("Hydration must be a whole number")
    .max(200, "Hydration must be less than or equal to 200"),
  alcoholConsumption: yup.string().required("Alcohol consumption is required"),

  // Smoking & Tobacco Use
  smoking: yup.string().required("Smoking status is required"),

  // Repeat Meal Plan
  mealRepetitionPreference: yup
    .string()
    .required("Repeat meals for week is required"),
});

export default schema;
