import { useTranslation } from "react-i18next";

const useFiltersOptions = () => {
  const { t } = useTranslation(["meals", "weeklyMenu", "customers", "common"]);

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

  const fitnessGoalOptionsTranslated = t("customers:fitnessGoalOptions", {
    returnObjects: true,
  }) as {
    key: string;
    title: string;
  }[];

  const physicalActivityLevelOptions = t(
    "customers:physicalActivityLevelOptions",
    {
      returnObjects: true,
    },
  ) as {
    key: string;
    title: string;
  }[];

  const genderOptions = t("customers:gender", { returnObjects: true }) as {
    key: string;
    title: string;
  }[];

  const customerStatusOptions = t("customers:status", {
    returnObjects: true,
  }) as {
    key: string;
    title: string;
  }[];

  return {
    dietaryPreferences,
    dietaryRestrictions,
    categories,
    menuArchivingOptions,
    categoriesTranslated,
    fitnessGoalOptionsTranslated,
    physicalActivityLevelOptions,
    genderOptions,
    customerStatusOptions,
  };
};

export default useFiltersOptions;
