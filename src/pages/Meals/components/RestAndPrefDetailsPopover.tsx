import useFiltersOptions from "@/hooks/useFiltersOptions";
import {
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

interface RestAndPrefDetailsPopoverProps {
  preferences: string[];
  restrictions: string[];
  titleTextSettings?: string;
}

const RestAndPrefDetailsPopover: React.FC<RestAndPrefDetailsPopoverProps> = ({
  preferences,
  restrictions,
  titleTextSettings = "text-xs font-medium",
}) => {
  const { dietaryPreferences, dietaryRestrictions } = useFiltersOptions();
  const { t } = useTranslation("common");

  return (
    <div className="flex w-full items-center gap-4 text-xs">
      {/* Preferences */}
      <Popover>
        <PopoverTrigger>
          <button
            className={`text-nowrap ${titleTextSettings} dark:text-neutral-200`}
          >
            {t("preferencesTitle")}
          </button>
        </PopoverTrigger>
        <PopoverContent sx={{ maxWidth: "270px" }}>
          <PopoverCloseButton />
          <PopoverHeader>{t("selected")}:</PopoverHeader>
          <PopoverBody>
            <div className="flex flex-wrap gap-2 text-xs">
              {preferences.length > 0 ? (
                preferences.map((preference) => {
                  const translatedPreference = dietaryPreferences.find(
                    (item) => item.key === preference,
                  )?.title;

                  return (
                    <span
                      key={preference}
                      className="rounded-full bg-backgroundLight px-[10px] py-[2px] text-textPrimary dark:bg-neutral-800"
                    >
                      {translatedPreference || preference}
                    </span>
                  );
                })
              ) : (
                <span className="rounded-full bg-backgroundLight px-[10px] py-[2px] text-textPrimary dark:bg-neutral-800">
                  {t("noPreferences")}
                </span>
              )}
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      {/* Vertical line */}
      <hr className="h-[12px] w-[1px] bg-borderPrimary dark:bg-borderLight" />

      {/* Preferences */}
      <Popover>
        <PopoverTrigger>
          <button
            className={`text-nowrap ${titleTextSettings} dark:text-neutral-200`}
          >
            {t("restrictionsTitle")}
          </button>
        </PopoverTrigger>
        <PopoverContent sx={{ maxWidth: "270px" }}>
          <PopoverCloseButton />
          <PopoverHeader>{t("selected")}:</PopoverHeader>
          <PopoverBody>
            <div className="flex flex-wrap gap-2 text-xs">
              {restrictions.length > 0 ? (
                restrictions.map((restriction) => {
                  const translatedRestriction = dietaryRestrictions.find(
                    (item) => item.key === restriction,
                  )?.title;

                  return (
                    <span
                      key={restriction}
                      className="rounded-full bg-backgroundLight px-[10px] py-[2px] text-textPrimary dark:bg-neutral-800"
                    >
                      {translatedRestriction || restriction}
                    </span>
                  );
                })
              ) : (
                <span className="rounded-full bg-backgroundLight px-[10px] py-[2px] text-textPrimary dark:bg-neutral-800">
                  {t("noRestrictions")}
                </span>
              )}
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default RestAndPrefDetailsPopover;
