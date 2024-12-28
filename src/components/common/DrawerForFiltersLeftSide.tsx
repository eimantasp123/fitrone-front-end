import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineClose } from "react-icons/md";

interface DrawerForFiltersLeftSideProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const DrawerForFiltersLeftSide: React.FC<DrawerForFiltersLeftSideProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const isDrawerVisible = useBreakpointValue({ base: true, xl: false });
  const { colorMode } = useColorMode();
  return (
    <>
      {isDrawerVisible && isOpen && (
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent
            sx={{
              maxWidth: { base: "80%", sm: "400px" },
              background:
                colorMode === "dark"
                  ? "dark.backgroundSecondary"
                  : "light.backgroundSecondary",
            }}
          >
            <div
              onClick={onClose}
              className="border-1 absolute -right-[50px] top-4 flex size-8 cursor-pointer items-center justify-center rounded-full border-borderPrimary bg-background"
            >
              <MdOutlineClose className="text-xl text-textPrimary" />
            </div>

            <DrawerBody
              sx={{
                padding: "14px ",
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

export default DrawerForFiltersLeftSide;
