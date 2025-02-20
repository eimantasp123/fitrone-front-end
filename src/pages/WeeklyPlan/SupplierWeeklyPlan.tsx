import { fetchWeeklyPlan } from "@/api/weeklyPlanApi";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import CustomButton from "@/components/common/CustomButton";
import EmptyState from "@/components/common/EmptyState";
import { useDynamicDisclosure } from "@/hooks/useDynamicDisclosure";
import { useDeleteWeeklyPlanMenu } from "@/hooks/WeeklyPlan/useDeleteWeeklyPlanMenu";
import { useManagePublishMenu } from "@/hooks/WeeklyPlan/useManagePublishMenu";
import { useAppSelector } from "@/store";
import { WeeklyPlanItemCardProps } from "@/utils/types";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import AssignClientsToCurrentWeeklyPlanMenuModal from "./AssignClientsToCurrentWeeklyPlanMenuModal";
import AssignExistingMenuModal from "./AssignExistingMenuModal";
import WeeklyPlanItemCard from "./components/WeeklyPlanItemCard";
import useTime from "./useTime";
import WeeklyPlanHeader from "./WeeklyPlanHeader";

/**
 *  Supplier Weekly Plan Page Component for attaching a weekly menu to a current week
 */
const SupplierWeeklyPlan: React.FC = () => {
  const { t } = useTranslation(["weeklyPlan", "common", "timezone"]);
  const { details: user } = useAppSelector((state) => state.personalDetails);
  const [weeklyPlanMenuId, setWeeklyPlanMenuId] = useState<string | null>(null);
  const [weeklyPlanMenuPublised, setWeeklyPlanMenuPublised] =
    useState<boolean>(false);
  // Time related hooks
  const { weekNumber, formattedWeekRange, year, navigateWeeks } = useTime(
    user.timezone ?? null,
  );

  //  Dynamic Disclosure for modals
  const { isOpen, openModal, closeModal, closeAllModals } =
    useDynamicDisclosure();

  // Mutation function to delete weekly plan
  const { mutate: deleteWeeklyPlan, isPending } = useDeleteWeeklyPlanMenu(
    () => {
      setWeeklyPlanMenuId(null);
      closeAllModals();
    },
  );

  // Mutation function to manage publish weekly plan
  const { mutate: managePublishWeeklyPlan, isPending: loading } =
    useManagePublishMenu(() => {
      setWeeklyPlanMenuId(null);
      setWeeklyPlanMenuPublised(false);
      closeAllModals();
    });

  // Fetch the weekly plan data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["weeklyPlan", { year, weekNumber }],
    queryFn: () => fetchWeeklyPlan(year, weekNumber),
    enabled: !!user.timezone,
    staleTime: 1000 * 60 * 10, // 10 minutes
    placeholderData: (prev) => prev,
  });

  const weekData = useMemo(() => data?.data?.assignMenu, [data]);
  const mainObject = useMemo(() => data?.data, [data]);

  // Handle Add Menu Click
  const handleAddMenuClick = () => {
    if (user.timezone) {
      openModal("setMenus");
    } else {
      openModal("noTimezone");
    }
  };

  // Handle open delete week plan modal
  const handleOpenDeleteWeeklyPlanModal = (menuId: string) => {
    setWeeklyPlanMenuId(menuId);
    openModal("delete");
  };

  // Handle Delete Week Plan
  const handleDeleteWeeklyPlan = () => {
    if (!weeklyPlanMenuId && !year && !weekNumber) return;
    deleteWeeklyPlan({
      year,
      week: weekNumber,
      menuId: weeklyPlanMenuId as string,
    });
  };

  // Handle open manage publish weekly plan modal
  const handleOpenManagePublishModal = (menuId: string) => {
    setWeeklyPlanMenuId(menuId);
    openModal("managePublish");
  };

  // Manage publish weekly plan handler
  const managePublishWeeklyPlanHandler = () => {
    if (!weeklyPlanMenuId) return;
    managePublishWeeklyPlan({
      year,
      week: weekNumber,
      menuId: weeklyPlanMenuId as string,
      publish: !weeklyPlanMenuPublised,
    });
  };

  // Enabled weekly plan
  const disableWeeklyPlan = useMemo(() => {
    return mainObject?.status === "expired";
  }, [mainObject]);

  // Assign action handler
  const assignAction = (weeklyPlanMenuId: string) => {
    setWeeklyPlanMenuId(weeklyPlanMenuId);
    openModal("assignAction");
  };

  return (
    <>
      <div className="w-full select-none overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1700px] flex-col items-center">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <WeeklyPlanHeader
              timezone={user.timezone ?? null}
              t={t}
              isOpen={isOpen}
              openModal={openModal}
              closeModal={closeModal}
              closeAllModals={closeAllModals}
              navigateWeeks={navigateWeeks}
              weekNumber={weekNumber}
              formattedWeekRange={formattedWeekRange}
            />
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="mt-56 flex w-full justify-center overflow-hidden">
              <Spinner size="lg" />
            </div>
          )}

          {/* Error state */}
          {isError && (
            <div className="flex w-full justify-center">
              <EmptyState
                title={t("common:error")}
                status="error"
                description={t("common:errorsMessage.errorFetchingData")}
              />
            </div>
          )}

          {/* No menu for the current week */}
          {!weekData?.length && !isLoading && !isError && (
            <EmptyState
              title={
                !disableWeeklyPlan
                  ? t("noMenuForCurrentWeek")
                  : t("weekExpired")
              }
              description={
                !disableWeeklyPlan
                  ? t("noMenuForCurrentWeekDescription")
                  : t("weekExpiredDescription")
              }
              firstButtonText={!disableWeeklyPlan ? t("addMenu") : null}
              onClickFirstButton={handleAddMenuClick}
              disabledFirstButton={disableWeeklyPlan}
            />
          )}

          {/* Menu for the current week */}
          {weekData && weekData?.length !== 0 && (
            <div className="mb-12 mt-3 flex w-full flex-col-reverse gap-3 px-4">
              {weekData.map((item: WeeklyPlanItemCardProps) => (
                <WeeklyPlanItemCard
                  delete={handleOpenDeleteWeeklyPlanModal}
                  publish={handleOpenManagePublishModal}
                  setPublish={setWeeklyPlanMenuPublised}
                  assignAction={assignAction}
                  disabled={mainObject?.status !== "active"}
                  key={item._id}
                  {...item}
                />
              ))}

              {!disableWeeklyPlan && (
                <div className="flex w-full flex-col gap-3 md:-mt-2">
                  <CustomButton
                    widthFull={true}
                    paddingY="py-2 md:py-3"
                    text={t("addMenu")}
                    onClick={() => openModal("setMenus")}
                  />
                  <span className="text-sm">
                    {t("assignedMenus")}: {weekData?.length || 0}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Assign Existing Menu Modal */}
      {isOpen("setMenus") && (
        <AssignExistingMenuModal
          isOpen={isOpen("setMenus")}
          onClose={() => closeModal("setMenus")}
          year={year}
          weekNumber={weekNumber}
          weeklyPlanId={data?.data._id}
        />
      )}
      {/* Confirm open timezone modal */}
      {isOpen("noTimezone") && (
        <ConfirmActionModal
          loading={false}
          confirmButtonText={t("set")}
          cancelButtonText={t("common:cancel")}
          isOpen={isOpen("noTimezone")}
          onClose={() => closeModal("noTimezone")}
          title={t("selectTimezone")}
          description={t("noTimezoneSelected")}
          onAction={() => {
            closeModal("noTimezone");
            setTimeout(() => {
              openModal("timezone");
            }, 100);
          }}
          type="primary"
        />
      )}
      {/* Publish or unplish week plan */}
      {isOpen("managePublish") && (
        <ConfirmActionModal
          loading={loading}
          loadingSpinner={false}
          confirmButtonText={
            weeklyPlanMenuPublised ? t("common:unpublish") : t("common:publish")
          }
          cancelButtonText={t("common:cancel")}
          isOpen={isOpen("managePublish")}
          onClose={() => {
            setWeeklyPlanMenuId(null);
            setWeeklyPlanMenuPublised(false);
            closeModal("managePublish");
          }}
          title={
            weeklyPlanMenuPublised
              ? t("unpublishWeeklyPlanMenu")
              : t("publishWeeklyPlanMenu")
          }
          description={
            weeklyPlanMenuPublised
              ? t("unpublishWeeklyPlanMenuDescription")
              : t("publishWeeklyPlanMenuDescription")
          }
          onAction={() => managePublishWeeklyPlanHandler()}
          type="primary"
        />
      )}
      {/* Delete week plan */}
      {isOpen("delete") && (
        <ConfirmActionModal
          loading={isPending}
          loadingSpinner={false}
          confirmButtonText={t("common:delete")}
          cancelButtonText={t("common:cancel")}
          isOpen={isOpen("delete")}
          onClose={() => {
            setWeeklyPlanMenuId(null);
            closeModal("delete");
          }}
          title={t("deleteWeeklyPlanMenu")}
          description={t("deleteWeeklyPlanMenuDescription")}
          onAction={handleDeleteWeeklyPlan}
          type="delete"
        />
      )}

      {/* Assign Clients modal */}
      {isOpen("assignAction") && (
        <AssignClientsToCurrentWeeklyPlanMenuModal
          isOpen={isOpen("assignAction")}
          onClose={() => {
            closeModal("assignAction");
            setWeeklyPlanMenuId(null);
          }}
          weeklyPlanId={data?.data._id}
          weeklyPlanMenuId={weeklyPlanMenuId ?? ""}
        />
      )}
    </>
  );
};

export default SupplierWeeklyPlan;
