import EmptyState from "@/components/common/EmptyState";
import { useWeeklyMenuById } from "@/hooks/WeeklyMenuById/useWeeklyMenuById";
import { capitalizeFirstLetter } from "@/utils/helper";
import { Spinner } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import WeeklyMenuByIdPageDaysManagement from "./WeeklyMenuByIdPageDaysManagement";
import WeeklyMenuByIdPageHeader from "./WeeklyMenuByIdPageHeader";

/**
 * Supplier weekly menu by id component to manage current weekly menu
 */
const SupplierWeeklyMenyById: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation(["weeklyMenu", "common"]);
  const { data, isLoading, isError } = useWeeklyMenuById(id || "");

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="mt-56 flex w-full justify-center overflow-hidden">
          <Spinner size="lg" />
        </div>
      );
    }

    if (isError) {
      return (
        <div className="mt-6 flex w-full justify-center">
          <EmptyState
            title={t("common:error")}
            status="error"
            description={t("common:errorsMessage.errorFetchingData")}
          />
        </div>
      );
    }

    if (id && !data) {
      return (
        <div className="mt-6 flex h-full w-full justify-center">
          <EmptyState
            title={t("notFoundCurrentWeeklyMenuByIdData")}
            status="error"
            description={t("notFoundCurrentWeeklyMenuByIdDescription")}
          />
        </div>
      );
    }

    if (id && data) {
      return (
        <>
          <div className="sticky top-0 z-30 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <WeeklyMenuByIdPageHeader t={t} data={data.data} />
          </div>
          <WeeklyMenuByIdPageDaysManagement data={data.data} />
        </>
      );
    }

    return null;
  };

  return (
    <>
      <Helmet>
        <title>{id && data && capitalizeFirstLetter(data.data.title)}</title>
      </Helmet>
      <div className="w-full select-none overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1700px] flex-col items-center">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default SupplierWeeklyMenyById;
