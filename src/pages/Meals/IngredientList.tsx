import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

interface Nutrient {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
}

interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  nutrients: Nutrient;
}

interface IngredientListProps {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

const IngredientList: React.FC<IngredientListProps> = ({
  ingredients,
  setIngredients,
}) => {
  const handleRemoveIngredient = (id: number) => {
    setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id));
  };

  return (
    <div className="flex flex-col gap-2">
      {ingredients.map((ingredient) => (
        <div
          key={ingredient.id}
          className="flex items-center justify-between border-b p-2"
        >
          <div>
            <p className="font-medium">{ingredient.name}</p>
            <p className="text-sm text-gray-500">
              {ingredient.amount} {ingredient.unit} -{" "}
              {ingredient.nutrients.calories} kcal
            </p>
            <p className="text-xs text-gray-400">
              Carbs: {ingredient.nutrients.carbs}g, Fat:{" "}
              {ingredient.nutrients.fat}g, Protein:{" "}
              {ingredient.nutrients.protein}g
            </p>
          </div>
          <IoMdCloseCircle
            className="cursor-pointer text-red-500"
            onClick={() => handleRemoveIngredient(ingredient.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default IngredientList;
