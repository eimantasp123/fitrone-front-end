import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

interface DrawerFromTopProps {
  isOpen: boolean;
  isDrawerVisible: boolean | undefined;
  onClose: () => void;
  children: React.ReactNode;
}

const DrawerFromTop: React.FC<DrawerFromTopProps> = ({
  isOpen,
  isDrawerVisible,
  onClose,
  children,
}) => {
  const { colorMode } = useColorMode();
  return (
    <>
      {isOpen && isDrawerVisible && (
        <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent
            sx={{
              height: "70vh",
              background:
                colorMode === "dark"
                  ? "dark.backgroundSecondary"
                  : "light.background",
            }}
          >
            <DrawerCloseButton />

            <DrawerBody
              sx={{
                padding: "0px 0px",
              }}
            >
              {children}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default DrawerFromTop;
