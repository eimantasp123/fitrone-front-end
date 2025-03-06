import { SingleIngredient } from "@/utils/types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tooltip,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaInfo } from "react-icons/fa6";
import SingleIngredientComponent from "./SingleIngredientComponent";
import { useWeekOrder } from "@/context/OrdersContext";
import { useEnterIngredientsStock } from "@/hooks/Orders/useEnterIngredientsStock";
import { useDeleteStock } from "@/hooks/Orders/useDeleteStock";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ingredients: SingleIngredient[];
  translatedDays: string | undefined;
  days: number[];
}

/**
 *  Supplier Ingredient List Modal Component
 */
const SupplierIngredientListModal = ({
  isOpen,
  onClose,
  ingredients,
  translatedDays,
  days,
}: Props) => {
  const { t } = useTranslation(["orders"]);
  const modalField = t("modal", { returnObjects: true }) as {
    [key: string]: { title: string; description: string };
  };
  const { week, currentYear } = useWeekOrder();
  const { mutate } = useEnterIngredientsStock();
  const { mutate: deleteStockMutation } = useDeleteStock();

  const enterStock = (stock: number, ingredientId: string) => {
    if (!stock || !week || !currentYear || !ingredientId) return;
    mutate({
      year: String(currentYear),
      week: String(week),
      days: days,
      ingredientId: ingredientId,
      stockQuantity: stock,
    });
  };

  const deleteStock = (ingredientId: string) => {
    if (!week || !currentYear || !ingredientId) return;
    deleteStockMutation({
      year: String(currentYear),
      week: String(week),
      days: days,
      ingredientId: ingredientId,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
      blockScrollOnMount={false}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent
        p={6}
        sx={{
          borderRadius: "0.75rem",
        }}
      >
        <div className="flex items-center gap-3 border-b-[1px] pb-5">
          <div className="flex items-center gap-4">
            <h4 className="font-semibold">{t("ingredientsList")}</h4>
          </div>
        </div>
        <ModalCloseButton size="sm" />
        <ModalBody style={{ padding: "0px 0px" }}>
          <div className="mt-4 w-full">
            <h4 className="text-sm">
              <span className="font-semibold">{t("days")}:</span>{" "}
              {translatedDays ?? "-"}
            </h4>
            <div className="relative mt-4 flex h-auto max-h-[570px] w-[1100px] flex-col gap-2 overflow-auto px-2 scrollbar-thin md:h-auto md:max-h-[600px] xl:max-h-[750px]">
              <div className="sticky top-0 grid w-full grid-cols-[200px_120px_180px_180px_180px_1fr] bg-background px-3 py-2 text-sm">
                {Object.entries(modalField).map(([key, field], index) => (
                  <div
                    key={`${key}-${index}`}
                    className={`flex items-center ${index !== 0 ? "justify-center" : ""} gap-2`}
                  >
                    <h6>{field.title}</h6>
                    <Tooltip
                      label={field.description}
                      aria-label={field.description}
                      textAlign={"center"}
                    >
                      <button className="flex size-[18px] items-center justify-center rounded-full border text-xs">
                        <FaInfo />
                      </button>
                    </Tooltip>
                  </div>
                ))}
              </div>
              {ingredients.map((ingredient) => (
                <SingleIngredientComponent
                  key={`${ingredient._id}-${ingredient.title}-${ingredient.generalAmount}`}
                  ingredient={ingredient}
                  enterStock={enterStock}
                  deleteStock={deleteStock}
                />
              ))}
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SupplierIngredientListModal;
