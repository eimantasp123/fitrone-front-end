import EmptyState from "@/components/common/EmptyState";
import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import WeeklyMenuByIdPageHeader from "./WeeklyMenuByIdPageHeader";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchWeeklyMenuById } from "@/services/reduxSlices/WeeklyMenuById/weeklyMenuByIdSlice";
import { Helmet } from "react-helmet-async";
import { capitalizeFirstLetter } from "@/utils/helper";

const SupplierWeeklyMenyById: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["weeklyMenu", "common"]);
  const { data, generalLoading, loading } = useAppSelector(
    (state) => state.weeklyMenuByIdDetails,
  );

  useEffect(() => {
    if (id && !data[id]) {
      dispatch(fetchWeeklyMenuById(id));
    }
  }, [dispatch, id, data]);

  return (
    <>
      <Helmet>
        <title>{id && capitalizeFirstLetter(data[id]?.title)}</title>
      </Helmet>
      <div className="w-full select-none overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1550px] flex-col items-center">
          {generalLoading ? (
            <div className="mt-56 flex w-full justify-center overflow-hidden">
              <Spinner size="lg" />
            </div>
          ) : !generalLoading && id && !data[id] ? (
            <div className="mt-6 h-full w-full">
              <EmptyState
                title={t("notFoundCurrentWeeklyMenuByIdData")}
                status="error"
                description={t("notFoundCurrentWeeklyMenuByIdDescription")}
              />
            </div>
          ) : (
            <>
              <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
                {id && (
                  <WeeklyMenuByIdPageHeader
                    loading={loading}
                    t={t}
                    data={data[id]}
                  />
                )}
              </div>

              <div>
                <h1>Weekly Menu</h1>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SupplierWeeklyMenyById;
