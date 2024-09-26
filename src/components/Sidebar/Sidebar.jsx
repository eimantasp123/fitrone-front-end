import { GrUpgrade } from "react-icons/gr";
import { useSelector } from "react-redux";
import PrimaryButtonWithLink from "../common/PrimaryButtonWithLink";
import AdminMenu from "./AdminMenu";
import ClientMenu from "./ClientMenu";
import TrainerMenu from "./TrainerMenu";
import PropTypes from "prop-types";

const Sidebar = () => {
  const { details: user } = useSelector((state) => state.personalDetails);

  if (!user) return null;

  const renderMenu = () => {
    switch (user.role) {
      case "admin":
        return <AdminMenu />;
      case "trainer":
        return <TrainerMenu />;
      case "client":
        return <ClientMenu />;
      default:
        return null;
    }
  };

  const renderSidebarInfo = () => {
    switch (user.plan) {
      case "base":
        return (
          <SidebarInfoModal
            title="Basic Version"
            description="Unlock auto-generated diet plans, wearable integration, and weekly tracking."
          />
        );
      case "basic":
        return (
          <SidebarInfoModal
            title="Pro Version"
            description="Get personalized diet plans and deeper insights from certified trainers."
          />
        );
      case "pro":
        return (
          <SidebarInfoModal
            title="Premium Version"
            description="Real-time trainer support, custom workouts, and advanced analytics."
          />
        );
      case "premium":
        return null;
      default:
        return null;
    }
  };

  return (
    <>
      <aside className="hidden flex-col border-r-[1px] border-borderColor bg-sidebarPrimary p-4 transition-all duration-300 ease-in-out lg:flex lg:w-64 xl:w-[250px] 3xl:w-[350px]">
        <img
          src="/logo-white.png"
          alt="Logo"
          className="mb-[22px] h-auto w-[90px]"
        />
        <nav className="custom-scrollbar flex h-full flex-col overflow-y-auto">
          {renderMenu()}
        </nav>
        {/* Render information modal */}
        {renderSidebarInfo()}
      </aside>
    </>
  );
};

const SidebarInfoModal = ({ title, description }) => (
  <div className="mt-6 flex h-fit w-full flex-col items-center justify-center rounded-xl bg-[#212121] p-4 text-center">
    <div className="flex size-10 items-center justify-center rounded-full bg-sidebarPrimary">
      <GrUpgrade className="text-white" />
    </div>
    <div className="flex flex-col">
      <p className="my-1 font-semibold text-white">{title}</p>
      <p className="text-sm leading-snug text-stone-300">{description}</p>
      <PrimaryButtonWithLink to="/subscription" text="Upgrade" />
    </div>
  </div>
);

SidebarInfoModal.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Sidebar;
