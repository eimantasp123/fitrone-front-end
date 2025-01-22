import CustomButton from "@/components/common/CustomButton";
import CustomTextarea from "@/components/common/CustomTextarea";
import LightAndDarkMode from "@/components/common/LightAndDarkMode";
import MultipleOptionsSelectAndRegisterToForm from "@/components/common/MultipleOptionsSelectAndRegisterToForm";
import CustomInput from "@/components/common/NewCharkaInput";
import NumberInputs from "@/components/common/NumberInputs";
import OptionsSelectAndRegisterToForm from "@/components/common/OptionSelectAndRegisterToForm";
import LanguageSelector from "@/components/LanguageSelector";
import useFiltersOptions from "@/hooks/useFiltersOptions";
import { useCustomerDetails } from "@/utils/validationSchema";
import { useColorMode } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Helmet } from "react-helmet-async";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

/**
 *  Customer page form component
 */
const CustomerPageForm: React.FC = () => {
  const { token } = useParams();
  const { t } = useTranslation(["customers", "meals", "common"]);
  const { colorMode } = useColorMode();
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

  // Handle form submission
  const onSubmit = async (data: unknown) => {
    console.log("   data", data);
  };

  const isLoading = false;

  return (
    <>
      <Helmet>
        <title>{t("customerForm")}</title>
      </Helmet>
      <div className="h-screen overflow-y-auto scrollbar-thin">
        <header className="border-border sticky top-0 z-50 flex max-h-16 min-h-16 select-none items-center justify-between gap-10 overflow-visible border-b-[1px] bg-background px-2 text-textPrimary dark:border-borderLight md:px-4">
          <img
            src={colorMode === "dark" ? `/logo-white.png` : `/logo-black.png`}
            alt="Logo"
            className="mx-4 my-3 h-auto w-[100px]"
          />
          <div className="flex items-center gap-2 md:gap-2">
            {/* Language switcher */}
            <LanguageSelector />

            {/* Dark Mode ON/OFF */}
            <LightAndDarkMode />
          </div>
        </header>
        <div className="mx-auto flex max-w-[1550px] flex-col pt-8 md:pt-14">
          {token === "sample" && (
            <div className="mx-9 space-y-2">
              <h4 className="text-lg font-semibold">{t("sampleFormTitle")}</h4>
              <p className="text-sm">{t("sampleFormDescription")}</p>
            </div>
          )}
          <FormProvider {...methods}>
            <form
              className="m-9 flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4"
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
              <NumberInputs name="weightGoal" label={t("common:weightGoal")} />

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

              {/* Submit button */}
              <div className="col-span-2">
                <CustomButton
                  widthFull={true}
                  paddingY="py-3"
                  text={t("common:submitForm")}
                  actionType="submit"
                  disabled={token === "sample" || isLoading}
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};

export default CustomerPageForm;
