import { Popover, Tooltip } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import SupplierDayStatusChange from "./SupplierDayStatusChange";
import SupplierStatusBadge from "./SupplierStatusBadge";
import { SingleDayMealForOrderDay } from "@/utils/types";
import { capitalizeFirstLetter } from "@/utils/helper";
import { useParams } from "react-router-dom";
import { showCustomToast } from "@/hooks/showCustomToast";
import { useChangeMealStatus } from "@/hooks/Orders/useChangeMealStatus";

/**
 * Supplier Day Single Meal View Component
 */
const SupplierDaySingleMealView = ({
  meal,
  dayStatus,
}: {
  meal: SingleDayMealForOrderDay;
  dayStatus: "done" | "not_done" | "preparing";
}) => {
  const { t } = useTranslation(["orders"]);
  const { orderId } = useParams();
  const { mutate: changeStatus } = useChangeMealStatus();

  // Get translated status options
  const statusOptions = t("orders:statusOptions", { returnObjects: true }) as {
    key: string;
    title: string;
  }[];

  // Get the classname based on the meal status
  const classname = (() => {
    switch (meal.status) {
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

  // Change the meal status function
  const changeMealStatus = (status: "done" | "not_done" | "preparing") => {
    if (!orderId || !meal._id) return;

    // If the status is the same as the current status
    if (status === meal.status) {
      showCustomToast({
        status: "info",
        description: t("mealAlreadyHasThisStatus"),
      });
      return;
    }

    // Call the API to change the meal status
    changeStatus({ orderId, status, mealDocId: meal._id });
  };

  return (
    <div
      className={`flex w-full flex-col ${classname} gap-3 rounded-lg p-4 text-sm`}
    >
      {/* Top details */}
      <div className="flex w-full flex-col justify-between gap-3 sm:flex-row">
        {/* Left side */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3 md:flex-row">
            <h6 className="pr-6 font-semibold md:border-r-[1px]">
              {capitalizeFirstLetter(meal.mealTitle)}
            </h6>
            <div className="flex items-center gap-3 md:pl-3">
              <p>{t("status")}:</p>
              <SupplierStatusBadge
                status={meal.status}
                text={
                  statusOptions.find((option) => option.key === meal.status)
                    ?.title || "Unknow"
                }
              />
            </div>
          </div>
          <h6>
            {t("weeklyMenu", {
              menuName: capitalizeFirstLetter(meal.weeklyMenuTitle),
            })}
          </h6>
          {meal.mealDescription && (
            <h6>
              <span className="font-semibold">{t("mealDescription")}:</span>{" "}
              {capitalizeFirstLetter(meal.mealDescription)}
            </h6>
          )}
        </div>
        {/* Right side */}
        {dayStatus === "not_done" && (
          <div className="sm:w-[160px]">
            <SupplierDayStatusChange
              options={statusOptions}
              mealStatus={meal.status}
              changeStatus={changeMealStatus}
              optionsModalPosition="top"
              placeholder={t("selectStatus")}
            />
          </div>
        )}
      </div>

      {/* Middle details */}
      <div className="pt-4 font-semibold">
        {t("requiredPortions", { quantity: meal.portions })}
      </div>

      {/* Bottom containers */}
      <div className="flex h-auto flex-col gap-3 overflow-hidden xl:flex-row">
        {/* Left side */}
        <div className="w-full rounded-lg bg-backgroundSecondary dark:bg-background">
          <p className="px-3 pt-3">
            {t("requiredIngredients", { quantity: meal.portions })}:
          </p>
          <div className="my-3 grid max-h-[300px] gap-2 overflow-y-auto px-3 scrollbar-thin md:max-h-[500px] md:grid-cols-2">
            {meal.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex justify-between gap-3 rounded-lg bg-background px-4 py-2 dark:bg-backgroundSecondary"
              >
                <span>{capitalizeFirstLetter(ingredient.title)}</span>
                <span>{`${ingredient.generalAmount} ${ingredient.unit}`}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="flex w-full flex-col rounded-lg bg-backgroundSecondary dark:bg-background">
          <p className="px-3 pt-3">{t("allCustomersAssigned")}:</p>

          <div className="my-3 max-h-[300px] overflow-y-auto px-3 scrollbar-thin md:max-h-[500px]">
            {/* Individual client container */}
            <div className="flex flex-col gap-2 rounded-lg bg-background p-3 dark:bg-backgroundSecondary">
              {meal.customers.map((customer, index) => (
                <div
                  key={index}
                  className="flex w-full items-center justify-between gap-3 rounded-lg bg-backgroundSecondary px-4 py-2 dark:bg-background"
                >
                  <p className="break-all">{`${capitalizeFirstLetter(customer.firstName)} ${capitalizeFirstLetter(customer.lastName)}`}</p>

                  <div className="flex items-center gap-3 md:gap-7">
                    <Tooltip
                      label={t("quantityOfCurrentMeal")}
                      aria-label={t("quantityOfCurrentMeal")}
                    >
                      <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-black">
                        {customer.quantity}x
                      </span>
                    </Tooltip>

                    {/* <Popover>
                      <Tooltip
                        label={t("moreDetailsAboutCustomer")}
                        aria-label={t("moreDetailsAboutCustomer")}
                      >
                        <button className="flex size-[17px] items-center justify-center rounded-full bg-primary text-black">
                          <FaInfo className="text-[10px]" />
                        </button>
                      </Tooltip>
                    </Popover> */}
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
