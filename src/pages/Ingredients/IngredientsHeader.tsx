import TextButton from "@/components/common/TextButton";
import {
  getIngredients,
  searchIngredients,
  setSearchQuery,
} from "@/services/reduxSlices/Ingredients/ingredientsDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import AddIngredientManualModal from "../Meals/AddIngredientManualModal";

const IngredientsHeader: React.FC = () => {
  const { t } = useTranslation("meals");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useAppDispatch();
  const { limit, searchResults, searchQuery } = useAppSelector(
    (state) => state.ingredientsDetails,
  );

  const cleanSearch = async () => {
    dispatch(setSearchQuery(""));
    await dispatch(getIngredients({ page: 1, limit }));
  };

  return (
    <>
      <div className="z-20 flex w-full flex-col gap-4 rounded-lg bg-background px-3 py-3 dark:bg-backgroundSecondary lg:flex-row lg:items-center">
        <input
          type="text"
          value={searchQuery}
          className="h-9 w-full rounded-lg bg-backgroundSecondary px-6 focus:outline-none dark:bg-backgroundSecondary"
          placeholder={t("searchPlaceholder")}
          onChange={(e) => {
            dispatch(setSearchQuery(e.target.value));
            if (e.target.value.length > 2) {
              dispatch(searchIngredients({ query: e.target.value }));
            } else if (e.target.value.length === 0 && searchResults) {
              dispatch(getIngredients({ page: 1, limit }));
            }
          }}
        />

        {searchQuery && <TextButton onClick={cleanSearch} text="Clean" />}
        <TextButton
          onClick={onOpen}
          text={`+ ${t("addIngredient")}`}
          primary={true}
        />
      </div>
      {/* Ingredient inputs manual */}
      <AddIngredientManualModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default IngredientsHeader;
