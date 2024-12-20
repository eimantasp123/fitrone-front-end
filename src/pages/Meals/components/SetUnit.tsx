import { TFunction } from "i18next";
import React from "react";

interface SetUnitProps {
  t: TFunction;
  setUnit: (unit: string) => void;
  unit: string;
  showLabel?: boolean;
}

const SetUnit: React.FC<SetUnitProps> = ({
  t,
  setUnit,
  unit,
  showLabel = true,
}) => {
  return (
    <div className="flex flex-1 flex-col gap-1">
      {showLabel && (
        <span className="text-[13px] text-textPrimary">{t("unit")}</span>
      )}
      <div className="flex flex-1 items-center gap-2 text-sm">
        <div
          onClick={() => setUnit("g")}
          className={`flex flex-1 cursor-pointer items-center ${unit === "g" ? "bg-primary text-black dark:bg-primary" : "border border-borderDark bg-transparent text-black/60 dark:border-borderLight dark:text-white/40"} justify-center rounded-lg px-4 py-[11px]`}
        >
          {t("grams")}
        </div>
        <div
          onClick={() => setUnit("ml")}
          className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg ${unit === "ml" ? "bg-primary text-black dark:bg-primary" : "border border-borderDark bg-transparent text-black/60 dark:border-borderLight dark:text-white/40"} px-4 py-[11px]`}
        >
          {t("milliliters")}
        </div>
      </div>
    </div>
  );
};

export default SetUnit;
