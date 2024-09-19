import { GrUpgrade } from "react-icons/gr";
import { useSelector } from "react-redux";
import AdminMenu from "./AdminMenu";
import ClientMenu from "./ClientMenu";
import TrainerMenu from "./TrainerMenu";
import PrimaryButton from "../common/PrimaryButton";

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

  return (
    <>
      <aside className="hidden p-4 lg:flex flex-col lg:w-64 xl:w-[250px] 3xl:w-[350px] border-r-[1px] border-borderColor bg-sidebarPrimary transition-all duration-300 ease-in-out">
        <img src="/logo-white.png" alt="Logo" className="w-[90px] h-auto  mb-[22px]" />
        <nav className="flex h-full custom-scrollbar overflow-y-auto flex-col ">{renderMenu()}</nav>
        {/*  */}
        <div className="bg-[#212121] p-4 flex flex-col items-center justify-center text-center   w-full h-fit rounded-xl">
          <div className="size-10 bg-sidebarPrimary rounded-full flex items-center justify-center">
            <GrUpgrade className="text-white" />
          </div>
          <p className="font-semibold text-white my-1 ">Pro Version</p>
          <p className="text-sm text-stone-300 leading-snug ">All features for free with a trial period of subscription</p>
          <PrimaryButton text="Upgrade" />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
