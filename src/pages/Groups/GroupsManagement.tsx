import { fetchGroups } from "@/api/groupsApi";
import CustomButton from "@/components/common/CustomButton";
import { useDynamicDisclosure } from "@/hooks/useDynamicDisclosure";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { GrSelect } from "react-icons/gr";
import { MdOutlineClose } from "react-icons/md";
import { Outlet, useParams } from "react-router-dom";
import GroupMenu from "./components/GroupMenu";
import CreateOrUpdateGroupModal from "./components/CreateOrUpdateGroupModal";

export interface Group {
  _id: string;
  title: string;
  description?: string;
  createdAt: string;
}

/**
 *  Groups Management Component (Parent Component)
 */
const GroupsManagement: React.FC = () => {
  const { t } = useTranslation(["groups", "common"]);
  const { isOpen, openModal, closeModal } = useDynamicDisclosure();
  const [isDrawerVisible] = useMediaQuery("(max-width: 768px)");
  const { colorMode } = useColorMode();
  const { groupId } = useParams();

  // Fetch supplier groups from the server using infinite query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
    retry: 3,
  });

  return (
    <>
      <div className="h-full w-full">
        <div className="container mx-auto mb-32 flex h-full w-full max-w-[1550px] flex-1 flex-col gap-3 p-4 md:flex-row md:pt-6">
          {/* SideBar */}
          <aside className="hidden flex-col gap-3 overflow-y-hidden rounded-lg bg-background dark:bg-backgroundSecondary md:flex md:w-[50%] xl:w-[40%] 2xl:w-[30%]">
            <GroupMenu
              t={t}
              groupId={groupId ?? ""}
              groups={data?.data}
              isError={isError}
              isLoading={isLoading}
              openModal={openModal}
            />
          </aside>

          <div className="md:hidden">
            <CustomButton
              text={t("seeAllGroups")}
              widthFull={true}
              onClick={() => openModal("sidebar")}
            />
          </div>

          {!groupId && (
            <div className="flex h-full w-[100%] flex-col items-center justify-center gap-1 rounded-lg bg-background text-center text-sm dark:bg-backgroundSecondary">
              <GrSelect className="mb-2 text-2xl" />
              <h4 className="font-semibold">{t("emptyState.title")}</h4>
              <p className="px-6">{t("emptyState.description")}</p>
            </div>
          )}

          {/* Single group management */}
          <Outlet />
        </div>
      </div>

      {/* Create group modal */}
      {isOpen("createGroup") && (
        <CreateOrUpdateGroupModal
          isOpen={isOpen("createGroup")}
          onClose={() => closeModal("createGroup")}
          t={t}
        />
      )}

      {/* Sidebar for groups menu */}
      {isDrawerVisible && isOpen("sidebar") && (
        <Drawer
          placement="left"
          onClose={() => closeModal("sidebar")}
          isOpen={isOpen("sidebar")}
        >
          <DrawerOverlay />
          <DrawerContent
            sx={{
              maxWidth: "280px",
              background:
                colorMode === "dark"
                  ? "dark.backgroundSecondary"
                  : "light.background",
            }}
          >
            <div
              onClick={() => closeModal("sidebar")}
              className="border-1 absolute -right-[50px] top-4 flex size-8 cursor-pointer items-center justify-center rounded-full border-borderPrimary bg-background"
            >
              <MdOutlineClose className="text-xl text-textPrimary" />
            </div>

            <DrawerBody
              sx={{
                padding: "0px 0px",
              }}
            >
              <GroupMenu
                t={t}
                groups={data?.data}
                groupId={groupId ?? ""}
                closeModal={closeModal}
                isLoading={isLoading}
                isError={isError}
                openModal={openModal}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default GroupsManagement;
