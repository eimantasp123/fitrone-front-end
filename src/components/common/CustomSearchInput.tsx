import React from "react";
import CustomButton from "./CustomButton";
import { TFunction } from "i18next";

interface CustomSearchInputProps {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cleanSearch: () => void;
  t: TFunction;
  placeholder?: string;
}

/**
 *  Custom search input component.
 */
const CustomSearchInput: React.FC<CustomSearchInputProps> = ({
  searchQuery,
  handleSearch,
  cleanSearch,
  placeholder,
  t,
}) => {
  let placeholderText;
  if (!placeholder) {
    placeholderText = t("searchPlaceholder");
  } else {
    placeholderText = placeholder;
  }

  return (
    <div className="flex w-full items-center gap-3">
      <input
        type="text"
        value={searchQuery}
        className="h-9 w-full rounded-lg bg-backgroundSecondary px-6 text-[15px] placeholder:text-placeholder focus:outline-none dark:bg-background"
        placeholder={placeholderText}
        onChange={(e) => {
          let value = e.target.value;

          // Prevent leading spaces if input is empty
          if (searchQuery === "" && value.startsWith(" ")) {
            return;
          }

          // Replace multiple spaces with a single space
          value = value.replace(/\s{2,}/g, " ");

          handleSearch({ ...e, target: { ...e.target, value } }); // Pass sanitized input to parent handler
        }}
      />

      {searchQuery && (
        <CustomButton
          type="light"
          onClick={cleanSearch}
          text={t("common:clean")}
        />
      )}
    </div>
  );
};

export default CustomSearchInput;
