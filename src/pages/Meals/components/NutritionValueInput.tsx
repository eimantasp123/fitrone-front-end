import React from "react";
import CustomInput from "@/components/common/NewCharkaInput";

interface Nutrients {
  calories: string | number;
  carbs: string | number;
  fat: string | number;
  protein: string | number;
}

interface NutritionValueInputProps {
  nutrients: Nutrients;
  setNutrients: React.Dispatch<React.SetStateAction<Nutrients>>;
}

const NutritionValueInput: React.FC<NutritionValueInputProps> = ({
  nutrients,
  setNutrients,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNutrients((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {["calories", "carbs", "fat", "protein"].map((field) => (
        <CustomInput
          key={field}
          name={field}
          type="number"
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          placeholder={`Enter ${field}`}
          value={nutrients[field as keyof Nutrients]}
          onChange={handleInputChange}
        />
      ))}
    </div>
  );
};

export default NutritionValueInput;
