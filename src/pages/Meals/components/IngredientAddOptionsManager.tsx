import { useDynamicDisclosure } from "@/hooks/useDynamicDisclosure";
import { useAppSelector } from "@/store";
import { IngredientsForMealModal } from "@/utils/types";
import { TFunction } from "i18next";
import React from "react";
import { WiStars } from "react-icons/wi";
import IngredientAddModal from "../../Ingredients/IngredientAddModal";
import IngredientSearchAiModal from "./IngredientSearchAiModal";
import IngredientSearchFromDatabase from "./IngredientSearchFromDatabase";

interface IngredientAddOptionsManagerProps {
  setIngredients: React.Dispatch<
    React.SetStateAction<IngredientsForMealModal[]>
  >;
  t: TFunction;
}

/**
 * Component to manage ingredient addition options
 */
const IngredientAddOptionsManager: React.FC<
  IngredientAddOptionsManagerProps
> = ({ setIngredients, t }) => {
  const { details: user } = useAppSelector((state) => state.personalDetails);
  const { openModal, closeModal, isOpen } = useDynamicDisclosure();
  return (
    <>
      <div
        className={`mt-2 grid grid-cols-1 gap-2 text-sm ${user.plan === "premium" ? "md:grid-cols-3" : "md:grid-cols-2"} md:gap-3`}
      >
        {user.plan === "premium" && (
          <span
            onClick={() => openModal("searchAi")}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary py-3 text-black transition-colors duration-200 ease-in-out hover:bg-primaryLight dark:bg-primary dark:text-black dark:hover:bg-primaryDark"
          >
            <span>{t("findIngredientAi")}</span>
            <WiStars className="mt-0 text-xl" />
          </span>
        )}
        <span
          onClick={() => openModal("searchInDatabase")}
          className="cursor-pointer rounded-lg bg-backgroundSecondary py-3 text-center transition-colors duration-200 ease-in-out hover:bg-backgroundLight dark:bg-backgroundSecondary dark:hover:bg-neutral-800"
        >
          {t("findIngredientFromDatabase")}
        </span>
        <span
          onClick={() => openModal("addIngredient")}
          className="cursor-pointer rounded-lg bg-backgroundSecondary py-3 text-center transition-colors duration-200 ease-in-out hover:bg-backgroundLight dark:bg-backgroundSecondary dark:hover:bg-neutral-800"
        >
          {t("enterIngredientManually")}
        </span>
      </div>

      {/* Search input for API */}
      {user.plan === "premium" && isOpen("searchAi") && (
        <IngredientSearchAiModal
          isOpen={isOpen("searchAi")}
          setIngredients={setIngredients}
          onClose={() => closeModal("searchAi")}
        />
      )}

      {/* Search ingredient from database */}
      {isOpen("searchInDatabase") && (
        <IngredientSearchFromDatabase
          isOpen={isOpen("searchInDatabase")}
          onClose={() => closeModal("searchInDatabase")}
          setIngredients={setIngredients}
        />
      )}

      {/* Ingredient inputs manual */}
      {isOpen("addIngredient") && (
        <IngredientAddModal
          isOpen={isOpen("addIngredient")}
          onClose={() => closeModal("addIngredient")}
          editIngredient={null}
          setIngredients={setIngredients}
        />
      )}
    </>
  );
};

export default IngredientAddOptionsManager;
