import { useTranslation } from "react-i18next";

const useFiltersOptions = () => {
  const { t } = useTranslation("meals");

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

  return { dietaryPreferences, dietaryRestrictions, categories };
};

export default useFiltersOptions;
