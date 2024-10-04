export const PersonalizedDietFormRequirements = [
  {
    title: "Personal Information",
    data: [
      {
        label: "What is your age?",
        name: "age",
        type: "number",
        placeholder: "Enter your age",
        required: true,
      },
      {
        label: "What is your gender?",
        name: "gender",
        placeholder: "Select your gender",
        required: true,
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
      {
        label: "What is your height? (cm)",
        name: "height",
        type: "number",
        placeholder: "Enter your height",
        required: true,
      },
      {
        label: "What is your current weight? (kg)",
        name: "weight",
        type: "number",
        placeholder: "Enter your weight",
        required: true,
      },
    ],
  },

  // Health Goals & Lifestyle
  {
    title: "Health Goals & Lifestyle",
    data: [
      {
        label: "What is your primary fitness goal?",
        name: "fitnessGoal",
        placeholder: "Select your primary fitness goal",
        required: true,
        options: [
          { value: "weightLoss", label: "Weight Loss" },
          { value: "weightGain", label: "Muscle Gain" },
          { value: "weightMaintenance", label: "Weight Maintenance" },
          {
            value: "weightLossAndMuscleGain",
            label: "Weight Loss and Muscle Gain",
          },
        ],
      },
      {
        label: "Do you have a target weight? If so, please specify. (kg)",
        name: "weightGoals",
        type: "number",
        placeholder: "Enter your weight goals (e.g., 70)",
        required: false,
      },
      {
        label: "What is your activity level?",
        name: "physicalActivityLevel",
        placeholder: "Select your physical activity level",
        required: true,
        options: [
          { value: "sedentary", label: "Sedentary (little to no activity)" },
          {
            value: "lightlyActive",
            label: "Lightly Active (1-3 days per week)",
          },
          {
            value: "moderatelyActive",
            label: "Moderately Active (3-5 days per week)",
          },
          { value: "veryActive", label: "Very Active (6-7 days per week)" },
        ],
      },
    ],
  },

  // Dietary Preferences & Restrictions
  {
    title: "Dietary Preferences & Restrictions",
    data: [
      {
        label: "Do you follow any dietary preferences?",
        name: "dietaryPreferences",
        placeholder: "Select dietary preferences",
        required: true,
        options: [
          { value: "vegetarian", label: "Vegetarian" },
          { value: "vegan", label: "Vegan" },
          { value: "pescatarian", label: "Pescatarian" },
          { value: "omnivore", label: "Omnivore" },
        ],
      },
      {
        label: "Do you have any dietary restrictions?",
        name: "dietaryRestrictions",
        placeholder: "Select dietary restrictions",
        required: false,
        options: [
          { value: "gluten-free", label: "Gluten-Free" },
          { value: "lactose-free", label: "Lactose-Free" },
          { value: "keto", label: "Keto" },
          { value: "paleo", label: "Paleo" },
          { value: "low-carb", label: "Low Carb" },
          { value: "no-preference", label: "No dietary restrictions" },
        ],
      },
      {
        label: "Do you have any food allergies?",
        name: "foodAllergies",
        type: "text",
        placeholder: "List any food allergies",
        required: false,
      },
    ],
  },

  // Meal Preferences
  {
    title: "Meal Preferences",
    data: [
      {
        label: "How many main meals would you like to have per day?",
        name: "mealsPerDay",
        placeholder: "Select your meals per day preference",
        required: true,
        options: [
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
        ],
      },
      {
        label: "How many snacks would you like to include per day?",
        name: "snacksPerDay",
        placeholder: "Select your snacks per day preference",
        required: true,
        options: [
          { value: "0", label: "0" },
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
        ],
      },
      {
        label:
          "What are your favorite foods? List any specific items you would like to see in your meal plan.",
        name: "favoriteFoods",
        type: "text",
        placeholder: "List your favorite foods",
        required: false,
      },
      {
        label: "Are there any foods you'd like to avoid or dislike?",
        name: "foodsToAvoid",
        type: "text",
        placeholder: "List foods you want to avoid",
        required: false,
      },
    ],
  },

  // Health Information
  {
    title: "Health Information",
    data: [
      {
        label:
          "Do you have any medical conditions that we should be aware of? (Diabetes, Hypertension, etc.)",
        name: "medicalConditions",
        type: "text",
        placeholder:
          "List any medical conditions (e.g., diabetes, hypertension)",
        required: false,
      },
      {
        label:
          "Are you currently on any medications that affect your metabolism or diet?",
        name: "medications",
        type: "text",
        placeholder: "List any medications you are taking",
        required: false,
      },
      {
        label: "How many hours of sleep do you get on average per night?",
        name: "sleepPatterns",
        placeholder: "Select your average sleep duration",
        required: true,
        options: [
          { value: "less-than-5", label: "Less than 5 hours" },
          { value: "5-6 hours", label: "5-6 hours" },
          { value: "7-8 hours", label: "7-8 hours" },
          { value: "9-or-more", label: "9 or more hours" },
        ],
      },
      {
        label: "How would you rate your stress levels?",
        name: "stressLevels",
        placeholder: "Select your stress levels",
        required: true,
        options: [
          { value: "low", label: "Low" },
          { value: "moderate", label: "Moderate" },
          { value: "high", label: "High" },
        ],
      },
    ],
  },

  // Hydration & Alcohol Consumption
  {
    title: "Hydration & Alcohol Consumption",
    data: [
      {
        label: "How many cups of water do you drink on average per day?",
        name: "hydration",
        type: "number",
        placeholder: "Enter your average daily water intake (cups)",
        required: true,
      },
      {
        label: "How often do you consume alcohol?",
        name: "alcoholConsumption",
        placeholder: "Select your alcohol consumption",
        required: true,
        options: [
          { value: "never", label: "Never" },
          { value: "occasionally", label: "Occasionally" },
          { value: "regularly", label: "Regularly" },
        ],
      },
      {
        label: "Do you smoke?",
        name: "smoking",
        placeholder: "Select your smoking status",
        required: true,
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
    ],
  },
];
