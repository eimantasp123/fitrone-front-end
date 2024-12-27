import EmptyState from "@/components/common/EmptyState";
import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import WeeklyMenuByIdPageHeader from "./WeeklyMenuByIdPageHeader";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchWeeklyMenuById } from "@/services/reduxSlices/WeeklyMenuById/weeklyMenuByIdSlice";

const SupplierWeeklyMenyById: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, generalLoading } = useAppSelector(
    (state) => state.weeklyMenuByIdDetails,
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation("weekPlan");

  useEffect(() => {
    if (!id) return;

    if (id && !data[id]) {
      dispatch(fetchWeeklyMenuById(id));
    }
  }, [dispatch, id, data]);

  // console.log(data);

  return (
    <>
      <div className="w-full select-none overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1550px] flex-col items-center">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <WeeklyMenuByIdPageHeader t={t} />
          </div>
          {generalLoading ? (
            <div className="mt-56 flex w-full justify-center overflow-hidden">
              <Spinner size="lg" />
            </div>
          ) : id && !data[id] && !generalLoading ? (
            <EmptyState
              title={t("noMenuForCurrentWeek")}
              description={t("noMenuForCurrentWeekDescription")}
            />
          ) : (
            <div>
              <h1>Weekly Menu</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SupplierWeeklyMenyById;
