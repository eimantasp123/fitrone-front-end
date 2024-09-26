import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import ClientMenu from "../Sidebar/ClientMenu";
import PropTypes from "prop-types";

export default function SideBarDrawer({ isOpen, onClose, colorMode }) {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <img
          src={`${colorMode === "dark" ? "/logo-white.png" : "/logo-black.png"}`}
          alt="Logo"
          className="mx-4 my-3 h-auto w-[90px]"
        />

        <DrawerBody>
          <ClientMenu onClose={onClose} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

SideBarDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  colorMode: PropTypes.string.isRequired,
};
