import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import MealPlanFormForBalance from "./MealPlanFormForBalance";

export default function DraweForBalance({ isOpen, onClose, headerTitle }) {
  return (
    <>
      <Drawer onClose={onClose} isOpen={isOpen} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{headerTitle}</DrawerHeader>
          <DrawerBody>
            <MealPlanFormForBalance onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

DraweForBalance.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  headerTitle: PropTypes.string,
};
