import { formatNumber } from "@/utils/helper";
import { roundTo } from "./roundeNumber";

export const caclulateNutrition = (
  ingredients: Array<{
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
  }>,
) => {
  if (ingredients.length === 0) {
    return { calories: 0, fat: 0, protein: 0, carbs: 0 };
  }

  const total = ingredients.reduce(
    (acc, curr) => {
      acc.calories = roundTo(acc.calories + curr.calories, 1);
      acc.fat = roundTo(acc.fat + curr.fat, 1);
      acc.carbs = roundTo(acc.carbs + curr.carbs, 1);
      acc.protein = roundTo(acc.protein + curr.protein, 1);
      return acc;
    },
    { calories: 0, fat: 0, carbs: 0, protein: 0 },
  );

  return {
    calories: formatNumber(total.calories),
    fat: formatNumber(total.fat),
    carbs: formatNumber(total.carbs),
    protein: formatNumber(total.protein),
  };
};
