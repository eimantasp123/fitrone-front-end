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
  className?: string;
  disabled?: boolean;
}

interface FilterPopoverProps {
  title: string;
  items: string[];
  options: { key: string; title: string }[];
  noItemsText: string;
  titleTextSettings: string;
  disabled?: boolean;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({
  title,
  items,
  options,
  noItemsText,
  titleTextSettings,
  disabled = false,
}) => {
  const { t } = useTranslation("common");

  return (
    <Popover>
      <PopoverTrigger>
        <button
          disabled={disabled}
          className={`text-nowrap ${titleTextSettings} dark:text-neutral-200`}
        >
          {t(title)}
        </button>
      </PopoverTrigger>
      <PopoverContent sx={{ maxWidth: "270px" }}>
        <PopoverCloseButton />
        <PopoverHeader>{t("selected")}:</PopoverHeader>
        <PopoverBody>
          <div className="flex flex-wrap gap-2 text-xs">
            {items.length > 0 ? (
              items.map((item) => {
                const translatedItem = options.find(
                  (option) => option.key === item,
                )?.title;

                return (
                  <span
                    key={item}
                    className="rounded-full bg-backgroundLight px-[10px] py-[2px] text-textPrimary dark:bg-neutral-800"
                  >
                    {translatedItem || item}
                  </span>
                );
              })
            ) : (
              <span className="rounded-full bg-backgroundLight px-[10px] py-[2px] text-textPrimary dark:bg-neutral-800">
                {t(noItemsText)}
              </span>
            )}
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const RestAndPrefDetailsPopover: React.FC<RestAndPrefDetailsPopoverProps> = ({
  preferences,
  restrictions,
  titleTextSettings = "text-xs font-medium",
  className,
  disabled = false,
}) => {
  const { dietaryPreferences, dietaryRestrictions } = useFiltersOptions();

  return (
    <div className={`flex w-full ${className} items-center gap-4 text-xs`}>
      {/* Preferences Popover */}
      <FilterPopover
        title="preferencesTitle"
        items={preferences}
        options={dietaryPreferences}
        noItemsText="noPreferences"
        disabled={disabled}
        titleTextSettings={titleTextSettings}
      />

      {/* Vertical Line */}
      <hr className="h-[12px] w-[1px] bg-borderPrimary dark:bg-borderLight" />

      {/* Restrictions Popover */}
      <FilterPopover
        title="restrictionsTitle"
        items={restrictions}
        options={dietaryRestrictions}
        noItemsText="noRestrictions"
        disabled={disabled}
        titleTextSettings={titleTextSettings}
      />
    </div>
  );
};

export default RestAndPrefDetailsPopover;
