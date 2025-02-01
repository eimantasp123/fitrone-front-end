import LockPage from "@/components/common/LockPage";
import { useAppSelector } from "@/store";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import GroupsManagement from "./GroupsManagement";

const Groups: React.FC = () => {
  const { t } = useTranslation("groups");
  const { details: user } = useAppSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>{t("groups")}</title>
      </Helmet>
      {user.plan === "base" && <LockPage userPlan={user.plan} />}
      {user.role === "supplier" && user.plan !== "base" && <GroupsManagement />}
    </>
  );
};

export default Groups;
