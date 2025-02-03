import CustomButton from "@/components/common/CustomButton";
import { format, parseISO } from "date-fns";
import { TFunction } from "i18next";
import { useNavigate } from "react-router-dom";
import { Group } from "../GroupsManagement";
import { Spinner } from "@chakra-ui/react";
import EmptyState from "@/components/common/EmptyState";

/**
 *  Menu Component
 */
const GroupMenu = ({
  t,
  closeModal,
  openModal,
  groupId,
  groups,
  isLoading,
  isError,
}: {
  t: TFunction;
  groupId: string;
  closeModal?: (group: string) => void;
  openModal: (group: string) => void;
  groups: Group[];
  isLoading?: boolean;
  isError?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="sticky top-0 flex w-full flex-col gap-2 bg-background px-4 pb-2 pt-4 dark:bg-backgroundSecondary">
        <h4 className="text-sm">{t("allGroups")}</h4>
        <CustomButton
          onClick={() => openModal("createGroup")}
          text={`+ ${t("addNewGroup")}`}
          type="primary_outline"
        />
      </div>
      <div className="mx-2 mb-4 mt-0 flex h-full flex-col gap-[6px] overflow-y-auto px-2 pb-2 scrollbar-thin">
        {isError && !isLoading && (
          <div className="flex justify-center">
            <EmptyState
              title={t("common:error")}
              status="error"
              description={t("common:errorsMessage.errorFetchingData")}
            />
          </div>
        )}

        {/* Loading State */}
        {isLoading && !isError && (
          <div className="flex h-32 w-full items-center justify-center">
            <Spinner size="md" />
          </div>
        )}

        {/* Display all groups */}
        {!isLoading &&
          !isError &&
          groups &&
          groups.length > 0 &&
          groups.map((group, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/groups/${group._id}`);
                if (closeModal) closeModal("sidebar");
              }}
              className={`flex flex-col ${groupId === group._id ? "bg-primary text-black" : "bg-backgroundSecondary hover:bg-backgroundLight dark:bg-background dark:hover:bg-backgroundDark"} cursor-pointer rounded-lg p-3 text-sm transition-colors duration-200 ease-in-out`}
            >
              <p className="font-medium">{group.title}</p>
              <p className="text-xs">
                {t("common:createdAt")}:{" "}
                {format(parseISO(group.createdAt), "yyyy-MM-dd")}{" "}
              </p>
            </div>
          ))}

        {/* No Group  yet */}
        {!isLoading && !isError && groups.length === 0 && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-primary bg-primaryLighter text-center dark:bg-primaryLighter md:h-full">
            <h4 className="text-sm font-semibold">{t("emptySidebar.title")}</h4>
            <p className="px-4 text-sm">{t("emptySidebar.description")}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default GroupMenu;
