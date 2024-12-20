import EmptyState from "@/components/common/EmptyState";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import CreateMenuModal from "./modals/CreateMenuModal";
import WeeklyMenuGeneralHeader from "./WeeklyMenuGeneralHeader";

const SupplierWeeklyMenu: React.FC = () => {
  const { t } = useTranslation("weekPlan");
  const {
    isOpen: isMenuModalOpen,
    onOpen: onMenuModalOpen,
    onClose: onMenuModalClose,
  } = useDisclosure();

  useEffect(() => {
    // fetch current week plan
  }, []);

  const mainLoading = false;
  const weeklyMenu = false;

  return (
    <>
      <div className="w-full select-none overflow-y-auto scrollbar-thin">
        <div className="container mx-auto flex max-w-[1550px] flex-col items-center">
          <div className="sticky top-0 z-10 w-full bg-backgroundSecondary pb-2 dark:bg-background md:p-3">
            <WeeklyMenuGeneralHeader />
          </div>
          {mainLoading ? (
            <div className="mt-56 flex w-full justify-center overflow-hidden">
              <Spinner size="lg" />
            </div>
          ) : (
            !weeklyMenu && (
              <EmptyState
                title="You haven’t created a menu. Start creating your first menu now!"
                description='Once you create a menu, it will be displayed here. You can create a menu by clicking on the "Create menu" button below.'
                secondButtonText="add first menu"
                onClickSecondButton={onMenuModalOpen}
              />
            )
          )}
        </div>
      </div>

      {/* Menu modal */}
      {isMenuModalOpen && (
        <CreateMenuModal isOpen={isMenuModalOpen} onClose={onMenuModalClose} />
      )}
    </>
  );
};

export default SupplierWeeklyMenu;
