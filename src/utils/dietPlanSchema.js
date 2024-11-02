import * as yup from "yup";

// Utility function for number transformation
const transformToNumber = (value, originalValue) =>
  String(originalValue).trim() === "" ? null : value;

// Personal Information
export const personalInfoSchema = yup.object().shape({
  age: yup
    .number()
    .transform(transformToNumber)
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be a whole number")
    .max(120, "Age must be less than or equal to 120 years"),

  gender: yup.string().required("Gender is required"),
  height: yup
    .number()
    .transform(transformToNumber)
    .nullable()
    .required("Height is required")
    .positive("Height must be a positive number")
    .integer("Height must be a whole number")
    .max(250, "Height must be less than or equal to 250 cm"),
  weight: yup
    .number()
    .transform(transformToNumber)
    .nullable()
    .required("Weight is required")
    .positive("Weight must be a positive number")
    .integer("Weight must be a whole number")
    .max(400, "Weight must be less than or equal to 400 kg"),
});

// Health Goals & Lifestyle
export const goalsAndLifestyleSchema = yup.object().shape({
  fitnessGoal: yup.string().required("Primary fitness goal is required"),
  weightGoals: yup
    .number()
    .transform(transformToNumber)
    .nullable()
    .max(400, "Weight goals must be less than or equal to 400 kg"),
  physicalActivityLevel: yup.string().required("Activity level is required"),
});

// Dietary Preferences & Restrictions
export const dietaryPreferencesSchema = yup.object().shape({
  dietaryPreferences: yup.string().required("Dietary preferences are required"),
  dietaryRestrictions: yup.string(),
  foodAllergies: yup
    .string()
    .max(300, "Food allergies must be less than or equal to 300 characters"),
});
