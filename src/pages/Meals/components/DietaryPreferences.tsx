import React from "react";
import SelectOptions from "./OptionsSelector";
import { IoMdCloseCircle } from "react-icons/io";
import { useTranslation } from "react-i18next";
import useFiltersOptions from "@/hooks/useFiltersOptions";

interface DietaryPreferencesProps {
  preferences: string[];
  setPreferences: React.Dispatch<React.SetStateAction<string[]>>;
}

const DietaryPreferences: React.FC<DietaryPreferencesProps> = ({
  preferences,
  setPreferences,
}) => {
  const { t } = useTranslation("meals");
  const { dietaryPreferences } = useFiltersOptions();

  return (
    <div className="flex w-full flex-col gap-2">
      <h4 className="text-sm">{t("preferencesTitle")}</h4>
      {preferences.length !== 0 && (
        <div className="flex flex-wrap items-center gap-1">
          {preferences.map((preference) => {
            // Find the translated title for the current preference
            const translatedPreference = dietaryPreferences.find(
              (item) => item.key === preference,
            )?.title;

            return (
              <div
                key={preference}
                className="flex items-center gap-2 rounded-full bg-backgroundSecondary px-2 py-1"
              >
                <span className="text-xs text-textSecondary">
                  {translatedPreference || preference}{" "}
                </span>

                <IoMdCloseCircle
                  onClick={() =>
                    setPreferences(
                      preferences.filter((item) => item !== preference),
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
        options={dietaryPreferences}
        onClick={(option) => {
          if (!preferences.includes(option.key)) {
            setPreferences([...preferences, option.key]);
          }
        }}
        defaultOption={t("preferencesPlaceholder")}
      />
    </div>
  );
};

export default DietaryPreferences;
