import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { featuresList, tablePlans } from "./mockData/mockData";
import { useTranslation } from "react-i18next";

const Tabel: React.FC = () => {
  const { t } = useTranslation("subscription");
  return (
    <>
      <div className="relative my-5 w-full overflow-auto bg-backgroundSecondary scrollbar-none dark:bg-background md:text-base">
        <table className="relative w-full table-auto">
          <thead className="relative">
            <tr className="border-b border-borderPrimary bg-background dark:bg-backgroundSecondary">
              <th className="w-1/4 p-5 text-left text-sm uppercase">
                {t("featuresTitle")}
              </th>
              {tablePlans.map((plan, index) => (
                <th
                  key={index}
                  className="w-1/4 p-5 text-center text-sm uppercase"
                >
                  {t(`tablePlans.${plan.key}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featuresList.map((feature, featureIndex) => (
              <tr
                key={featureIndex}
                className="md:border-b md:border-borderPrimary"
              >
                {/* Feature Name & Description */}
                <td className="bg-background p-5 text-left text-sm dark:bg-backgroundSecondary">
                  <div className="flex w-full flex-col">
                    <p className="font-medium">
                      {t(`features.${feature.key}.title`)}
                    </p>
                    <p className="text-textSecondary">
                      {t(`features.${feature.key}.description`)}
                    </p>
                  </div>
                </td>

                {/* Check if the feature is available in each plan */}
                {tablePlans.map((plan, planIndex) => (
                  <td
                    key={planIndex}
                    data-label={t(`tablePlans.${plan.key}`)}
                    className="p-5 text-center text-textSecondary"
                  >
                    {plan.features[
                      feature.key as keyof typeof plan.features
                    ] ? (
                      <span className="flex justify-center">
                        <IoMdCheckmarkCircleOutline className="text-xl text-primaryDark" />
                      </span>
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tabel;
