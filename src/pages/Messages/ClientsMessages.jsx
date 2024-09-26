import PropTypes from "prop-types";
import LockPage from "../../components/common/LockPage";
import GeneralMessagesPage from "./GeneralMessagesPage";

const ClientMessages = ({ user }) => {
  const renderPage = () => {
    const { plan } = user;

    if (plan === "base" || plan === "basic" || plan === "pro") {
      return <LockPage />;
    } else if (plan === "premium") {
      return <GeneralMessagesPage />;
    } else {
      return null;
    }
  };

  return <>{renderPage()}</>;
};

export default ClientMessages;

ClientMessages.propTypes = {
  user: PropTypes.object.isRequired,
};
