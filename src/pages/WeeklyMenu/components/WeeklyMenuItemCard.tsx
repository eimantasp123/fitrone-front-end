import { Day } from "@/utils/types";
import React from "react";

interface WeeklyMenuItemCardProps {
  menu: {
    _id: string;
    title: string;
    description: string;
    preferences: string[];
    restrictions: string[];
    days: Day[];
    archived: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

const WeeklyMenuItemCard: React.FC<WeeklyMenuItemCardProps> = ({ menu }) => {
  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-hidden rounded-lg bg-background p-2 shadow-custom-light2 dark:bg-backgroundSecondary sm:flex-row">
      WeeklyMenuItemCard
    </div>
  );
};

export default WeeklyMenuItemCard;
