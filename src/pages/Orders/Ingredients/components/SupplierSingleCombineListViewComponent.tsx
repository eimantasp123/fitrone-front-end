import CustomButton from "@/components/common/CustomButton";
import { useDeleteComboList } from "@/hooks/Orders/useDeleteComboList";
import { useGeneratePdf } from "@/hooks/Orders/useGeneratePdf";
import { WeekCombinedIngredientList } from "@/utils/types";
import { Spinner, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa";
import SupplierIngredientListModal from "../modals/SupplierIngredientListModal";

/**
 * Supplier Single Combine List View Component
 */
const SupplierSingleCombineListViewComponent = ({
  combo,
  days,
}: {
  combo: WeekCombinedIngredientList;
  days: number[];
}) => {
  const { t } = useTranslation(["orders", "common"]);
  const { mutate: deleteComboList, isPending } = useDeleteComboList();
  const { mutate: generatePdfMutation, isPending: loading } = useGeneratePdf();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Get translated week days
  const weekDays = t("common:weekDays", { returnObjects: true }) as {
    index: number;
    name: string;
  }[];

  // Order days and push sunday(0) to the end of the array
  const sortedDays = [
    ...combo.dayCombined.filter((day) => day !== 0).sort((a, b) => a - b), // Sort days except Sunday
    ...combo.dayCombined.filter((day) => day === 0), // Append Sunday at the end
  ];

  const translatedDays = sortedDays
    .map((day) => {
      return weekDays.find((d) => d.index === day)?.name || "Monday";
    })
    .join(" • ");

  const handleDeleteComboList = (
    year: number,
    week: number,
    days: number[],
  ) => {
    if (!combo) return;
    // Delete combo list
    deleteComboList({ year: year.toString(), week: week.toString(), days });
  };

  // Generate ingredients list pdf file
  const generatePdf = async () => {
    if (!combo.year || !combo.weekNumber || !combo.dayCombined.length) return;
    generatePdfMutation({
      year: combo.year,
      week: combo.weekNumber,
      days: combo.dayCombined,
    });
  };

  return (
    <>
      <div className="pl-1 text-sm font-medium md:w-[40%] xl:w-[60%]">
        <span className="font-semibold">{t("combinedDays")}:</span>
        <span className="ml-1">{translatedDays}</span>
      </div>

      <div className="flex flex-col gap-1 sm:flex-row sm:gap-2 md:w-[450px] lg:w-[500px]">
        <CustomButton
          fontSize="text-[13px]"
          paddingY="py-1"
          widthFull={true}
          minH="h-[34px]"
          onClick={onOpen}
          text={combo.expired ? t("view") : t("viewAndEnterStock")}
        />
        <CustomButton
          fontSize="text-[13px]"
          type="light_outline"
          widthFull={true}
          loading={loading}
          paddingY="py-1"
          minH="h-[34px]"
          onClick={generatePdf}
          text={t("downloadPdf")}
        />
        {!combo.expired && (
          <Tooltip
            label={t("removeComboList")}
            aria-label={t("removeComboList")}
          >
            <button
              onClick={() =>
                handleDeleteComboList(
                  combo.year,
                  combo.weekNumber,
                  combo.dayCombined,
                )
              }
              className="flex cursor-pointer items-center justify-center rounded-md px-3 py-2 text-xs text-red-500 transition-colors duration-200 ease-in-out hover:bg-neutral-200 dark:hover:bg-neutral-300/20"
            >
              {isPending ? <Spinner size="xs" /> : <FaTrash />}
            </button>
          </Tooltip>
        )}
      </div>
      {/* Open ingredients list modal */}
      {isOpen && (
        <SupplierIngredientListModal
          ingredients={combo.ingredients}
          translatedDays={translatedDays}
          isOpen={isOpen}
          days={days}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default SupplierSingleCombineListViewComponent;
