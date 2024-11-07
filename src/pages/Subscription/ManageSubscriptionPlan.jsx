import { Helmet } from "react-helmet";
import ManageSubscription from "./ManageSubscription";
import { useSelector } from "react-redux";
import ManageSupplierSubscription from "./ManageSupplierSubscription";

export default function ManageSubscriptionPlan() {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Manage Subscription Plan</title>
      </Helmet>
      {user.role === "admin" && <ManageSupplierSubscription />}
      {user.role === "supplier" && <ManageSubscription />}
    </>
  );
}
