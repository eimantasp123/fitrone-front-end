import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import GeneralNotifications from "./GeneralNotifications";

export default function Notifications() {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Notifications</title>
      </Helmet>
      <GeneralNotifications />
    </>
  );
}
