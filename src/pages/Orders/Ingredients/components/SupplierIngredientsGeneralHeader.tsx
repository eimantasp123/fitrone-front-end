import CustomButton from "@/components/common/CustomButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props {
  openModal: () => void;
}

/**
 * Supplier Ingredients General Header Component
 */
const SupplierIngredientsGeneralHeader: React.FC<Props> = ({ openModal }) => {
  const { t } = useTranslation(["orders", "common"]);
  const navigate = useNavigate();

  return (
    <>
      <div className="grid-rows-auto md:grid-rows-auto z-20 grid grid-cols-2 gap-4 bg-background px-5 py-3 dark:bg-backgroundSecondary md:grid-cols-[120px_1fr_200px] md:rounded-lg">
        {/* Go back button*/}
        <div className="row-start-1 flex items-center">
          <CustomButton
            text="Go back"
            type="lightSecondary"
            onClick={() => navigate(-1)}
          />
        </div>
        {/* Day title and date with status */}
        <div className="col-span-2 flex flex-col items-center justify-center text-sm sm:flex-row md:col-auto md:justify-start">
          <h6 className="font-semibold sm:pr-4">Ingredients lists</h6>
          <span className="text-nowrap sm:border-l-[1px] sm:pl-4">
            Vasario 10 - Vasario 17 (week 3)
          </span>
        </div>

        <div className="row-start-1 flex items-center justify-end md:row-auto">
          <CustomButton
            onClick={() => openModal()}
            text={"Generate selected days list"}
          />
        </div>
      </div>
    </>
  );
};

export default SupplierIngredientsGeneralHeader;
