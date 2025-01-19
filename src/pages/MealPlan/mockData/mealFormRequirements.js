export const PersonalizedDietFormRequirements = [
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
];
