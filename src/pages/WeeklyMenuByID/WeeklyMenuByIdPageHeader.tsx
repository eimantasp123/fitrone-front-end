import CustomButton from "@/components/common/CustomButton";
import TextButton from "@/components/common/TextButton";
import { TFunction } from "i18next";
import React from "react";
import { useNavigate } from "react-router-dom";

interface WeeklyMenuByIdPageHeaderProps {
  t: TFunction;
}

const WeeklyMenuByIdPageHeader: React.FC<WeeklyMenuByIdPageHeaderProps> = ({
  t,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="z-20 grid w-full grid-cols-1 grid-rows-3 gap-2 bg-background px-5 py-3 dark:bg-backgroundSecondary sm:grid-cols-2 sm:grid-rows-2 md:rounded-lg xl:grid-cols-6 xl:grid-rows-1">
        {/* Navigation Section */}
        <div className="flex items-center justify-center space-x-10 sm:col-span-1 sm:justify-start md:col-span-1 xl:col-span-2">
          {/* Current day */}

          <TextButton
            primary={true}
            className="w-[130px] items-center justify-center gap-3"
            text={t("goBack")}
            onClick={() => navigate(-1)}
          />
        </div>

        {/* Week navigation */}
        <div
          className={`flex items-center justify-center sm:col-span-2 xl:col-span-2`}
        >
          Content here automatically generated
        </div>

        <div className="text-center sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-2 sm:text-end xl:col-span-2 xl:row-auto">
          <CustomButton
            onClick={() => navigate("/weekly-menu")}
            text={t("seeAllMenys")}
            type="primary"
          />
        </div>
      </div>
    </>
  );
};

export default WeeklyMenuByIdPageHeader;
