import { MdDashboard, MdFitnessCenter, MdRestaurantMenu, MdAnalytics, MdOutlineFeedback } from "react-icons/md";
import { BiSelectMultiple } from "react-icons/bi";
import SidebarNavLink from "../common/SideBarNavLink";
import { useDisclosure } from "@chakra-ui/react";
import FeedbackFormModal from "../FeedbackFormModal";

export default function ClientMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ul className="w-full flex flex-col gap-2">
        <SidebarNavLink to="/dashboard" icon={MdDashboard} text="Dashboard" />
        <SidebarNavLink to="/sport-plans" icon={MdFitnessCenter} text="Sport Plans" />
        <SidebarNavLink to="/diet-plans" icon={MdRestaurantMenu} text="Diet Plans" />
        <SidebarNavLink to="/analytics" icon={MdAnalytics} text="Analytics" />
        <SidebarNavLink to="/subscription" icon={BiSelectMultiple} text="Subscription" />
        {/* <hr className=" my-2 border-gray-700 w-60 mx-auto" /> */}
        <div className="relative my-2 w-full">
          <div className="absolute left-0 right-0 mx-auto w-52 h-[1px] bg-secondary bg-opacity-20"></div>
        </div>
        <button
          className=" items-center 
          py-3 pl-5
         rounded-tl-full  rounded-bl-full  gap-3 flex
           "
          onClick={onOpen}
        >
          <MdOutlineFeedback className="text-xl text-surface" />
          Give Feedback
        </button>
      </ul>
      <FeedbackFormModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
