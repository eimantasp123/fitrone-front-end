import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { MdOutlineClose } from "react-icons/md";
import MealPlanFormForBalance from "./SendCustomerAddForm";
import SendCustomerAddForm from "./SendCustomerAddForm";

export default function DraweForBalance({ isOpen, onClose, headerTitle }) {
  return (
    <>
      <Drawer onClose={onClose} isOpen={isOpen} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <div className="h-12 w-full bg-background">
            <h2 className="text-md absolute left-5 top-4 font-medium lg:text-lg">
              {headerTitle}
            </h2>
            <div
              onClick={onClose}
              className="border-1 border-border absolute right-4 top-3 flex size-7 cursor-pointer items-center justify-center rounded-full border bg-background transition-colors duration-300 ease-in-out hover:bg-backgroundSecondary"
            >
              <MdOutlineClose className="text-xl text-textPrimary" />
            </div>
          </div>
          <DrawerBody>
            <SendCustomerAddForm />
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
