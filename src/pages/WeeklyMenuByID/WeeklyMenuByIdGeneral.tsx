import LockPage from "@/components/common/LockPage";
import { useAppSelector } from "@/store";
import React from "react";
import SupplierWeeklyMenyById from "./SupplierWeeklyMenuById";

const WeeklyMenuByIdGeneral: React.FC = () => {
  const { details: user } = useAppSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      {user.plan === "base" && <LockPage userPlan={user.plan} />}
      {user.role === "supplier" && user.plan !== "base" && (
        <SupplierWeeklyMenyById />
      )}
    </>
  );
};

export default WeeklyMenuByIdGeneral;
