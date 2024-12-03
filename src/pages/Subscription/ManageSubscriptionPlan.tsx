import { useAppSelector } from "@/store";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ManageSubscription from "./ManageSubscription";

const ManageSubscriptionPlan: React.FC = () => {
  const { details: user } = useAppSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Manage Subscription Plan</title>
        </Helmet>
        {user.role === "supplier" && <ManageSubscription />}
      </HelmetProvider>
    </>
  );
};

export default ManageSubscriptionPlan;
