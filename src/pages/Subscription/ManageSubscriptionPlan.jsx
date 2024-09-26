import { Helmet } from "react-helmet";
import ManageSubscription from "./ManageSubscription";

export default function ManageSubscriptionPlan() {
  return (
    <>
      <Helmet>
        <title>Manage Subscription Plan</title>
      </Helmet>
      <ManageSubscription />
    </>
  );
}
