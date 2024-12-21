import CustomButton from "@/components/common/CustomButton";
import { setSearchQuery } from "@/services/reduxSlices/Ingredients/ingredientsDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import AddIngredientManualModal from "../Meals/components/AddIngredientManualModal";

const IngredientsHeader: React.FC = () => {
  const { t } = useTranslation("meals");
  const {
    isOpen: isIngredientHeader,
    onClose: onIngredientHeaderClose,
    onOpen: onIngredientHeaderOpen,
  } = useDisclosure();
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
      <div className="z-20 flex w-full flex-col gap-2 bg-background px-3 py-3 dark:bg-backgroundSecondary sm:flex-row md:rounded-lg lg:items-center xl:gap-4">
        <div className="flex w-full gap-3">
          <input
            type="text"
            value={searchQuery}
            className="h-9 w-full rounded-lg bg-backgroundSecondary px-6 placeholder:text-placeholder focus:outline-none dark:bg-background"
            placeholder={t("searchPlaceholder")}
            onChange={handleSearch}
          />

          {searchQuery && (
            <CustomButton
              type="light"
              onClick={cleanSearch}
              text={t("clean")}
            />
          )}
        </div>
        <CustomButton
          onClick={onIngredientHeaderOpen}
          text={`+ ${t("addIngredient")}`}
        />
      </div>
      {/* Ingredient inputs manual */}
      {isIngredientHeader && (
        <AddIngredientManualModal
          isOpen={isIngredientHeader}
          onClose={onIngredientHeaderClose}
        />
      )}
    </>
  );
};

export default IngredientsHeader;
