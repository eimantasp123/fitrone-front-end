import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { featuresList, tablePlans } from "./mockData/tablePlans";

export default function Tabel() {
  return (
    <>
      <div className="relative my-5 w-full overflow-auto bg-backgroundSecondary scrollbar-none md:text-base">
        <table className="relative w-full table-auto">
          <thead className="relative">
            <tr className="border-b border-borderPrimary bg-background">
              <th className="w-1/4 p-5 text-left text-sm uppercase">
                Features
              </th>
              {tablePlans.map((plan, index) => (
                <th
                  key={index}
                  className="w-1/4 p-5 text-center text-sm uppercase"
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featuresList.map((feature, featureIndex) => (
              <tr key={featureIndex} className="border-b border-borderPrimary">
                {/* Feature Name & Description */}
                <td className="p-5 text-left">
                  <div className="flex w-full flex-col">
                    <p>{feature.title}</p>
                    <p className="text-textSecondary">{feature.description}</p>
                  </div>
                </td>

                {/* Check if the feature is available in each plan */}
                {tablePlans.map((plan, planIndex) => (
                  <td
                    key={planIndex}
                    data-label={plan.name}
                    className="p-5 text-center text-textSecondary"
                  >
                    {plan.features[feature.title] ? (
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
}
