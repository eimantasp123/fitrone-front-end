import PropTypes from "prop-types";
import LockPage from "../../components/common/LockPage";
import GeneralMealPlansController from "./GeneralMealPlansController";

const ClientDietPlans = ({ user }) => {
  const renderMealPlans = () => {
    const { plan } = user;

    if (plan === "base") {
      return <LockPage />;
    } else {
      return <GeneralMealPlansController />;
    }
  };

  return <>{renderMealPlans()}</>;
};

export default ClientDietPlans;

ClientDietPlans.propTypes = {
  user: PropTypes.object.isRequired,
};
