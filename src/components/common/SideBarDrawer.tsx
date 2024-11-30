import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import { MdOutlineClose } from "react-icons/md";
import SupplierMenu from "../Sidebar/SupplierMenu";

interface SideBarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  colorMode: string;
}

const SideBarDrawer: React.FC<SideBarDrawerProps> = ({
  isOpen,
  onClose,
  colorMode,
}) => {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent sx={{ maxWidth: "280px" }}>
        <div
          onClick={onClose}
          className="border-1 absolute -right-[50px] top-4 flex size-8 cursor-pointer items-center justify-center rounded-full border-borderPrimary bg-background"
        >
          <MdOutlineClose className="text-xl text-textPrimary" />
        </div>

        <img
          src={`${colorMode === "dark" ? "/logo-white.png" : "/logo-black.png"}`}
          alt="Logo"
          className="mx-4 my-3 h-auto w-[100px]"
        />
        <div
          className={`h-[0.5px] w-full border-none ${colorMode === "dark" ? "bg-neutral-700" : "bg-neutral-200"} outline-none`}
        />

        <DrawerBody
          sx={{
            padding: "0px 0px",
          }}
        >
          <SupplierMenu onClose={onClose} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SideBarDrawer;
