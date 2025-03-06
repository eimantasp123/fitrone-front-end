import { useWeekOrder } from "@/context/OrdersContext";
import { showCustomToast } from "@/hooks/showCustomToast";
import { capitalizeFirstLetter } from "@/utils/helper";
import { IngredientListResponse, SingleIngredient } from "@/utils/types";
import { Tooltip } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";

/**
 * Single Ingredient Component
 */
const SingleIngredientComponent = ({
  ingredient,
  enterStock,
  deleteStock,
}: {
  ingredient: SingleIngredient;
  enterStock: (stock: number, ingredientId: string) => void;
  deleteStock: (ingredientId: string) => void;
}) => {
  const [stock, setStock] = useState<number | null>(
    ingredient.stockAmount ?? null,
  );
  const { t } = useTranslation(["orders"]);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const { week, currentYear } = useWeekOrder();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<IngredientListResponse>([
    "ingredientsList",
    String(currentYear),
    String(week),
  ]);

  useEffect(() => {
    const handleClickOutsideInput = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setStock(ingredient.stockAmount ?? null);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideInput);

    return () =>
      document.removeEventListener("mousedown", handleClickOutsideInput);
  }, [inputRef, ingredient.stockAmount]);

  useEffect(() => {
    setStock(ingredient.stockAmount ?? null);
  }, [ingredient.stockAmount]);

  const enterStockHandler = () => {
    if (!stock) return;
    if (stock === ingredient.stockAmount) {
      showCustomToast({
        status: "info",
        title: t("stockTheSame"),
      });
      return;
    }
    enterStock(stock, ingredient._id);
  };

  const deleteStockHandler = async () => {
    if (!ingredient.stockAmount) return;
    deleteStock(ingredient._id);
  };

  return (
    <div className="grid w-full grid-cols-[200px_120px_180px_180px_180px_1fr] items-center rounded-lg bg-backgroundSecondary px-3 py-2 text-sm">
      <h6>{capitalizeFirstLetter(ingredient.title)}</h6>
      <h6 className="text-center">{ingredient.unit}.</h6>
      <h6 className="text-center">
        {ingredient.stockAmount
          ? `${ingredient.stockAmount}${ingredient.unit}.`
          : "-"}
      </h6>
      <h6 className="text-center">
        {ingredient.generalAmount}
        {ingredient.unit}.
      </h6>
      <h6 className="text-center">
        {ingredient.restockNeeded ?? ingredient.generalAmount}
        {ingredient.unit}.
      </h6>
      {!data?.data.expired && (
        <div ref={inputRef} className="flex items-center justify-end gap-2">
          <input
            type="number"
            onChange={(e) => setStock(+e.target.value)}
            value={stock ?? ""}
            className="w-[100px] rounded-md border border-neutral-200 px-3 py-[3px] text-textSecondary outline-none transition-all duration-200 ease-in-out focus:border-primary focus:ring-1 focus:ring-primary dark:border-neutral-700/40"
          />

          <Tooltip label={t("enterStock")} aria-label={t("enterStock")}>
            <button
              onClick={enterStockHandler}
              className="flex h-[28px] w-[30px] items-center justify-center rounded-md border border-primary transition-colors duration-300 ease-in-out hover:bg-primary dark:border-[#a9db343f] dark:hover:text-black"
            >
              <MdOutlineDone />
            </button>
          </Tooltip>
          <Tooltip label={t("deleteStock")} aria-label={t("deleteStock")}>
            <button
              onClick={deleteStockHandler}
              className="flex h-[28px] w-[30px] items-center justify-center rounded-md text-xs text-red-500 transition-colors duration-300 ease-in-out hover:bg-neutral-200 dark:hover:bg-neutral-300/20"
            >
              <FaTrash />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default SingleIngredientComponent;
