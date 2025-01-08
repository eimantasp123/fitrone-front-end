import CustomButton from "@/components/common/CustomButton";
import CustomSearchInput from "@/components/common/CustomSearchInput";
import { IngredientFromServer } from "@/utils/types";
import { TFunction } from "i18next";

// Props for IngredientsHeader component
interface IngredientsHeaderProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>;
  searchQuery: string | null;
  t: TFunction;
  setModalState: React.Dispatch<{
    type: "create" | "edit" | null;
    ingredient: IngredientFromServer | null;
  }>;
}

/**
 * IngredientsHeader component
 */
const IngredientsHeader: React.FC<IngredientsHeaderProps> = ({
  setSearchQuery,
  searchQuery,
  setModalState,
  t,
}) => {
  return (
    <>
      <div className="z-20 flex w-full flex-col gap-2 bg-background px-3 py-3 dark:bg-backgroundSecondary sm:flex-row md:rounded-lg lg:items-center xl:gap-4">
        <CustomSearchInput
          searchQuery={searchQuery || ""}
          handleSearch={(e) => setSearchQuery(e.target.value || null)}
          cleanSearch={() => setSearchQuery(null)}
          t={t}
        />
        <CustomButton
          onClick={() => setModalState({ type: "create", ingredient: null })}
          text={`+ ${t("addIngredient")}`}
        />
      </div>
    </>
  );
};

export default IngredientsHeader;
