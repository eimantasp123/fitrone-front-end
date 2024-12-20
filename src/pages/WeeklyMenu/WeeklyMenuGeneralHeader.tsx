import CustomButton from "@/components/common/CustomButton";
import { useTranslation } from "react-i18next";

const WeeklyMenuGeneralHeader: React.FC = () => {
  const { t } = useTranslation("weekPlan");

  return (
    <>
      <div className="z-20 grid w-full grid-cols-1 grid-rows-3 gap-2 bg-background px-5 py-3 dark:bg-backgroundSecondary sm:grid-cols-2 sm:grid-rows-2 md:rounded-lg xl:grid-cols-6 xl:grid-rows-1">
        <div className="text-center sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-2 sm:text-end xl:col-span-2 xl:row-auto">
          <CustomButton text="Create menu" type="primary" />
        </div>
      </div>
    </>
  );
};

export default WeeklyMenuGeneralHeader;
