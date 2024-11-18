import React from "react";

interface UnitSelectorProps {
  unit: string;
  setUnit: React.Dispatch<React.SetStateAction<string>>;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({ unit, setUnit }) => {
  return (
    <div className="flex flex-1 items-center gap-2 text-sm">
      <div
        onClick={() => setUnit("grams")}
        className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg px-4 py-[11px] ${
          unit === "grams"
            ? "bg-primary text-black dark:bg-primary"
            : "border bg-transparent text-black/60"
        }`}
      >
        Grams
      </div>
      <div
        onClick={() => setUnit("milliliters")}
        className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg px-4 py-[11px] ${
          unit === "milliliters"
            ? "bg-primary text-black dark:bg-primary"
            : "border bg-transparent text-black/60"
        }`}
      >
        Milliliters
      </div>
    </div>
  );
};

export default UnitSelector;
