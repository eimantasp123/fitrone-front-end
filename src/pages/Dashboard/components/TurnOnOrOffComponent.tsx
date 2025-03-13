import { useTranslation } from "react-i18next";
import { IoCloseOutline } from "react-icons/io5";
import { MdDone } from "react-icons/md";

/**
 *  A component that displays a message and icon to indicate that something is turned off.
 * @param param0 active - A boolean value to determine if the component should display the "on" or "off" state.
 * @returns A component that displays a message and icon to indicate that something is turned off.
 */
const TurnOnOrOffComponent = ({ active }: { active: boolean }) => {
  const { t } = useTranslation("dashboard");
  return (
    <div
      className={`flex items-center gap-2 rounded-full border text-[13px] ${active ? "border-primary" : "border-red-500"} px-2 py-[3px]`}
    >
      {active ? <MdDone /> : <IoCloseOutline className="text-[16px]" />}
      <p>{active ? `${t("enabled")}` : `${t("disabled")}`}</p>
    </div>
  );
};

export default TurnOnOrOffComponent;
