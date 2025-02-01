import { fetchWeekPlan } from "@/api/weekPlanApi";
import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import EmptyState from "@/components/common/EmptyState";
import { useDynamicDisclosure } from "@/hooks/useDynamicDisclosure";
import { useAppSelector } from "@/store";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import AssignExistingMenuModal from "./AssignExistingMenuModal";
import useTime from "./useTime";
import WeekPlanHeader from "./WeekPlanHeader";
import WeekPlanItemCard from "./components/WeekPlanItemCard";
import { WeekPlanItemCardProps } from "@/utils/types";
import { useMemo, useState } from "react";
import CustomButton from "@/components/common/CustomButton";
import { useDeleteWeekPlanMenu } from "@/hooks/WeekPlan/useDeleteWeekPlanMenu";
import { useManagePublishMenu } from "@/hooks/WeekPlan/useManagePublishMenu";
import AssignClientsModal from "./AssignClientsModal";

/**
 *  Supplier Week Plan Page Component for attaching a weekly menu to a current week
 */
const SupplierWeekPlan: React.FC = () => {
  const { t } = useTranslation(["weekPlan", "common", "timezone"]);
  const { details: user } = useAppSelector((state) => state.personalDetails);
  const [weekPlanMenuId, setWeekPlanMenuId] = useState<string | null>(null);
  const [weekPlanMenuPublised, setWeekPlanMenuPublised] =
    useState<boolean>(false);
  // Time related hooks
  const { weekNumber, formattedWeekRange, year, navigateWeeks } = useTime(
    user.timezone ?? null,
  );

  //  Dynamic Disclosure for modals
  const { isOpen, openModal, closeModal, closeAllModals } =
    useDynamicDisclosure();

  // Mutation function to delete week plan
  const { mutate: deleteWeekPlan, isPending } = useDeleteWeekPlanMenu(() => {
    setWeekPlanMenuId(null);
    closeAllModals();
  });

  // Mutation function to manage publish week plan
  const { mutate: managePublishWeekPlan, isPending: loading } =
    useManagePublishMenu(() => {
      setWeekPlanMenuId(null);
      setWeekPlanMenuPublised(false);
      closeAllModals();
    });

  // Fetch the week plan data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["weekPlan", { year, weekNumber }],
    queryFn: () => fetchWeekPlan(year, weekNumber),
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
  const handleOpenDeleteWeekPlanModal = (menuId: string) => {
    setWeekPlanMenuId(menuId);
    openModal("delete");
  };

  // Handle Delete Week Plan
  const handleDeleteWeekPlan = () => {
    if (!weekPlanMenuId && !year && !weekNumber) return;
    deleteWeekPlan({
      year,
      week: weekNumber,
      menuId: weekPlanMenuId as string,
    });
  };

  // Handle open manage publish week plan modal
  const handleOpenManagePublishModal = (menuId: string) => {
    setWeekPlanMenuId(menuId);
    openModal("managePublish");
  };

  // Manage publish week plan handler
  const managePublishWeekPlanHandler = () => {
    if (!weekPlanMenuId) return;
    managePublishWeekPlan({
      year,
      week: weekNumber,
      menuId: weekPlanMenuId as string,
      publish: !weekPlanMenuPublised,
    });
  };

  // Handle open assign clients modal
  const handelOpenAssignClientsModal = () => {
    openModal("assignedClients");
  };

  // Handle open assign group modal
  const handelOpenAssignGroupModal = () => {
    openModal("assignedGroup");
  };

  // Enabled week plan
  const disableWeekPlan = useMemo(() => {
    return mainObject?.status === "expired";
  }, [mainObject]);

  return (
    <>
      <div className="w-full select-none overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1550px] flex-col items-center">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <WeekPlanHeader
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
                !disableWeekPlan ? t("noMenuForCurrentWeek") : t("weekExpired")
              }
              description={
                !disableWeekPlan
                  ? t("noMenuForCurrentWeekDescription")
                  : t("weekExpiredDescription")
              }
              firstButtonText={!disableWeekPlan ? t("addMenu") : null}
              onClickFirstButton={handleAddMenuClick}
              disabledFirstButton={disableWeekPlan}
            />
          )}

          {/* Menu for the current week */}
          {weekData && weekData?.length !== 0 && (
            <div className="mb-12 mt-3 flex w-full flex-col-reverse gap-3 px-4">
              {weekData.map((item: WeekPlanItemCardProps) => (
                <WeekPlanItemCard
                  delete={handleOpenDeleteWeekPlanModal}
                  publish={handleOpenManagePublishModal}
                  setPublish={setWeekPlanMenuPublised}
                  assignClient={handelOpenAssignClientsModal}
                  assignGroup={handelOpenAssignGroupModal}
                  disabled={mainObject?.status !== "active"}
                  key={item._id}
                  {...item}
                />
              ))}
              {!disableWeekPlan && (
                <CustomButton
                  widthFull={true}
                  paddingY="py-2 md:py-3"
                  text={t("addMenu")}
                  onClick={() => openModal("setMenus")}
                />
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
          weekPlanId={data?.data._id}
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
            weekPlanMenuPublised ? t("common:unpublish") : t("common:publish")
          }
          cancelButtonText={t("common:cancel")}
          isOpen={isOpen("managePublish")}
          onClose={() => {
            setWeekPlanMenuId(null);
            setWeekPlanMenuPublised(false);
            closeModal("managePublish");
          }}
          title={
            weekPlanMenuPublised
              ? t("unpublishWeekPlanMenu")
              : t("publishWeekPlanMenu")
          }
          description={
            weekPlanMenuPublised
              ? t("unpublishWeekPlanMenuDescription")
              : t("publishWeekPlanMenuDescription")
          }
          onAction={() => managePublishWeekPlanHandler()}
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
            setWeekPlanMenuId(null);
            closeModal("delete");
          }}
          title={t("deleteWeekPlanMenu")}
          description={t("deleteWeekPlanMenuDescription")}
          onAction={handleDeleteWeekPlan}
          type="delete"
        />
      )}

      {/* Assign Clients modal */}
      {isOpen("assignedClients") && (
        <AssignClientsModal
          isOpen={isOpen("assignedClients")}
          onClose={() => {
            closeModal("assignedClients");
          }}
          year={year}
          weekNumber={weekNumber}
          weekPlanId={data?.data._id}
        />
      )}

      {/* Assign group modal */}
      {isOpen("assignedGroup") && (
        <AssignClientsModal
          isOpen={isOpen("assignedGroup")}
          onClose={() => {
            closeModal("assignedGroup");
          }}
          year={year}
          weekNumber={weekNumber}
          weekPlanId={data?.data._id}
        />
      )}
    </>
  );
};

