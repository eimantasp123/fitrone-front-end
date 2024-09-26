import PropTypes from "prop-types";
import LockPage from "../../components/common/LockPage";
import GeneralNotifications from "./pages/GeneralNotifications";

export default function ClientNotifications({ user }) {
  const renderNotificationsPage = () => {
    const { plan } = user;

    if (plan === "base" || plan === "basic") {
      return <LockPage />;
    } else if (plan === "pro" || plan === "premium") {
      return <GeneralNotifications />;
    } else {
      return null;
    }
  };

  return <>{renderNotificationsPage()}</>;
}

ClientNotifications.propTypes = {
  user: PropTypes.object.isRequired,
};
