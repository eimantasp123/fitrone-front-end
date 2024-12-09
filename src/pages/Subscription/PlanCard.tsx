import { useTranslation } from "react-i18next";
import { SlStar } from "react-icons/sl";

interface PlanCardProps {
  plan: {
    key: string;
    price: string;
    priceId: string;
  };
  selectedPlan: string | undefined;
  onSelect: () => void;
  visible: boolean;
  hasUsedFreeTrial: boolean | undefined;
}
const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  selectedPlan,
  onSelect,
  visible,
  hasUsedFreeTrial,
}) => {
  const { t } = useTranslation("subscription");
  const planName = plan.key.split("-").slice(0, 1).join(" ");
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-5 shadow-custom-dark2 transition-all duration-300 md:flex-row md:items-center md:gap-10 md:px-10 md:py-10 lg:p-7 xl:flex-col xl:items-start xl:gap-0 ${
        selectedPlan === planName
          ? "border-transparent bg-neutral-800 text-white dark:border-primary dark:bg-background dark:text-white"
          : "dark:border-borderColor border-transparent bg-background dark:bg-[#2c2c2c]"
      } ${selectedPlan === planName ? "border-primaryDark" : ""} `}
    >
      <div className="w-full">
        {/* Star with badge */}
        <div className="flex items-center justify-between">
          <div
            className={`flex size-[37px] ${
              selectedPlan === planName
                ? "bg-primary text-black dark:bg-primary dark:text-black"
                : "bg-backgroundSecondary dark:bg-backgroundSecondary"
            } items-center justify-center rounded-full`}
          >
            <SlStar className="text-md" />
          </div>
          {selectedPlan === planName && (
            <div className="text-nowrap rounded-full border border-primary bg-primary px-4 py-1 text-[14px] text-black">
              {t("selectedPlan")}
            </div>
          )}
        </div>

        {/* Title */}
        <div className="fle5 mb-6 mt-5 flex-col items-start gap-2">
          <h4 className="text-lg font-semibold">
            {t(`plans.${plan.key}.title`)}
          </h4>
          <p
            className={`mb-4 mt-2 text-[15px] leading-snug ${
              selectedPlan === planName ? "text-white/70" : "text-textSecondary"
            }`}
          >
            {t(`plans.${plan.key}.description`)}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold">{plan.price}</span>
          <span
            className={`text-sm ${
              selectedPlan === planName ? "text-white/70" : "text-textSecondary"
            }`}
          >
            / {t("perMonth")}
          </span>
        </div>

        {/* Button */}
        {visible && (
          <button
            disabled={selectedPlan === planName}
            className={`border-borderColor mt-5 w-full cursor-pointer border ${
              selectedPlan === planName
                ? "border-primary bg-primary text-black"
                : "bg-neutral-200 hover:bg-neutral-300 dark:border-backgroundSecondary dark:bg-backgroundSecondary dark:text-white dark:hover:bg-background"
            } : "border-buttonPrimaryDark bg-buttonPrimaryDark hover:bg-buttonPrimaryDarkHover text-white" } rounded-full py-2 transition-all duration-300 ease-in-out`}
            onClick={() => onSelect()}
          >
            {hasUsedFreeTrial ? `${t("selectPlan")}` : `${t("startFreeTrial")}`}
          </button>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
