import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import SelectOptions from "./OptionsSelector";
import { useTranslation } from "react-i18next";
import useFiltersOptions from "@/hooks/useFiltersOptions";

interface DietaryRestrictionsProps {
  restrictions: string[];
  setRestrictions: React.Dispatch<React.SetStateAction<string[]>>;
}

const DietaryRestrictions: React.FC<DietaryRestrictionsProps> = ({
  restrictions,
  setRestrictions,
}) => {
  const { t } = useTranslation("meals");
  const { dietaryRestrictions } = useFiltersOptions();

  return (
    <div className="flex w-full flex-col gap-2">
      <h4 className="text-sm">{t("restrictionsTitle")}</h4>
      {restrictions.length !== 0 && (
        <div className="flex flex-wrap items-center gap-1">
          {restrictions.map((restriction) => {
            // Find the translated title for the current restriction
            const translatedRestriction = dietaryRestrictions.find(
              (item) => item.key === restriction,
            )?.title;

            return (
              <div
                key={restriction}
                className="flex items-center gap-2 rounded-full bg-backgroundSecondary px-2 py-1"
              >
                <span className="text-xs text-textSecondary">
                  {translatedRestriction || restriction}{" "}
                  {/* Fallback to key if no translation */}
                </span>

                <IoMdCloseCircle
                  onClick={() =>
                    setRestrictions(
                      restrictions.filter((item) => item !== restriction),
                    )
                  }
                  className="-mb-[1px] cursor-pointer text-[14px] text-red-500"
                />
              </div>
            );
          })}
        </div>
      )}
      <SelectOptions
        options={dietaryRestrictions}
        defaultOption={t("restrictionsPlaceholder")}
        onClick={(option) => {
          if (!restrictions.includes(option.key)) {
            setRestrictions([...restrictions, option.key]);
          }
        }}
      />
    </div>
  );
};

export default DietaryRestrictions;
