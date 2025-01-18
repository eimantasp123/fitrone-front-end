import { TFunction } from "i18next";
import React from "react";

interface ClientListLabelsProps {
  t: TFunction;
}
/**
 * Client list labels component for the supplier customers page
 */
const ClientListLabels: React.FC<ClientListLabelsProps> = ({ t }) => {
  return (
    <div className="hidden w-full grid-cols-6 gap-2 rounded-lg px-4 pt-1 text-[13px] font-semibold xl:grid xl:grid-cols-[minmax(250px,_350px)_minmax(250px,_350px)_minmax(150px,_250px)_minmax(100px,_1fr)_minmax(100px,_1fr)_50px]">
      {/* Avatar + Name */}
      <div className="col-span-6 flex items-center gap-3 sm:col-span-3 xl:col-auto">
        {t("fullName")}
      </div>

      {/* Email Section */}
      <div className="col-span-6 flex items-center sm:col-span-3 xl:col-auto">
        {t("email")}
      </div>

      {/* Phone Number */}
      <div className="col-span-3 flex items-center xl:col-auto">
        {t("phoneNumber")}
      </div>

      {/* Gender */}
      <div className="col-span-3 flex items-center xl:col-auto">
        {" "}
        {t("genderTitle")}
      </div>

      {/* Customer Status */}
      <div className="col-span-3 flex items-center xl:col-auto">
        {" "}
        {t("statusTitle")}
      </div>

      {/* Menu Button */}
      <div className="col-span-3 flex items-center justify-end xl:col-auto"></div>
    </div>
  );
};

export default ClientListLabels;
