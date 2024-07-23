import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import AdminAnalyticsAndReports from "./AdminAnalyticsAndReports";
import TrainerAnalyticsAndReports from "./TrainerAnalyticsAndReports";
import ClientAnalyticsAndReports from "./ClientAnalyticsAndReports";

const AnalyticsAndReports = () => {
  const { user } = useContext(AuthContext);

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
