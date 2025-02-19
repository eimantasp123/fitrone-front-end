import { Popover, Tooltip } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaInfo } from "react-icons/fa6";

import SupplierDayStatusChange from "./SupplierDayStatusChange";
import SupplierStatusBadge from "./SupplierStatusBadge";

type StatusType = "not_done" | "preparing" | "done";

const SupplierDaySingleMealView = () => {
  const { t } = useTranslation(["orders"]);

  const statusOptions = t("orders:statusOptions", { returnObjects: true }) as {
    key: string;
    title: string;
  }[];

  const status = "not_done" as StatusType;

  const classname = (() => {
    switch (status) {
      case "not_done":
        return "dark:bg-backgroundSecondary bg-background";
      case "preparing":
        return "bg-yellow-300/10 dark:bg-yellow-300/20";
      case "done":
        return "bg-[#AADB34]/10 dark:bg-[#AADB34]/20";
      default:
        return "dark:bg-backgroundSecondary bg-background";
    }
  })();

  return (
    <div
      className={`flex w-full flex-col ${classname} gap-3 rounded-lg p-4 text-sm`}
    >
      {/* Top details */}
      <div className="flex w-full flex-col justify-between gap-3 sm:flex-row">
        {/* Left side */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3 md:flex-row">
            <h6 className="pr-6 font-semibold md:border-r-[1px]">Meal title</h6>
            <div className="flex items-center gap-3 md:pl-3">
              <p>Status:</p>
              <SupplierStatusBadge
                status={status}
                text={
                  statusOptions.find((option) => option.key === status)
                    ?.title || "Unknow"
                }
              />
            </div>
          </div>
          <h6>Weekly menu: title</h6>
        </div>
        {/* Right side */}
        <div className="sm:w-[160px]">
          <SupplierDayStatusChange
            options={statusOptions}
            optionsModalPosition="top"
            placeholder="Select status"
          />
        </div>
      </div>

      {/* Middle details */}
      <div className="pt-4 font-semibold">Reikalingos porcijos: 5</div>

      {/* Bottom containers */}
      <div className="flex h-auto flex-col gap-3 overflow-hidden xl:flex-row">
        {/* Left side */}
        <div className="w-full rounded-lg bg-backgroundSecondary dark:bg-background">
          <p className="px-3 pt-3">
            Reikalingas ingredientu kiekis visoms (5) porcijoms:
          </p>
          <div className="my-3 grid max-h-[300px] gap-3 overflow-y-auto px-3 scrollbar-thin md:max-h-[500px] md:grid-cols-2">
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="flex justify-between gap-3 rounded-lg bg-background px-4 py-2 dark:bg-backgroundSecondary"
              >
                <span>Ingredientas</span>
                <span>100g</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="flex w-full flex-col rounded-lg bg-backgroundSecondary dark:bg-background">
          <p className="px-3 pt-3">
            Visi prie patiekalo priskirti individualūs klientai:
          </p>

          <div className="my-3 max-h-[300px] overflow-y-auto px-3 scrollbar-thin md:max-h-[500px]">
            {/* Individual client container */}
            <div className="flex flex-col gap-3 rounded-lg bg-background p-3 dark:bg-backgroundSecondary">
              {Array.from({ length: 45 }).map((_, index) => (
                <div
                  key={index}
                  className="flex w-full items-center justify-between gap-3 rounded-lg bg-backgroundSecondary px-4 py-2 dark:bg-background"
                >
                  <p className="break-all">Client nameasdasdasdasdasd</p>

                  <div className="flex items-center gap-3 md:gap-7">
                    <Popover>
                      <Tooltip
                        label={t("quantityOfCurrentMeal")}
                        aria-label={t("quantityOfCurrentMeal")}
                      >
                        <span>1x</span>
                      </Tooltip>
                    </Popover>

                    <Popover>
                      <Tooltip
                        label={t("moreDetailsAboutCustomer")}
                        aria-label={t("moreDetailsAboutCustomer")}
                      >
                        <button className="flex size-[17px] items-center justify-center rounded-full bg-primary text-black">
                          <FaInfo className="text-[10px]" />
                        </button>
                      </Tooltip>
                    </Popover>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDaySingleMealView;
