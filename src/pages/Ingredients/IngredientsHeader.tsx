import CustomButton from "@/components/common/CustomButton";
import { setSearchQuery } from "@/services/reduxSlices/Ingredients/ingredientsDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import AddIngredientManualModal from "../Meals/components/IngredientManualAddModal";
import CustomSearchInput from "@/components/common/CustomSearchInput";

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
        <CustomSearchInput
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          cleanSearch={cleanSearch}
          t={t}
        />
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
