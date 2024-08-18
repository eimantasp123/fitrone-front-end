import { MdDashboard, MdFitnessCenter, MdRestaurantMenu, MdPeople, MdMessage, MdOutlineFeedback } from "react-icons/md";
import { BiSelectMultiple } from "react-icons/bi";
import SidebarNavLink from "../common/SideBarNavLink";
import { useDisclosure } from "@chakra-ui/react";
import FeedbackFormModal from "../FeedbackFormModal";

export default function TrainerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ul className="w-full h-full flex flex-col gap-2">
        <SidebarNavLink to="/dashboard" icon={MdDashboard} text="Dashboard" />
        <SidebarNavLink to="/sport-plans" icon={MdFitnessCenter} text="Sport Plans" />
        <SidebarNavLink to="/diet-plans" icon={MdRestaurantMenu} text="Diet Plans" />
        <SidebarNavLink to="/clients" icon={MdPeople} text="Clients" />
        <SidebarNavLink to="/messages" icon={MdMessage} text="Messages" />
        <SidebarNavLink to="/subscription" icon={BiSelectMultiple} text="Subscription" />
        <button
          className=" items-center 
          py-3 pl-5 text-text1 bg-secondaryLight transition-colors duration-300 ease-in-out hover:bg-secondaryDark mt-auto  gap-3 flex
           "
          onClick={onOpen}
        >
          <MdOutlineFeedback className="text-xl text-surface" />
          Share Feedback
        </button>
      </ul>
      <FeedbackFormModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
