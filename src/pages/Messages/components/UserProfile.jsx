import PropTypes from "prop-types";
import { IoCloseOutline } from "react-icons/io5";

// Profile Info Component
export default function ProfileInfo({ person, handleProfileClick }) {
  const { email, details, image, name } = person;
  return (
    <aside className="border-border relative flex max-h-full w-[25%] flex-col rounded-2xl border bg-background p-5 shadow-custom-dark2">
      <div className="mb-3 flex w-fit cursor-pointer items-center rounded-xl p-2">
        <img
          src={image}
          alt={name}
          className="size-11 rounded-full shadow-md"
        />
        <div className="flex flex-col space-y-0 pl-3">
          <h3 className="text-md font-semibold text-textPrimary">{name}</h3>
          <p className="text-sm text-textSecondary">{email}</p>
        </div>
      </div>
      <span
        onClick={handleProfileClick}
        className="absolute right-3 top-3 flex size-6 cursor-pointer items-center justify-center rounded-full bg-backgroundSecondary"
      >
        <IoCloseOutline className="" />
      </span>
      <ProfileDetails details={details} />
    </aside>
  );
}

ProfileInfo.propTypes = {
  person: PropTypes.object.isRequired,
  handleProfileClick: PropTypes.func.isRequired,
};

// Profile Details Component
function ProfileDetails({ details }) {
  return (
    <div className="space-y-4 overflow-y-auto scrollbar-none">
      <PersonalDetails details={details[0]} />
      <FitnessStats details={details[1]} />
      <TodaysActivity details={details[2]} />
      <DietInformation details={details[3]} />
      <TrainerNotes details={details[4]} />
    </div>
  );
}

ProfileDetails.propTypes = {
  details: PropTypes.array.isRequired,
};

// Personal Details Component
const PersonalDetails = ({ details }) => {
  const { planType, joinedDate } = details.planDetails;
  return (
    <InfoCard
      title="Personal Details"
      details={[`Plan Type: ${planType}`, `Joined Date: ${joinedDate}`]}
    />
  );
};

PersonalDetails.propTypes = {
  details: PropTypes.object.isRequired,
};

// Fitness Stats Component
const FitnessStats = ({ details }) => {
  const { weight, bodyFat, bmi, height, goal } = details.fitnessStats;
  return (
    <InfoCard
      title="Fitness Stats"
      details={[
        `Weight: ${weight}`,
        `Body Fat: ${bodyFat}`,
        `BMI: ${bmi}`,
        `Height: ${height}`,
        `Goal: ${goal}`,
      ]}
    />
  );
};

FitnessStats.propTypes = {
  details: PropTypes.object.isRequired,
};

// Today's Activity Component
const TodaysActivity = ({ details }) => {
  const { steps, caloriesBurned, distance } = details.todaysActivity;
  return (
    <InfoCard
      title="Today's Activity"
      details={[
        `Steps: ${steps}`,
        `Calories Burned: ${caloriesBurned}`,
        `Distance: ${distance}`,
      ]}
    />
  );
};

TodaysActivity.propTypes = {
  details: PropTypes.object.isRequired,
};

// Diet Information Component
const DietInformation = ({ details }) => {
  const { calorieGoal, protein, carbs, fats } = details.dietInformation;
  return (
    <InfoCard
      title="Diet Information"
      details={[
        `Calorie Goal: ${calorieGoal}`,
        `Protein: ${protein}`,
        `Carbs: ${carbs}`,
        `Fats: ${fats}`,
      ]}
    />
  );
};

DietInformation.propTypes = {
  details: PropTypes.object.isRequired,
};

// Trainer Notes Component
const TrainerNotes = ({ details }) => {
  return <InfoCard title="Trainer's Notes" details={details.trainersNotes} />;
};

TrainerNotes.propTypes = {
  details: PropTypes.object.isRequired,
};

// Info Card Component for Profile Info
const InfoCard = ({ title, details }) => (
  <div className="border-border rounded-xl border bg-backgroundSecondary p-4 shadow-sm">
    <h4 className="mb-2 text-sm font-medium text-textPrimary">{title}</h4>
    <ul className="space-y-1 text-sm text-textSecondary">
      {details.map((detail, index) => (
        <li key={index}>{detail}</li>
      ))}
    </ul>
  </div>
);

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  details: PropTypes.arrayOf(PropTypes.string).isRequired,
};
