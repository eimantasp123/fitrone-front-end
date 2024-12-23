import { Spinner } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

interface PagePaginationProps {
  currentPage: number;
  totalPages: number;
  nextPageLoading?: boolean;
  goPrevious: () => void;
  goNext: () => void;
}

const PagePagination: React.FC<PagePaginationProps> = ({
  currentPage,
  totalPages,
  goPrevious,
  goNext,
  nextPageLoading,
}) => {
  const { t } = useTranslation("common");
  return (
    <div className="-mt-3 mb-5 flex w-full items-center justify-center gap-4 px-4 sm:justify-end">
      <button
        disabled={currentPage === 1}
        onClick={goPrevious}
        className="w-[120px] rounded-md bg-background px-4 py-2 text-sm text-textPrimary transition-colors duration-200 ease-in-out hover:bg-neutral-200 disabled:opacity-50 dark:bg-backgroundLight dark:hover:bg-neutral-800 sm:w-[140px] sm:text-sm"
      >
        {t("previousPage")}
      </button>
      <span className="text-center text-xs md:text-sm">
        {t("page")} {currentPage} {t("of")} {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={goNext}
        className="w-[120px] rounded-md bg-primary px-4 py-2 text-sm text-black transition-colors duration-200 ease-in-out hover:bg-primaryLight disabled:opacity-50 dark:hover:bg-primaryDark sm:w-[140px] sm:text-sm"
      >
        {nextPageLoading ? <Spinner size="sm" /> : t("nextPage")}
      </button>
    </div>
  );
};

export default PagePagination;
