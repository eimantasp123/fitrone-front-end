import ConfirmActionModal from "@/components/common/ConfirmActionModal";
import { TFunction } from "i18next";
import React from "react";

interface IPerformActionModalProps {
  modalState: {
    type: "delete" | "archive" | "unarchive" | null;
    id: string | null;
  };
  closeModal: () => void;
  loading: boolean;
  onAction: () => void;
  t: TFunction;
}

const PerformActionModal: React.FC<IPerformActionModalProps> = ({
  modalState,
  closeModal,
  loading,
  onAction,
  t,
}) => {
  return (
    <ConfirmActionModal
      isOpen={!!modalState.type}
      onClose={closeModal}
      loading={loading}
      loadingSpinner={false}
      type={
        modalState.type === "delete"
          ? "delete"
          : modalState.type === "archive"
            ? "warning"
            : "primary"
      }
      onAction={onAction}
      title={
        modalState.type === "delete"
          ? t("deleteWeeklyMenuTitle")
          : modalState.type === "archive"
            ? t("archiveWeeklyMenuModalTitle")
            : t("unarchiveWeeklyMenuModalTitle")
      }
      description={
        modalState.type === "delete"
          ? t("deleteWeeklyMenuDescription")
          : modalState.type === "archive"
            ? t("archiveWeeklyMenuModalDescription")
            : t("unarchiveWeeklyMenuModalDescription")
      }
      confirmButtonText={
        modalState.type === "delete"
          ? t("deleteWeeklyMenu")
          : modalState.type === "archive"
            ? t("archiveWeeklyMenu")
            : t("unarchiveWeeklyMenu")
      }
      cancelButtonText={t("cancel")}
    />
  );
};

export default PerformActionModal;
