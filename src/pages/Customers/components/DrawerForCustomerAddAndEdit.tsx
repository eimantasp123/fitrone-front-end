import { CustomerAddForm, CustomerEditForm } from "@/utils/types";
import { useCustomerDetails } from "@/utils/validationSchema";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useColorMode,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import UserDetailsFormComponent from "./UserDetailsFormComponent";
import { useTranslation } from "react-i18next";
import { useAddOrEditCustomerAction } from "@/hooks/Customers/useAddOrEditCustomer";

interface DrawerForCustomerAddAndEditProps {
  isOpen: boolean;
  onClose: () => void;
  clientData?: CustomerEditForm | null;
}

export interface SelectedPlace {
  address: string;
  latitude: string;
  longitude: string;
}

/**
 * Drawer for adding and editing customers
 */
const DrawerForCustomerAddAndEdit: React.FC<
  DrawerForCustomerAddAndEditProps
> = ({ isOpen, onClose, clientData }) => {
  const { t } = useTranslation(["customers"]);
  const { colorMode } = useColorMode();
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(
    null,
  ); // Final selected place

  // Use the customer details schema for validation
  const schema = useCustomerDetails();
  const methods = useForm<CustomerAddForm>({
    resolver: yupResolver(schema),
  });

  // Mutation to add
  const { mutate: addOrEditCustomer, isPending } =
    useAddOrEditCustomerAction(onClose);

  // Set data to form and reset on close
  useEffect(() => {
    if (clientData) {
      methods.reset(clientData);

      if (clientData.latitude && clientData.longitude && clientData.address) {
        setSelectedPlace({
          address: clientData.address,
          latitude: clientData.latitude,
          longitude: clientData.longitude,
        });
      }
    }

    return () => {
      methods.reset();
      setSelectedPlace(null);
    };
  }, [clientData, methods]);

  // Function to handle the submission for each step
  const onSubmit = async (data: CustomerAddForm) => {
    if (!selectedPlace) return;

    // Merge the data with the address
    const dataSend = {
      ...data,
      ...selectedPlace,
    };

    if (clientData && clientData._id) {
      // Process data update
      addOrEditCustomer({ data: dataSend, customerId: clientData._id });
    } else {
      // Send new data to the server
      addOrEditCustomer({ data: dataSend });
    }
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
              {clientData ? t("editCustomer") : t("addCustomer")}
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
                loading={isPending}
                submitButtonText={
                  clientData ? t("editCustomer") : t("addCustomer")
                }
              />
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerForCustomerAddAndEdit;
