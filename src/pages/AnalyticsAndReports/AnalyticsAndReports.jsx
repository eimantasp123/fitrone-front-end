import AdminAnalyticsAndReports from "./AdminAnalyticsAndReports";
import TrainerAnalyticsAndReports from "./TrainerAnalyticsAndReports";
import ClientAnalyticsAndReports from "./ClientAnalyticsAndReports";
import { useSelector } from "react-redux";

const AnalyticsAndReports = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      {user.role === "admin" && <AdminAnalyticsAndReports />}
      {user.role === "trainer" && <TrainerAnalyticsAndReports />}
      {user.role === "client" && <ClientAnalyticsAndReports />}
    </>
  );
};

export default AnalyticsAndReports;
