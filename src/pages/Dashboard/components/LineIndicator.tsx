import { useTranslation } from "react-i18next";
import { IoIosInfinite } from "react-icons/io";

interface LineIndicatorProps {
  currentAmount: number;
  limit: number;
}

const LineIndicator = ({ currentAmount, limit }: LineIndicatorProps) => {
  const { t } = useTranslation("dashboard");
  // Handle invalid inputs
  if (currentAmount < 0 || limit < -1) {
    return <div className="text-red-500">{t("invalidAmountOrLimit")}</div>;
  }

  // Determine if the limit is infinite (-1)
  const isInfinite = limit === -1;

  // Calculate the percentage if there's a finite limit
  let filledPercentage = 0;
  if (!isInfinite && limit > 0) {
    filledPercentage = (currentAmount / limit) * 100;
    filledPercentage = Math.min(filledPercentage, 100);
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-6 w-full overflow-hidden rounded-full bg-primary">
        {/* Filled portion (red) */}
        {!isInfinite && (
          <div
            className="absolute inset-0 h-full bg-yellow-500"
            style={{ width: `${filledPercentage}%` }}
          />
        )}
        {/* Optional: Display the amounts as a label */}
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-secondary">
          {isInfinite ? `${t("unlimited")}` : `${currentAmount} / ${limit}`}
        </div>
      </div>

      {/* Limit number */}
      <h6 className="flex w-[40px] items-center justify-center">
        {isInfinite ? <IoIosInfinite className="text-xl" /> : `${limit}`}
      </h6>
    </div>
  );
};

export default LineIndicator;
