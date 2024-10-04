import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import LockPage from "../../components/common/LockPage";
import GeneralAdvanceReports from "./GeneralAdvanceReports";

export default function Reports() {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;
  const renderReportsPage = () => {
    if (["base", "basic", "pro"].includes(user.plan)) {
      return <LockPage />;
    } else {
      return <GeneralAdvanceReports />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Reports</title>
      </Helmet>
      {renderReportsPage()}
    </>
  );
}
