import { downloadIngredientsList } from "@/api/ordersApi";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { showCustomToast } from "../showCustomToast";

/**
 * Use generate pdf mutation
 */
export const useGeneratePdf = () => {
  const { t } = useTranslation(["orders"]);
  return useMutation({
    mutationFn: async ({
      year,
      week,
      days,
    }: {
      year: number;
      week: number;
      days: number[];
    }) => {
      const weekDays = t("common:weekDays", { returnObjects: true }) as {
        index: number;
        name: string;
      }[];
      // Order days and push sunday(0) to the end of the array
      const sortedDays = [
        ...days.filter((day) => day !== 0).sort((a, b) => a - b), // Sort days except Sunday
        ...days.filter((day) => day === 0), // Append Sunday at the end
      ];
      const translatedDays = sortedDays.map((day) => {
        return (
          weekDays.find((d) => d.index === day)?.name.toLocaleLowerCase() ||
          "Monday"
        );
      });

      const downloadFileName = `${t("ingredientsList").split(" ").join("-")}-${year}-${t("week").toLocaleLowerCase()}-${week}-${translatedDays.join("-")}.pdf`;
      // Wrap the API call in `showPromiseToast`
      return downloadIngredientsList({ year, week, days, downloadFileName }); // API Call
    },

    onSuccess: () => {
      // Show a success toast
      showCustomToast({
        status: "success",
        title: t("pdfGenerationSuccess"),
      });
    },
    onError: () => {
      showCustomToast({
        status: "error",
        title: t("pdfGenerationFailed"),
      });
    },
  });
};
