import CustomButton from "@/components/common/CustomButton";
import CustomSearchInput from "@/components/common/CustomSearchInput";
import { IngredientForOnce } from "@/utils/types";
import { TFunction } from "i18next";

// Props for IngredientsHeader component
interface IngredientsHeaderProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  t: TFunction;
  openModal: (
    type: "create" | "edit",
    ingredient: IngredientForOnce | null,
  ) => void;
}

/**
 * IngredientsHeader component
 */
const IngredientsHeader: React.FC<IngredientsHeaderProps> = ({
  setSearchQuery,
  searchQuery,
  openModal,
  t,
}) => {
  return (
    <>
      <div className="z-20 flex w-full flex-col gap-2 bg-background px-3 py-3 dark:bg-backgroundSecondary sm:flex-row md:rounded-lg lg:items-center xl:gap-4">
        <CustomSearchInput
          searchQuery={searchQuery}
          handleSearch={(e) => setSearchQuery(e.target.value || "")}
          cleanSearch={() => setSearchQuery("")}
          t={t}
        />
        <CustomButton
          onClick={() => openModal("create", null)}
          text={`+ ${t("addIngredient")}`}
        />
      </div>
    </>
  );
};

export default IngredientsHeader;
