import CustomButton from "@/components/common/CustomButton";
import { useGeneratePdf } from "@/hooks/Orders/useGeneratePdf";
import { capitalizeFirstLetter } from "@/utils/helper";
import { SingleDayIngredientList } from "@/utils/types";
import { useTranslation } from "react-i18next";
import SupplierIngredientListModal from "../modals/SupplierIngredientListModal";
import { useDisclosure } from "@chakra-ui/react";

/**
 * Supplier Single Day Ingredients View Component
 */
const SupplierSingleDayIngredientsView = ({
  day,
}: {
  day: SingleDayIngredientList;
}) => {
  const { t } = useTranslation(["orders", "common"]);
  const { mutate: generatePdfMutation, isPending } = useGeneratePdf();
  const { isOpen, onClose, onOpen } = useDisclosure();

  // Get translated week days
  const weekDays = t("common:weekDays", { returnObjects: true }) as {
    index: number;
    name: string;
  }[];

  // Generate ingredients list pdf file
  const generatePdf = async () => {
    if (!day.year || !day.weekNumber || day.day === undefined) return;
    generatePdfMutation({
      year: day.year,
      week: day.weekNumber,
      days: [day.day],
    });
  };

  return (
    <>
      <div className="flex w-full flex-col gap-4 rounded-lg bg-background p-4 shadow-custom-dark2 dark:bg-backgroundSecondary md:flex-row md:justify-between">
        {/* Day and date */}
        <div className="flex flex-col gap-3 text-sm sm:flex-row">
          <div className="flex items-center gap-3">
            <h4 className="w-[100px] text-sm font-semibold">
              {capitalizeFirstLetter(
                weekDays.find((d) => d.index === day.day)?.name || "Monday",
              )}
            </h4>
            <span className="border-l-[1px] px-4 text-sm sm:text-nowrap">
              {t("date")}: {day.date}
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-1 sm:flex-row sm:gap-2 md:w-[450px]">
          <CustomButton
            fontSize="text-[13px]"
            widthFull={true}
            onClick={onOpen}
            text={day.expired ? t("view") : t("viewAndEnterStock")}
            paddingY="py-1"
            minH="h-[34px]"
          />
          <CustomButton
            fontSize="text-[13px]"
            widthFull={true}
            loading={isPending}
            type="light_outline"
            paddingY="py-1"
            minH="h-[34px]"
            onClick={generatePdf}
            text={t("downloadPdf")}
          />
        </div>
      </div>

      {/* Open ingredients list modal */}
      {isOpen && (
        <SupplierIngredientListModal
          ingredients={day.ingredients}
          days={[day.day]}
          translatedDays={weekDays.find((d) => d.index === day.day)?.name}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default SupplierSingleDayIngredientsView;
