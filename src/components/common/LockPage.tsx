import { useAppSelector } from "@/store";
import PrimaryButtonWithLink from "./PrimaryButtonWithLink";

const LockPage: React.FC = () => {
  const { details: user } = useAppSelector((state) => state.personalDetails);

  return (
    <div className="container mx-auto h-[calc(100dvh-5rem)] max-h-[800px] w-full max-w-[1500px] overflow-y-auto p-4 3xl:mt-6">
      <div className="flex h-full min-h-fit w-full flex-col items-center justify-center rounded-2xl border-[1.5px] border-dashed border-primary bg-background p-6 text-center">
        <h1 className="mb-6 text-[22px] font-semibold text-textPrimary md:text-2xl lg:text-3xl">
          Upgrade Your Plan
        </h1>
        <p className="mb-4 max-w-[800px] text-textSecondary">
          Your current plan{" "}
          <span className="px-1 font-bold text-textPrimary">
            {user.plan?.toUpperCase()}
          </span>
          , does not grant access to the features available on this page.
          Upgrade now to unlock exclusive features, advanced tools, and
          personalized support tailored to help you succeed.
        </p>

        <PrimaryButtonWithLink
          to="/subscription"
          text="Upgrade Plan"
          className="w-48"
        />
      </div>
    </div>
  );
};

export default LockPage;
