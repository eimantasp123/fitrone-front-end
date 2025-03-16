import React from "react";
import CustomButton from "./common/CustomButton";
import { useTranslation } from "react-i18next";

interface IntersectionObserverForFetchPageProps {
  onIntersect: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

/**
 * IntersectionObserverForFetchPage component to fetch more data when the user scrolls to the bottom of the page
 */
const IntersectionObserverForFetchPage: React.FC<
  IntersectionObserverForFetchPageProps
> = ({ onIntersect, hasNextPage, isFetchingNextPage }) => {
  const { t } = useTranslation("common");

  return (
    <>
      {hasNextPage && (
        <div className="mb-10 flex justify-center">
          <CustomButton
            loading={isFetchingNextPage}
            paddingX="px-10"
            loadingSpinner={false}
            text={t("showMore")}
            onClick={onIntersect}
          />
        </div>
      )}
    </>
  );
};

export default IntersectionObserverForFetchPage;
