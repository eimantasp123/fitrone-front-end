import { capitalizeFirstLetter } from "@/utils/helper";
import { OrderByIdGeneralInsights } from "@/utils/types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface ShowOrdersInsightsProps {
  isOpen: boolean;
  onClose: () => void;
  orderInsights: OrderByIdGeneralInsights[] | [];
}

/**
 * Show Orders Insights Modal
 */
const ShowOrdersInsightsModal = ({
  isOpen,
  onClose,
  orderInsights,
}: ShowOrdersInsightsProps) => {
  const { t } = useTranslation(["orders", "common", "meals"]);

  // Meals categories
  const mealsCategories = t("meals:categories", { returnObjects: true }) as {
    key: string;
    title: string;
  }[];

  // Reorder the order insights
  const reorderedOrderInsights = useMemo(() => {
    const categoryOrder = [
      "breakfast",
      "lunch",
      "dinner",
      "snack",
      "drink",
      "dessert",
      "other",
    ];
    return orderInsights.map(
      (user) =>
        ({
          ...user,
          categories: user.categories.sort((a, b) => {
            return (
              categoryOrder.indexOf(a.category) -
              categoryOrder.indexOf(b.category)
            );
          }),
        }) as OrderByIdGeneralInsights,
    );
  }, [orderInsights]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        isCentered
        onClose={onClose}
        size={{ base: "sm", md: "4xl" }}
      >
        <ModalOverlay />
        <ModalContent
          p={6}
          sx={{
            borderRadius: "0.75rem",
          }}
        >
          <div className="flex items-center gap-3 border-b-[1px] border-borderPrimary pb-5">
            <h4 className="text-md font-semibold md:text-lg">
              {t("ordersInsight")}
            </h4>
          </div>
          <ModalCloseButton marginTop="3" />
          <ModalBody style={{ padding: "0px 0px" }}>
            {/* Orders insights */}
            {reorderedOrderInsights.length > 0 && (
              <div className="mt-3 grid max-h-[700px] grid-cols-1 gap-2 overflow-y-auto px-2 scrollbar-thin md:max-h-[900px]">
                {reorderedOrderInsights.map((orderInsight, orderIndex) => (
                  <div
                    key={`${orderInsight.firstName}-${orderInsight.lastName}-${orderIndex}`}
                    className="w-full rounded-lg bg-backgroundSecondary p-3"
                  >
                    <div className="flex flex-col gap-2 text-sm">
                      <h6>
                        <span className="font-semibold">{t("customer")}:</span>{" "}
                        {`${capitalizeFirstLetter(orderInsight.firstName)} ${capitalizeFirstLetter(orderInsight.lastName)}`}
                      </h6>
                      {/* Order details */}
                      {orderInsight.categories.map(
                        (mealCategory, categoryIndex) => (
                          <div
                            key={`${mealCategory.category}-${categoryIndex}`}
                            className="w-full rounded-lg border p-2"
                          >
                            <div className="mb-2">
                              {t("category")}:{" "}
                              <span className="font-medium">
                                {
                                  mealsCategories.find(
                                    (category) =>
                                      category.key === mealCategory.category,
                                  )?.title
                                }
                              </span>
                            </div>
                            {/* Meals */}
                            <div className="grid grid-cols-2 gap-[6px] md:gap-2">
                              {mealCategory.meals.map((meal, mealIndex) => (
                                <div
                                  key={`${meal.mealTitle}-${mealIndex}`}
                                  className={`${mealCategory.meals.length % 2 === 0 ? "col-span-2 md:col-span-1" : mealCategory.meals.length > 0 ? (mealCategory.meals.length === mealIndex + 1 ? "col-span-2" : "col-span-2 md:col-span-1") : "col-span-2"} flex w-full items-center justify-between rounded-md bg-background px-3 py-1`}
                                >
                                  <h6>
                                    {capitalizeFirstLetter(meal.mealTitle)}
                                  </h6>
                                  <span>
                                    {t("quantity")}: {meal.quantity}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShowOrdersInsightsModal;
