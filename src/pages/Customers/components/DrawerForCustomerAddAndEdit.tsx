import { CustomerAddForm } from "@/utils/types";
import { useCustomerDetails } from "@/utils/validationSchema";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useColorMode,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import UserDetailsFormComponent from "./UserDetailsFormComponent";
import { useTranslation } from "react-i18next";

interface DrawerForCustomerAddAndEditProps {
  isOpen: boolean;
  onClose: () => void;
  headerTitle?: string;
  clientData: CustomerAddForm | null;
}

const DrawerForCustomerAddAndEdit: React.FC<
  DrawerForCustomerAddAndEditProps
> = ({ isOpen, onClose, headerTitle = "Add Customer", clientData }) => {
  const { t } = useTranslation(["customers"]);
  const { colorMode } = useColorMode();
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null); // Final selected place

  const schema = useCustomerDetails();
  const methods = useForm<CustomerAddForm>({
    resolver: yupResolver(schema),
  });

  // Function to handle the submission for each step
  const onSubmit = async (data: CustomerAddForm) => {
    if (!selectedPlace) return;

    // Format the address
    const address = {
      latitude: selectedPlace.geometry?.location?.lat().toFixed(6) || 0,
      longitude: selectedPlace.geometry?.location?.lng().toFixed(6) || 0,
    };

    // Merge the data with the address
    const dataSend = {
      ...data,
      ...address,
    };

    // Send the data
    console.log(dataSend);
  };
  return (
    <>
      <Drawer
        onClose={onClose}
        isOpen={isOpen}
        size={{ base: "full", md: "xl" }}
      >
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
          <DrawerBody
            sx={{
              background:
                colorMode === "dark" ? "dark.background" : "light.background",
              scrollbarWidth: "thin",
            }}
          >
            <div className="w-full pt-8">
              <UserDetailsFormComponent
                selectedPlace={selectedPlace}
                setSelectedPlace={setSelectedPlace}
                onSubmit={onSubmit}
                methods={methods}
                submitButtonText={t("addCustomer")}
              />
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerForCustomerAddAndEdit;
