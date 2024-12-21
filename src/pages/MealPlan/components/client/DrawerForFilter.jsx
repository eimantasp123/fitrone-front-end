import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { MdOutlineClose } from "react-icons/md";
import MealDashboardHeader from "./MealDashboardHeader";
import CustomerSelect from "../../../../components/common/CustomSelect";
import TextButton from "../../../../components/common/TextButton";

export default function DrawerForFilter({ isOpen, onClose, details, options }) {
  return (
    <Drawer
      placement="top"
      isFullHeight={true}
      onClose={onClose}
      isOpen={isOpen}
    >
      <DrawerOverlay />
      <DrawerContent>
        <div className="h-12 w-full bg-background">
          <h2 className="text-md absolute left-5 top-4 font-medium">
            Filters & Meal balance
          </h2>
          <div
            onClick={onClose}
            className="border-1 border-border absolute right-4 top-3 flex size-7 cursor-pointer items-center justify-center rounded-full border bg-background transition-colors duration-300 ease-in-out hover:bg-backgroundSecondary"
          >
            <MdOutlineClose className="text-xl text-textPrimary" />
          </div>
        </div>
        {/* Filter */}
        <DrawerBody
          sx={{
            padding: "0px 0px",
          }}
          overflow={"scroll"}
        >
          <div className="custom-scrollbar-select min-h-screen overflow-y-auto">
            <MealDashboardHeader details={details} />

            {/* Filters */}
            <div className="z-20 grid w-full gap-2 overflow-y-auto px-4 py-3 sm:grid-cols-2 sm:flex-row sm:flex-wrap">
              <CustomerSelect
                options={options}
                title="City"
                defaultOption="Šiauliai"
              />
              <CustomerSelect
                options={options}
                title="Dietary Preferences"
                defaultOption="Vegetarian"
              />
              <CustomerSelect
                options={options}
                title="Restrictions"
                defaultOption="No-preference"
              />
              <CustomerSelect
                options={options}
                title="Price"
                defaultOption="100-200$"
              />
              <div className="mt-2 flex gap-2">
                <TextButton primary={true} text="Apply filters" />
                <TextButton text="Reset filters" />
              </div>
            </div>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

DrawerForFilter.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  details: PropTypes.object,
  options: PropTypes.array,
};
