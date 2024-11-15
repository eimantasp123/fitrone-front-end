import CustomerSelect from "@/components/common/CustomerSelect";
import { useTranslation } from "react-i18next";

export default function MealsHeader() {
  const { t } = useTranslation("meals");

  const dietaryPreferences = Object.values(
    t("preferences", { returnObjects: true }),
  );
  const dietaryRestrictions = Object.values(
    t("restrictions", { returnObjects: true }),
  );

  return (
    <>
      <div className="z-20 flex w-full flex-col gap-4 rounded-lg bg-background px-3 py-2 dark:bg-backgroundSecondary lg:flex-row">
        <div className="grid w-full grid-cols-2 gap-4 px-4 py-3 md:grid-cols-3 md:grid-rows-1 xl:grid-cols-2 xl:grid-rows-1">
          <CustomerSelect
            options={dietaryPreferences}
            title={t("preferencesTitle")}
            defaultOption={t("preferencesPlaceholder")}
          />
          <CustomerSelect
            options={dietaryRestrictions}
            title={t("restrictionsTitle")}
            defaultOption={t("restrictionsPlaceholder")}
          />
        </div>
        <div className="flex w-fit items-end justify-end gap-2 py-3 md:h-full">
          <button className="text-nowrap rounded-lg bg-primary px-4 py-[5px] text-sm text-black transition-colors duration-200 ease-in-out hover:bg-primaryLight dark:hover:bg-primaryDark 3xl:py-2">
            {t("applyFilters")}
          </button>
          <button className="text-nowrap rounded-lg px-4 py-[5px] text-sm transition-colors duration-200 ease-in-out 3xl:py-2">
            {t("resetFilters")}
          </button>
        </div>

        <div className="m-1 flex w-fit cursor-pointer items-center justify-center gap-2 text-nowrap rounded-md border border-borderPrimary p-1 px-6 text-sm transition-colors duration-200 ease-in-out hover:bg-backgroundSecondary">
          + {t("addMeal")}
        </div>
      </div>
    </>
  );
}
