import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const MealCard = ({ title, calories, protein, carbs, fats, id }) => {
  const navigate = useNavigate();

  const handleMealClick = () => {
    navigate(`/meal-plan/${id}`);
  };

  return (
    <div className="flex w-full flex-col gap-2 overflow-hidden rounded-lg bg-background p-2 shadow-custom-light2 dark:bg-backgroundSecondary sm:flex-row">
      {/* Left side  */}
      <div
        style={{ backgroundImage: "url('/food.jpg')" }}
        className="relative h-40 w-full overflow-hidden rounded-lg bg-cover bg-center sm:h-full sm:w-[35%]"
      />

      {/* Right side  */}
      <div className="p-1 sm:w-[65%]">
        <div className="flex justify-between gap-1 border-b-[1px] px-3 py-1">
          {/*  */}
          <div className="w-full flex-1 text-start">
            <h2 className="text-[16px] font-medium text-textPrimary">
              {title}
            </h2>
          </div>
          <div className="flex w-[25%] items-start justify-end">
            <p className="rounded-full text-sm font-semibold text-textPrimary">
              {calories} Kcal
            </p>
          </div>
        </div>

        {/* Nutrition details */}
        <div className="flex w-full gap-3 border-b-[1px] px-3 py-2 text-xs md:gap-5">
          <div className="flex justify-center gap-2">
            <p className="font-medium">Carbs:</p>
            <p className="text-textPrimary">{carbs}g</p>
          </div>

          <div className="flex justify-center gap-2">
            <p className="font-medium">Protein:</p>
            <p className="text-textPrimary">{protein}g</p>
          </div>

          <div className="flex justify-center gap-2">
            <p className="font-medium">Fat:</p>
            <p className="text-textPrimary">{fats}g</p>
          </div>
        </div>

        {/* Preferences */}
        <div className="flex w-full items-center gap-2 border-b-[1px] px-3 py-2 text-xs">
          <p className="font-medium dark:text-neutral-200">Preferences:</p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-backgroundSecondary px-[10px] py-[2px] text-textPrimary dark:bg-backgroundLight">
              Vegetarian
            </span>
            <span className="rounded-full bg-backgroundSecondary px-[10px] py-[2px] text-textPrimary dark:bg-backgroundLight">
              Veget
            </span>
            <span className="rounded-full bg-backgroundSecondary px-[10px] py-[2px] text-textPrimary dark:bg-backgroundLight">
              Keto
            </span>
          </div>
        </div>

        {/* Preferences */}
        <div className="flex w-full items-center gap-2 border-b-[1px] px-3 py-2 text-xs">
          <p className="font-medium dark:text-neutral-200">Restrictions:</p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-backgroundSecondary px-[10px] py-[2px] text-textPrimary dark:bg-backgroundLight">
              Gluten-free
            </span>
            <span className="rounded-full bg-backgroundSecondary px-[10px] py-[2px] text-textPrimary dark:bg-backgroundLight">
              sugar-free
            </span>
            <span className="rounded-full bg-backgroundSecondary px-[10px] py-[2px] text-textPrimary dark:bg-backgroundLight">
              Soy-free
            </span>
          </div>
        </div>

        {/* Call to action buttons */}
        <div className="flex gap-2 border-t-[1px] pb-1 pt-3">
          <button className="flex-1 rounded-md px-6 py-[6px] text-sm text-red-600 transition-colors duration-200 ease-in-out hover:bg-red-50 dark:hover:bg-red-700/20">
            Delete
          </button>
          <button className="flex-1 rounded-md bg-primary px-6 py-[6px] text-sm text-black transition-colors duration-200 ease-in-out hover:bg-primaryLight dark:hover:bg-primaryDark">
            Edit & View Details
          </button>
        </div>
      </div>
    </div>
  );
};

MealCard.propTypes = {
  title: PropTypes.string,
  calories: PropTypes.number,
  protein: PropTypes.number,
  carbs: PropTypes.number,
  fats: PropTypes.number,
  onClick: PropTypes.func,
  id: PropTypes.string,
};
