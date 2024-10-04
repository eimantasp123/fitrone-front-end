import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import LockPage from "../../components/common/LockPage";
import GeneralProgressController from "./GeneralProgressController";

export default function Progress() {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  const renderProgressPage = () => {
    if (user.plan === "base") {
      return <LockPage />;
    } else {
      return <GeneralProgressController />;
    }
  };
  return (
    <>
      <Helmet>
        <title>Progress</title>
      </Helmet>
      {renderProgressPage()}
    </>
  );
}
