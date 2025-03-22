import CustomButton from "@/components/common/CustomButton";
import CustomTextarea from "@/components/common/CustomTextarea";
import MultipleOptionsSelectAndRegisterToForm from "@/components/common/MultipleOptionsSelectAndRegisterToForm";
import CustomInput from "@/components/common/NewCharkaInput";
import NumberInputs from "@/components/common/NumberInputs";
import OptionsSelectAndRegisterToForm from "@/components/common/OptionSelectAndRegisterToForm";
import useFiltersOptions from "@/hooks/useFiltersOptions";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CustomAddressSearch from "./CustomAddressSearch";
import { SelectedPlace } from "./DrawerForCustomerAddAndEdit";

interface UserDetailsFormComponentProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  selectedPlace: SelectedPlace | null;
  setSelectedPlace: React.Dispatch<React.SetStateAction<SelectedPlace | null>>;
  submitButtonText?: string;
  disableForm?: boolean;
  loading?: boolean;
  setRecaptchaToken?: React.Dispatch<
    React.SetStateAction<string | null>
  > | null;
}

/**
 * UserDetailsFormComponent component to display the user details form
 */
const UserDetailsFormComponent = <T extends FieldValues>({
  methods,
  onSubmit,
  selectedPlace,
  setSelectedPlace,
  submitButtonText = "Submit",
  disableForm = true,
  loading = false,
  setRecaptchaToken,
}: UserDetailsFormComponentProps<T>) => {
  const { t } = useTranslation(["customers", "meals", "common"]);

  // reCAPTCHA site key
  const recaptchaKey = import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY;

  // Get the options
  const {
    dietaryPreferences,
    dietaryRestrictions,
    fitnessGoalOptionsTranslated,
    physicalActivityLevelOptions,
    genderOptions,
  } = useFiltersOptions();

  return (
    <FormProvider {...methods}>
      <form
        className="mx-2 flex flex-col gap-3 pb-6 md:m-9 md:grid md:grid-cols-2 md:gap-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {/* Name */}
        <CustomInput name="firstName" required label={t("common:firstName")} />

        {/* Last Name */}
        <CustomInput name="lastName" required label={t("common:lastName")} />

        {/* Email*/}
        <span className="col-span-2">
          <CustomInput name="email" type="email" required label={t("email")} />
        </span>

        {/* Phone Number */}
        <CustomInput
          name="phone"
          type="tel"
          required
          label={t("common:phoneNumber")}
        />

        {/* Age */}
        <NumberInputs name="age" required label={t("common:age")} />

        {/* Height */}
        <NumberInputs name="height" required label={t("common:height")} />

        {/* Weight */}
        <NumberInputs name="weight" required label={t("common:weight")} />

        {/* Weight Goals */}
        <NumberInputs name="weightGoal" label={t("common:weightGoal")} />

        {/* Activity level */}
        <OptionsSelectAndRegisterToForm
          name="gender"
          required
          placeholder={t("customers:genderSelectPlaceholder")}
          label={t("customers:genderTitle")}
          options={genderOptions}
        />

        {/* Activity level */}
        <OptionsSelectAndRegisterToForm
          name="physicalActivityLevel"
          required
          label={t("common:physicalActivityLevel")}
          placeholder={t("select")}
          options={physicalActivityLevelOptions}
        />

        {/* Fitness goal */}
        <OptionsSelectAndRegisterToForm
          name="fitnessGoal"
          required
          placeholder={t("select")}
          label={t("common:fitnessGoal")}
          options={fitnessGoalOptionsTranslated}
        />

        {/* Dietary preference */}
        <MultipleOptionsSelectAndRegisterToForm
          name="preferences"
          required
          label={t("meals:preferencesTitle")}
          placeholder={t("select")}
          options={dietaryPreferences}
          selectJustOne={true}
        />

        {/* Dietary restrictions */}
        <MultipleOptionsSelectAndRegisterToForm
          name="restrictions"
          label={t("meals:restrictionsTitle")}
          placeholder={t("select")}
          options={dietaryRestrictions}
        />

        {/* Food allergies */}
        <div className="col-span-2">
          <CustomTextarea
            name="foodAllergies"
            label={t("common:foodAllergies")}
          />
        </div>

        {/* Additional info */}
        <div className="col-span-2">
          <CustomTextarea
            name="additionalInfo"
            label={t("common:additionalInformation")}
          />
        </div>

        <div className="col-span-2 h-full">
          <CustomAddressSearch
            name="address"
            required={true}
            setSelectedPlace={setSelectedPlace}
            selectedPlace={selectedPlace}
            disableForm={disableForm}
          />
        </div>

        {/* reCAPTCHA */}
        {setRecaptchaToken && !disableForm && (
          <div className="col-span-2">
            <ReCAPTCHA
              sitekey={recaptchaKey}
              onChange={(token) => setRecaptchaToken(token)}
            />
          </div>
        )}

        {/* Submit button */}
        <div className="col-span-2">
          <CustomButton
            widthFull={true}
            paddingY="py-3"
            loading={loading}
            loadingSpinner={false}
            text={submitButtonText}
            actionType="submit"
            disabled={disableForm || loading}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default UserDetailsFormComponent;
