import CustomButton from "@/components/common/CustomButton";
import { Tooltip } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa";

interface Props {
  selectedDay: number | null;
}

/**
 * Supplier Single Day Ingredients View Component
 */
const SupplierSingleDayIngredientsView: React.FC<Props> = ({ selectedDay }) => {
  const { t } = useTranslation(["orders", "common"]);
  const ingredients = [""];

  const weekDays = t("common:weekDays", { returnObjects: true }) as {
    index: number;
    name: string;
  }[];

  return (
    <div className="w-full space-y-2 rounded-lg bg-background p-4 dark:bg-backgroundSecondary">
      <div className="flex w-full flex-col items-start justify-between gap-2 text-sm sm:flex-row">
        <span className="text-sm">
          Pasirinkta diena:{" "}
          <span className="font-semibold">
            {weekDays.find((day) => day.index === selectedDay)?.name}
          </span>
        </span>
        <div className="w-full sm:w-[150px]">
          <CustomButton
            widthFull={true}
            type="light_outline"
            text="Generalte list"
          />
        </div>
      </div>

      {/* List for generated ingredients */}
      <h6 className="text-sm">Ingredients list</h6>
      <div className="flex justify-center rounded-lg bg-backgroundSecondary dark:bg-background">
        {ingredients.length === 0 && (
          <div className="flex min-h-[150px] items-center p-8 text-center text-sm">
            No ingredients list generated yet
          </div>
        )}

        {ingredients.length !== 0 && (
          <div className="m-1 grid max-h-[500px] w-full grid-cols-1 gap-2 overflow-y-auto p-2 scrollbar-thin">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 rounded-lg bg-background p-2 dark:bg-backgroundSecondary xl:flex-row xl:items-center xl:justify-between xl:gap-0"
              >
                <div className="flex flex-col gap-1 pl-1 text-[13px] sm:flex-row sm:gap-3">
                  <span className="sm:border-r-[1px] sm:pr-3">
                    Sugeneruotas: 2025.01.08 | 15:40h
                  </span>
                  <span>Redaguotas: 2025.01.08 | 18:40h</span>
                </div>
                <div className="flex items-center gap-2 xl:w-[350px]">
                  <div className="flex w-full flex-col gap-1 sm:flex-row sm:gap-2">
                    <CustomButton
                      fontSize="text-[13px]"
                      widthFull={true}
                      text="View & Edit list"
                      paddingY="py-1"
                      minH="h-[30px]"
                    />
                    <CustomButton
                      fontSize="text-[13px]"
                      widthFull={true}
                      type="light_outline"
                      paddingY="py-1"
                      minH="h-[30px]"
                      text="Download PDF"
                    />
                  </div>
                  <Tooltip label={"delete list"} aria-label={"delte list"}>
                    <button
                      onClick={() => {}}
                      className="rounded-lg p-2 text-xs text-red-500 hover:bg-red-100 dark:hover:bg-red-800/20"
                    >
                      <FaTrash />
                    </button>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierSingleDayIngredientsView;
