import { useTranslation } from "react-i18next";

const useFiltersOptions = () => {
  const { t } = useTranslation(["meals", "weeklyMenu"]);

  const dietaryPreferences = t("preferences", {
    returnObjects: true,
  }) as {
    key: string;
    title: string;
  }[];

  const dietaryRestrictions = t("restrictions", {
    returnObjects: true,
  }) as {
    key: string;
    title: string;
  }[];

  const categories = t("categories", { returnObjects: true }) as {
    key: string;
    title: string;
  }[];

  const menuArchivingOptions = t("weeklyMenu:menuArchiving", {
    returnObjects: true,
  }) as {
    key: string;
    title: string;
  }[];

  const categoriesTranslated = t("common:mealsCategories", {
    returnObjects: true,
  }) as Record<string, string>;

  return {
    dietaryPreferences,
    dietaryRestrictions,
    categories,
    menuArchivingOptions,
    categoriesTranslated,
  };
};

export default useFiltersOptions;
