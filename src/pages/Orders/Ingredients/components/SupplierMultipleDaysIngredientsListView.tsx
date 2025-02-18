import CustomButton from "@/components/common/CustomButton";
import { showPromiseToast } from "@/hooks/showPromiseToast";
import { Tooltip } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa";

/**
 * Supplier Single Day Ingredients View Component
 */
const SupplierMultipleDaysIngredientsView: React.FC = () => {
  const { t } = useTranslation(["orders", "common"]);

  const weekDays = t("common:weekDays", { returnObjects: true }) as {
    index: number;
    name: string;
  }[];

  const comboLists = [""];

  const combinedDays = [0, 2, 4];

  const combinedDaysNames = combinedDays
    .map((day) => {
      return weekDays[day].name;
    })
    .join(" • ");

  console.log("combinedDaysNames", combinedDaysNames);

  const handleClick = async () => {
    await showPromiseToast(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("Success");
        }, 2000);
      }),
      {
        loading: { title: "Updating..." },
        success: { title: "Successfully updated" },
        error: { title: "Failed to update" },
      },
    );
  };

  return (
    <div className="w-full space-y-2">
      <h6 className="text-sm font-medium">Combo lists</h6>
      <div className="w-full space-y-2 rounded-lg bg-background p-4 dark:bg-backgroundSecondary">
        {/* List for generated ingredients */}
        <div className="flex justify-center rounded-lg bg-backgroundSecondary dark:bg-background">
          {comboLists.length === 0 && (
            <div className="flex min-h-[150px] items-center p-8 text-center text-sm">
              No combo list generated yet
            </div>
          )}

          {comboLists.length !== 0 && (
            <div className="m-1 grid max-h-[500px] w-full grid-cols-1 gap-2 overflow-y-auto p-2 scrollbar-thin">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col rounded-lg bg-background p-2 dark:bg-backgroundSecondary"
                >
                  <div className="flex w-full flex-col justify-between gap-2 xl:flex-row xl:items-start xl:justify-between xl:gap-0">
                    <div className="space-y-1">
                      <div className="flex flex-col gap-1 pl-1 text-[13px] sm:flex-row sm:gap-3">
                        <span className="sm:border-r-[1px] sm:pr-3">
                          Sugeneruotas: 2025.01.08 | 15:40h
                        </span>
                        <span>Redaguotas: 2025.01.08 | 18:40h</span>
                      </div>
                      {/* Combined days */}
                      <div className="pl-1 text-[13px] font-medium">
                        <span className="font-medium">Combined days:</span>
                        <span className="ml-1">{combinedDaysNames}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 xl:w-[350px]">
                      <div className="flex w-full flex-col gap-1 sm:flex-row sm:gap-2">
                        <CustomButton
                          fontSize="text-[13px]"
                          paddingY="py-1"
                          widthFull={true}
                          minH="h-[30px]"
                          text="View & Edit list"
                        />
                        <CustomButton
                          fontSize="text-[13px]"
                          type="light_outline"
                          widthFull={true}
                          paddingY="py-1"
                          minH="h-[30px]"
                          onClick={handleClick}
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierMultipleDaysIngredientsView;
