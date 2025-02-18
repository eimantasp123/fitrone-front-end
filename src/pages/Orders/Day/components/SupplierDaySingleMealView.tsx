import CustomButton from "@/components/common/CustomButton";
import { Tooltip } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaCircleInfo } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
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

  const individualStatus = false;

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
            Visi prie patiekalo priskirti individualūs klientai ir grupės:
          </p>

          <div className="my-3 max-h-[300px] overflow-y-auto px-3 scrollbar-thin md:max-h-[500px]">
            {/* Individual client container */}
            <div className="flex flex-col gap-3 rounded-lg bg-background p-3 dark:bg-backgroundSecondary">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between md:h-[25px]">
                <span className="text-nowrap">Individual customers:</span>
                {!individualStatus && (
                  <CustomButton
                    paddingY="py-0"
                    minH="min-h-[30px]"
                    type="light_outline2"
                    text="Mark clients as done"
                  />
                )}
              </div>
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex w-full items-center justify-between gap-3 rounded-lg bg-backgroundSecondary px-4 py-2 dark:bg-background"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="break-all">Client nameasdasdasdasdasd</p>
                    <span>
                      <FaCircleInfo className="size-4 cursor-pointer" />
                    </span>
                  </div>
                  <span>
                    {individualStatus ? (
                      <SupplierStatusBadge
                        status="done"
                        paddingY="py-[0px]"
                        text={
                          statusOptions.find((option) => option.key === "done")
                            ?.title || "Unknow"
                        }
                      />
                    ) : (
                      <Tooltip label="Mark as done" aria-label="Mark as done">
                        <button className="flex size-5 items-center justify-center rounded-full border bg-white text-black transition-colors duration-300 ease-in-out">
                          <MdDone />
                        </button>
                      </Tooltip>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-3">
              <span>Groups:</span>

              {/* 1 Group container */}
              <div className="flex flex-col gap-3 rounded-lg bg-background p-3 dark:bg-backgroundSecondary">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between md:h-[25px]">
                  <span className="text-nowrap">Group title</span>
                  {!individualStatus && (
                    <CustomButton
                      paddingY="py-0"
                      minH="min-h-[30px]"
                      type="light_outline2"
                      text="Mark group as done"
                    />
                  )}
                </div>

                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex justify-between gap-3 rounded-lg bg-backgroundSecondary px-4 py-2 dark:bg-background"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="break-all">Client namesdfsdfsdfsdf</span>
                      <span>
                        <FaCircleInfo className="size-4 cursor-pointer" />
                      </span>
                    </div>
                    <span>
                      {individualStatus ? (
                        <SupplierStatusBadge
                          status="done"
                          paddingY="py-[0px]"
                          text={
                            statusOptions.find(
                              (option) => option.key === "done",
                            )?.title || "Unknow"
                          }
                        />
                      ) : (
                        <Tooltip label="Mark as done" aria-label="Mark as done">
                          <button className="flex size-5 items-center justify-center rounded-full border bg-white text-black transition-colors duration-300 ease-in-out">
                            <MdDone />
                          </button>
                        </Tooltip>
                      )}
                    </span>
                  </div>
                ))}
              </div>
              {/* 2 Group container */}
              <div className="flex flex-col gap-3 rounded-lg bg-background p-3 dark:bg-backgroundSecondary">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between md:h-[25px]">
                  <span className="text-nowrap">Group title</span>
                  {!individualStatus && (
                    <CustomButton
                      paddingY="py-0"
                      minH="min-h-[30px]"
                      type="light_outline2"
                      text="Mark group as done"
                    />
                  )}
                </div>

                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex justify-between gap-3 rounded-lg bg-backgroundSecondary px-4 py-2 dark:bg-background"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="break-all">Client namesdfsdfsdfsdf</span>
                      <span>
                        <FaCircleInfo className="size-4 cursor-pointer" />
                      </span>
                    </div>
                    <span>
                      {individualStatus ? (
                        <SupplierStatusBadge
                          status="done"
                          paddingY="py-[0px]"
                          text={
                            statusOptions.find(
                              (option) => option.key === "done",
                            )?.title || "Unknow"
                          }
                        />
                      ) : (
                        <Tooltip label="Mark as done" aria-label="Mark as done">
                          <button className="flex size-5 items-center justify-center rounded-full border bg-white text-black transition-colors duration-300 ease-in-out">
                            <MdDone />
                          </button>
                        </Tooltip>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDaySingleMealView;
