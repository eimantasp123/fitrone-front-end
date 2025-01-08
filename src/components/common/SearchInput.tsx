import { TFunction } from "i18next";
import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdSearch } from "react-icons/md";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  showResults: boolean;
  handleSearch: () => void;
  handleClean: () => void;
  t: TFunction;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  setSearchQuery,
  showResults,
  handleSearch,
  handleClean,
  t,
}) => {
  return (
    <form className="flex items-center">
      <div className="pointer-events-none absolute left-0 flex items-center pl-4">
        <MdSearch className="text-xl text-placeholder" />
      </div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        placeholder={t("searchPlaceholder")}
        className={`w-full px-12 py-3 text-sm ${
          showResults
            ? "focus:border-t-1 focus:border-l-1 focus:border-r-1 rounded-tl-lg rounded-tr-lg border-b-transparent shadow-none"
            : "rounded-lg transition-shadow duration-300 ease-in-out focus:shadow-custom-light4"
        } border border-borderPrimary placeholder-placeholder outline-none`}
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        type="submit"
        className={`absolute right-[2px] m-1 flex h-[34px] cursor-pointer items-center rounded-lg bg-primary px-4 text-sm text-black transition-colors duration-200 ease-in-out hover:bg-primaryLight dark:hover:bg-primaryDark`}
      >
        {t("search")}
      </button>
      {searchQuery && (
        <span
          onClick={handleClean}
          className={`absolute right-[80px] m-1 flex h-[34px] cursor-pointer items-center rounded-lg bg-backgroundSecondary px-3 text-sm dark:bg-backgroundLight`}
        >
          <IoIosCloseCircleOutline className="text-lg" />
        </span>
      )}
    </form>
  );
};

export default SearchInput;
