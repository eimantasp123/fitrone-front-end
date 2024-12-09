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
                  className="w-1/4 p-5 text-center text-[10px] uppercase md:text-sm"
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
                    className="p-5 text-center text-sm text-textSecondary md:text-base"
                  >
                    {typeof plan.features[
                      feature.key as keyof typeof plan.features
                    ] === "number" ? (
                      // Check if it's "unlimited" for the premium plan
                      plan.key === "premium-plan" &&
                      plan.features[
                        feature.key as keyof typeof plan.features
                      ] === -1 ? (
                        <span>{t("features.unlimited")}</span>
                      ) : (
                        // Otherwise, display the number
                        <span>
                          {
                            plan.features[
                              feature.key as keyof typeof plan.features
                            ]
                          }
                        </span>
                      )
                    ) : typeof plan.features[
                        feature.key as keyof typeof plan.features
                      ] === "boolean" ? (
                      // If the feature is a boolean, display the icon based on its value
                      plan.features[
                        feature.key as keyof typeof plan.features
                      ] ? (
                        <span className="flex justify-center">
                          <IoMdCheckmarkCircleOutline className="text-xl text-primaryDark" />
                        </span>
                      ) : (
                        <span>—</span>
                      )
                    ) : (
                      // Fallback if the feature type is neither number nor boolean
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
