import CustomButton from "@/components/common/CustomButton";
import { useAddOrEditCustomerAction } from "@/hooks/Customers/useAddOrEditCustomer";
import { useCalcNutritionsAction } from "@/hooks/Customers/useCalculateNutritions";
import { CustomerAddForm, PaginatedCustomersResponse } from "@/utils/types";
import { useCustomerDetails } from "@/utils/validationSchema";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useColorMode,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MdOutlineClose } from "react-icons/md";
import UserDetailsFormComponent from "./UserDetailsFormComponent";
import InfoCard from "@/components/common/InfoCard";

interface DrawerForCustomerAddAndEditProps {
  isOpen: boolean;
  onClose: () => void;
  customerId?: string;
}

export interface SelectedPlace {
  address: string;
  latitude: string;
  longitude: string;
}

// Get the customer from the cache
const getCustomerFromCache = ({
  cachedQueries,
  customerId,
}: {
  cachedQueries: Array<
    [string[], InfiniteData<PaginatedCustomersResponse> | undefined]
  >;
  customerId: string;
}) => {
  // Search for the customer across all cached queries
  for (const [, data] of cachedQueries) {
    const foundCustomer = data?.pages
      ?.flatMap((page) => page.data)
      ?.find((customer) => customer._id === customerId);

    if (foundCustomer) return foundCustomer;
  }

  return null; // Customer not found in cache
};
/**
 * Drawer for adding and editing customers
 */
const DrawerForCustomerAddAndEdit: React.FC<
  DrawerForCustomerAddAndEditProps
> = ({ isOpen, onClose, customerId }) => {
  const { t } = useTranslation(["customers", "common"]);
  const { colorMode } = useColorMode();
  const queryClient = useQueryClient();

  // 🔍 Fetch all cached customer data
  const cachedQueries = queryClient.getQueriesData<
    InfiniteData<PaginatedCustomersResponse>
  >({ queryKey: ["customers"] }) as Array<
    [string[], InfiniteData<PaginatedCustomersResponse> | undefined]
  >;

  // Get the customer from the cache
  const customer = getCustomerFromCache({
    cachedQueries,
    customerId: customerId ?? "",
  });

  // Final selected place
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(
    null,
  );

  // Use the customer details schema for validation
  const schema = useCustomerDetails();
  const methods = useForm<CustomerAddForm>({
    resolver: yupResolver(schema),
  });

  // Mutation to add
  const { mutate: addOrEditCustomer, isPending } =
    useAddOrEditCustomerAction(onClose);

  // Mutation to calculate nutrition
  const { mutate: calculateNutrition, isPending: isPendingNutrition } =
    useCalcNutritionsAction();

  // Set data to form and reset on close
  useEffect(() => {
    if (customer) {
      methods.reset(customer);

      if (customer.latitude && customer.longitude && customer.address) {
        setSelectedPlace({
          address: customer.address,
          latitude: customer.latitude,
          longitude: customer.longitude,
        });
      }
    }

    return () => {
      methods.reset();
      setSelectedPlace(null);
    };
  }, [customer, methods]);

  console.log("clientData", customer);

  // Function to handle the submission for each step
  const onSubmit = async (data: CustomerAddForm) => {
    if (!selectedPlace) return;

    // Merge the data with the address
    const dataSend = {
      ...data,
      ...selectedPlace,
    };

    if (customer && customer._id) {
      // Process data update
      addOrEditCustomer({ data: dataSend, customerId: customer._id });
    } else {
      // Send new data to the server
      addOrEditCustomer({ data: dataSend });
    }
  };

  // Function to calculate the nutrition
  const calculateNutritionHandler = () => {
    if (!customer) return;

    // Calculate the nutrition
    calculateNutrition(customer._id);
  };

  return (
    <>
      <Drawer
        onClose={onClose}
        isOpen={isOpen}
        trapFocus={false}
        size={{ base: "full", md: "xl" }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <div className="h-12 w-full bg-background">
            <h2 className="text-md absolute left-5 top-4 font-medium lg:text-lg">
              {customer ? t("editCustomer") : t("addCustomer")}
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
            <div className="w-full pt-8 md:pt-3">
              {customer && customer.status !== "pending" && (
                <div className="pb-6 md:px-8 md:pb-0">
                  <CustomButton
                    widthFull={true}
                    loading={isPendingNutrition}
                    text={
                      customer.recommendedNutrition
                        ? t("reCalculateNutrients")
                        : t("calculateNutrients")
                    }
                    onClick={() => calculateNutritionHandler()}
                  />

                  {customer.recommendedNutrition && (
                    <div className="-mb-6 mt-4 space-y-2 md:-mb-2">
                      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                        {Object.entries(customer.recommendedNutrition).map(
                          ([key, value]) => (
                            <InfoCard
                              key={key}
                              value={value}
                              title={t(`common:${key}`)}
                              unit={key === "calories" ? "kcal" : "g."}
                            />
                          ),
                        )}
                      </div>
                      <p className="px-3 pb-6 text-xs font-normal leading-tight text-textSecondary md:pb-0">
                        {t("aiRecommendationDescription")}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <UserDetailsFormComponent
                selectedPlace={selectedPlace}
                setSelectedPlace={setSelectedPlace}
                onSubmit={onSubmit}
                methods={methods}
                loading={isPending}
                submitButtonText={
                  customer ? t("editCustomer") : t("addCustomer")
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
