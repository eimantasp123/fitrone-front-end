import { IngredientsForMealModal, UserDetails } from "@/utils/types";
import { useDisclosure } from "@chakra-ui/react";
import { TFunction } from "i18next";
import React from "react";
import { WiStars } from "react-icons/wi";
import IngredientAddModal from "../../Ingredients/IngredientAddModal";
import IngredientDatabaseSearch from "./IngredientDatabaseSearch";
import IngredientSearchModal from "./IngredientSearchModal";

interface IngredientAddOptionsManagerProps {
  user: Partial<UserDetails>;
  setIngredients: React.Dispatch<
    React.SetStateAction<IngredientsForMealModal[]>
  >;
  t: TFunction;
}

const IngredientAddOptionsManager: React.FC<
  IngredientAddOptionsManagerProps
> = ({ user, setIngredients, t }) => {
  const {
    isOpen: addIngredientOpen,
    onClose: onCloseAddIngredient,
    onOpen: openAddIngredient,
  } = useDisclosure();
  const {
    isOpen: searchInputOpen,
    onClose: closeSearchInput,
    onOpen: openSearchInputModal,
  } = useDisclosure();
  const {
    isOpen: searchIngredientDatabaseOpen,
    onClose: searchIngredientDatabaseClose,
    onOpen: openSearchIngredientDatabase,
  } = useDisclosure();
  return (
    <>
      <div
        className={`mt-2 grid grid-cols-1 gap-2 text-sm ${user.plan === "premium" ? "md:grid-cols-3" : "md:grid-cols-2"} md:gap-3`}
      >
        {user.plan === "premium" && (
          <span
            onClick={openSearchInputModal}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary py-3 text-black transition-colors duration-200 ease-in-out hover:bg-primaryLight dark:bg-primary dark:text-black dark:hover:bg-primaryDark"
          >
            <span>{t("findIngredientAi")}</span>
            <WiStars className="mt-0 text-xl" />
          </span>
        )}
        <span
          onClick={openSearchIngredientDatabase}
          className="cursor-pointer rounded-lg bg-backgroundSecondary py-3 text-center transition-colors duration-200 ease-in-out hover:bg-backgroundLight dark:bg-backgroundSecondary dark:hover:bg-neutral-800"
        >
          {t("findIngredientFromDatabase")}
        </span>
        <span
          onClick={openAddIngredient}
          className="cursor-pointer rounded-lg bg-backgroundSecondary py-3 text-center transition-colors duration-200 ease-in-out hover:bg-backgroundLight dark:bg-backgroundSecondary dark:hover:bg-neutral-800"
        >
          {t("enterIngredientManually")}
        </span>
      </div>

      {/* Search input for API */}
      {user.plan === "premium" && searchInputOpen && (
        <IngredientSearchModal
          isOpen={searchInputOpen}
          setIngredients={setIngredients}
          onClose={closeSearchInput}
        />
      )}

      {/* Search ingredient from database */}
      {searchIngredientDatabaseOpen && (
        <IngredientDatabaseSearch
          isOpen={searchIngredientDatabaseOpen}
          onClose={searchIngredientDatabaseClose}
          setIngredients={setIngredients}
        />
      )}

      {/* Ingredient inputs manual */}
      {addIngredientOpen && (
        <IngredientAddModal
          isOpen={addIngredientOpen}
          onClose={onCloseAddIngredient}
          editIngredient={null}
          setIngredients={setIngredients}
        />
      )}
    </>
  );
};

export default IngredientAddOptionsManager;
