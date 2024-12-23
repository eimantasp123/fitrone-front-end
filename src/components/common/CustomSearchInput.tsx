import React from "react";
import CustomButton from "./CustomButton";
import { TFunction } from "i18next";

interface CustomSearchInputProps {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cleanSearch: () => void;
  t: TFunction;
}

const CustomSearchInput: React.FC<CustomSearchInputProps> = ({
  searchQuery,
  handleSearch,
  cleanSearch,
  t,
}) => {
  return (
    <div className="flex w-full items-center gap-3">
      <input
        type="text"
        value={searchQuery}
        className="h-9 w-full rounded-lg bg-backgroundSecondary px-6 placeholder:text-placeholder focus:outline-none dark:bg-background"
        placeholder={t("searchPlaceholder")}
        onChange={handleSearch}
      />

      {searchQuery && (
        <CustomButton type="light" onClick={cleanSearch} text={t("clean")} />
      )}
    </div>
  );
};

export default CustomSearchInput;