export default SupplierWeekPlan;

// Lambda Handler to Get Users
export const handler = async () => {
  await connectDB();

  // Get the current year and week number in UTC time
  const now = new Date();
  const currentYear = getYear(now);
  const currentWeek = getWeek(now);

  console.log(
    `Processing week plan expiration for year ${currentYear}, week ${currentWeek}`,
  );

  // Find past weeks plans
  const expiredWeekPlans = await WeekPlan.find({
    $or: [
      { year: { $lt: currentYear } }, // Expire all previous years
      { year: currentYear, weekNumber: { $lt: currentWeek } }, // Expire past weeks in current year
    ],
  });

  console.log(`Found ${expiredWeekPlans.length} expired week plans.`);

  // Update the status of expired week plans
  await WeekPlan.updateMany(
    {
      _id: { $in: expiredWeekPlans.map((plan) => plan._id) },
    },
    {
      $set: { status: "expired", isSnapshot: true },
    },
  );

  console.log("Expired week plans updated.");

  // Process WeeklyMenu to Remore expired weeks
  const expiredWeeks = expiredWeekPlans.map((plan) => ({
    year: plan.year,
    weekNumber: plan.weekNumber,
  }));

  console.log(
    `Processing ${expiredWeeks.length} expired week references in WeeklyMenu.`,
  );

  await WeeklyMenu.updateMany(
    {
      "activeWeeks.year": { $lt: currentYear },
      "activeWeeks.weekNumber": { $lt: currentWeek },
    },
    { $pull: { activeWeeks: { $in: expiredWeeks } } },
  );

  console.log("Expired weeks removed from WeeklyMenu.");

  await WeeklyMenu.updateMany(
    {
      activeWeeks: { $size: 0 },
    },
    {
      $set: { status: "inactive" },
    },
  );

  console.log("WeeklyMenu status updated where no active weeks remain.");
};
