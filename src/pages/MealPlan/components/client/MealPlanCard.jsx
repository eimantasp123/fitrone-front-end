import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";
import LinkButton from "../../../../components/common/LinkButton";
import TextButton from "../../../../components/common/TextButton";
import { useNavigate } from "react-router-dom";

export const MealPlanCard = ({
  title,
  supplier,
  calories,
  protein,
  carbs,
  fats,
  rating,
  id,
}) => {
  const navigate = useNavigate();

  const handleMealClick = (mealId) => {
    navigate(`/meal-plan/${mealId}`);
  };

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg bg-background p-2 shadow-custom-light2 sm:flex-row">
      <div
        style={{ backgroundImage: "url('/food.jpg')" }}
        className="relative h-40 w-full overflow-hidden rounded-lg bg-cover bg-center sm:h-full sm:w-[40%]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent opacity-40"></div>

        <span className="text-md absolute left-2 top-2 flex items-center gap-2 text-yellow-300">
          <FaStar className="text-md" />
          <span>{rating}</span>
        </span>
      </div>
      {/* Left side  */}
      <div className="sm:w-[60%]">
        <div className="flex items-center justify-between border-b-[1px] p-3">
          {/*  */}
          <div className="w-full flex-1 text-start">
            <h2 className="text-[16px] font-medium text-textPrimary">
              {title}
            </h2>
            <p className="text-sm text-textSecondary">by {supplier}</p>
          </div>
          <div className="flex w-[40%] justify-end">
            <p className="rounded-full py-2 text-sm font-semibold text-textPrimary">
              {calories} Kcal/day
            </p>
          </div>
        </div>

        <div className="flex w-full gap-3 px-3 py-3 text-sm md:gap-5">
          <div className="flex justify-center gap-2">
            <p className="text-neutral-600 dark:text-neutral-200">Carbs:</p>
            <p className="text-textPrimary">{carbs}g</p>
          </div>

          <div className="flex justify-center gap-2">
            <p className="text-neutral-600 dark:text-neutral-200">Protein:</p>
            <p className="text-textPrimary">{protein}g</p>
          </div>

          <div className="flex justify-center gap-2">
            <p className="text-neutral-600 dark:text-neutral-200">Fat:</p>
            <p className="text-textPrimary">{fats}g</p>
          </div>
        </div>

        {/* Call to action buttons */}
        <div className="flex justify-between gap-6 border-t-[1px] p-3">
          <LinkButton
            onClick={() => handleMealClick(id)}
            text="View Details"
            className="pl-2"
          />
          <TextButton text="Subscribe Now" className="px-8" primary={true} />
        </div>
      </div>
    </div>
  );
};

MealPlanCard.propTypes = {
  title: PropTypes.string,
  supplier: PropTypes.string,
  calories: PropTypes.number,
  protein: PropTypes.number,
  carbs: PropTypes.number,
  fats: PropTypes.number,
  rating: PropTypes.number,
  onClick: PropTypes.func,
  id: PropTypes.string,
};
