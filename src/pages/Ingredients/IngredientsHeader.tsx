import TextButton from "@/components/common/TextButton";
import { useAppDispatch } from "@/store";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AddIngredientManualModal from "../Meals/AddIngredientManualModal";

const IngredientsHeader: React.FC = () => {
  const { t } = useTranslation("meals");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [query, setQuery] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query.length > 2) {
      console.log(query);
    }
  }, [query]);

  return (
    <>
      <div className="z-20 flex w-full flex-col gap-4 rounded-lg bg-background px-3 py-3 dark:bg-backgroundSecondary lg:flex-row lg:items-center">
        <input
          type="text"
          value={query}
          className="h-9 w-full rounded-lg bg-backgroundSecondary px-6 focus:outline-none dark:bg-backgroundSecondary"
          placeholder={t("searchPlaceholder")}
          onChange={(e) => setQuery(e.target.value)}
        />

        {query && <TextButton onClick={() => setQuery("")} text="Clean" />}
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
