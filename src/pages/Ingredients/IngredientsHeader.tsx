import TextButton from "@/components/common/TextButton";
import { setSearchQuery } from "@/services/reduxSlices/Ingredients/ingredientsDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import AddIngredientManualModal from "../Meals/AddIngredientManualModal";

const IngredientsHeader: React.FC = () => {
  const { t } = useTranslation("meals");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.ingredientsDetails);

  const cleanSearch = async () => {
    dispatch(setSearchQuery(""));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <>
      <div className="z-20 flex w-full flex-col gap-4 rounded-lg bg-background px-3 py-3 dark:bg-backgroundSecondary lg:flex-row lg:items-center">
        <input
          type="text"
          value={searchQuery}
          className="h-9 w-full rounded-lg bg-backgroundSecondary px-6 focus:outline-none dark:bg-backgroundSecondary"
          placeholder={t("searchPlaceholder")}
          onChange={handleSearch}
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
