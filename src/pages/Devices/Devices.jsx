import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import LockPage from "../../components/common/LockPage";
import GeneralDevicesController from "./GeneralDevicesController";

export default function Devices() {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;
  const renderDevicesPage = () => {
    if (user.plan === "base") {
      return <LockPage />;
    } else {
      return <GeneralDevicesController />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Devices</title>
      </Helmet>
      {renderDevicesPage()}
    </>
  );
}
