import CustomButton from "@/components/common/CustomButton";
import CustomTextarea from "@/components/common/CustomTextarea";
import MultipleOptionsSelectAndRegisterToForm from "@/components/common/MultipleOptionsSelectAndRegisterToForm";
import CustomInput from "@/components/common/NewCharkaInput";
import NumberInputs from "@/components/common/NumberInputs";
import OptionsSelectAndRegisterToForm from "@/components/common/OptionSelectAndRegisterToForm";
import useFiltersOptions from "@/hooks/useFiltersOptions";
import { useCustomerDetails } from "@/utils/validationSchema";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useColorMode,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MdOutlineClose } from "react-icons/md";
import { CustomAddressSearch } from "./CustomAddressSearch";

interface DrawerForCustomerAddAndEditProps {
  isOpen: boolean;
  onClose: () => void;
  headerTitle?: string;
}

const DrawerForCustomerAddAndEdit: React.FC<
  DrawerForCustomerAddAndEditProps
> = ({ isOpen, onClose, headerTitle = "Add Customer" }) => {
  const { colorMode } = useColorMode();
  const { t } = useTranslation(["customers", "meals", "common"]);
  const schema = useCustomerDetails();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  // Get the options
  const {
    dietaryPreferences,
    dietaryRestrictions,
    fitnessGoalOptionsTranslated,
    physicalActivityLevelOptions,
    genderOptions,
  } = useFiltersOptions();

  // Function to handle the submission for each step
  const onSubmit = async (data: unknown) => {
    // const formData = {
    //   age: Number(data.age),
    //   gender: data.gender,
    //   height: Number(data.height),
    //   weight: Number(data.weight),
    //   fitnessGoal: data.fitnessGoal,
    //   weightGoals: data.weightGoals ? Number(data.weightGoals) : null,
    //   physicalActivityLevel: data.physicalActivityLevel,
    //   dietaryPreferences: data.dietaryPreferences,
    //   dietaryRestrictions: data.dietaryRestrictions,
    //   foodAllergies: data.foodAllergies || "",
    // };

    // console.log(formData);

    console.log(data);
  };
  return (
    <>
      <Drawer
        blockScrollOnMount={false}
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
            }}
          >
            <div className="w-full overflow-y-auto pt-8 scrollbar-thin">
              <FormProvider {...methods}>
                <form
                  className="mx-2 flex flex-col gap-3 pb-6 md:m-9 md:grid md:grid-cols-2 md:gap-4"
                  onSubmit={methods.handleSubmit(onSubmit)}
                >
                  {/* Name */}
                  <CustomInput name="firstName" label={t("common:firstName")} />

                  {/* Last Name */}
                  <CustomInput name="lastName" label={t("common:lastName")} />

                  {/* Phone Number */}
                  <CustomInput
                    name="phone"
                    type="tel"
                    label={t("common:phoneNumber")}
                  />

                  {/* Age */}
                  <NumberInputs name="age" label={t("common:age")} />

                  {/* Height */}
                  <NumberInputs name="height" label={t("common:height")} />

                  {/* Weight */}
                  <NumberInputs name="weight" label={t("common:weight")} />

                  {/* Weight Goals */}
                  <NumberInputs
                    name="weightGoal"
                    label={t("common:weightGoal")}
                  />

                  {/* Activity level */}
                  <OptionsSelectAndRegisterToForm
                    name="gender"
                    placeholder={t("customers:genderSelectPlaceholder")}
                    label={t("customers:genderTitle")}
                    options={genderOptions}
                  />

                  {/* Activity level */}
                  <OptionsSelectAndRegisterToForm
                    name="physicalActivityLevel"
                    placeholder={t("common:physicalActivityLevel")}
                    options={physicalActivityLevelOptions}
                  />

                  {/* Fitness goal */}
                  <OptionsSelectAndRegisterToForm
                    name="fitnessGoal"
                    placeholder={t("common:fitnessGoal")}
                    options={fitnessGoalOptionsTranslated}
                  />

                  {/* Dietary preference */}
                  <MultipleOptionsSelectAndRegisterToForm
                    name="dietaryPreferences"
                    placeholder={t("meals:preferencesTitle")}
                    options={dietaryPreferences}
                  />

                  {/* Dietary restrictions */}
                  <MultipleOptionsSelectAndRegisterToForm
                    name="dietaryRestrictions"
                    placeholder={t("meals:restrictionsTitle")}
                    options={dietaryRestrictions}
                  />

                  {/* Food allergies */}
                  <div className="col-span-2">
                    <CustomTextarea
                      name="foodAllergies"
                      label={t("common:foodAllergies")}
                    />
                  </div>

                  <div className="col-span-2 h-full">
                    <CustomAddressSearch />
                  </div>

                  {/* Submit button */}
                  <div className="col-span-2">
                    <CustomButton
                      widthFull={true}
                      paddingY="py-3"
                      text={t("addCustomer")}
                      actionType="submit"
                    />
                  </div>
                </form>
              </FormProvider>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerForCustomerAddAndEdit;
