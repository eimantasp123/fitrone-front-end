import CustomButton from "@/components/common/CustomButton";
import CustomTextarea from "@/components/common/CustomTextarea";
import CustomInput from "@/components/common/NewCharkaInput";
import NumberInputs from "@/components/common/NumberInputs";
import OptionsSelectAndRegisterToForm from "@/components/common/OptionSelectAndRegisterToForm";
import useFiltersOptions from "@/hooks/useFiltersOptions";
import { useCustomerDetails } from "@/utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SendCustomerAddForm: React.FC = () => {
  const { t } = useTranslation(["customers", "meals"]);
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
    <div className="w-full overflow-y-auto scrollbar-thin">
      <div className="mx-auto flex max-w-[1550px] flex-col">
        <FormProvider {...methods}>
          <form
            className="m-9 flex flex-col gap-4 md:grid md:grid-cols-2"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            {/* Name */}
            <CustomInput name="firstName" label="First Name" />

            {/* Last Name */}
            <CustomInput name="lastName" label="Last Name" />

            {/* Phone Number */}
            <CustomInput name="phone" type="tel" label="Phone Number" />

            {/* Age */}
            <NumberInputs name="age" label="Age" />

            {/* Height */}
            <NumberInputs name="height" label="Height (cm)" />

            {/* Weight */}
            <NumberInputs
              name="weight"
              label="Weight (kg)"
              placeholder="write your weight"
            />

            {/* Weight Goals */}
            <div className="col-span-2">
              <NumberInputs name="weightGoals" label="Weight Goals (kg)" />
            </div>

            {/* Food allergies */}
            <div className="col-span-2">
              <CustomTextarea name="foodAllergies" label="Food Allergies" />
            </div>

            {/* Activity level */}
            <OptionsSelectAndRegisterToForm
              name="physicalActivityLevel"
              placeholder="Select your activity level"
              label="Physical Activity Level"
              options={physicalActivityLevelOptions}
            />

            {/* Fitness goal */}
            <OptionsSelectAndRegisterToForm
              name="fitnessGoal"
              placeholder="Select your fitness goal"
              label="Fitness Goal"
              options={fitnessGoalOptionsTranslated}
            />

            {/* Dietary preference */}
            <OptionsSelectAndRegisterToForm
              name="dietaryPreferences"
              placeholder="Select your dietary preferences"
              label="Select dietary preferences"
              options={dietaryPreferences}
            />

            {/* Dietary restrictions */}
            <OptionsSelectAndRegisterToForm
              name="dietaryRestrictions"
              placeholder="Select your dietary restrictions"
              label="Select dietary preferences"
              options={dietaryRestrictions}
            />

            {/* Submit button */}
            <div className="col-span-2">
              <CustomButton
                widthFull={true}
                paddingY="py-3"
                text="Submit form"
                actionType="submit"
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default SendCustomerAddForm;
