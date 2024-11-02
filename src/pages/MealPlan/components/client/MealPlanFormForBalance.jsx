import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import useCustomToast from "../../../../hooks/useCustomToast";
import InputField from "../../../../components/common/InputField";
import SelectInputField from "../../../../components/common/SelectInputField";
import {
  createDietPlanBalance,
  updateDietPlanBalance,
} from "../../../../services/reduxSlices/DietPlan/dietPlanDetailsSlice";
import {
  dietaryPreferencesSchema,
  goalsAndLifestyleSchema,
  personalInfoSchema,
} from "../../../../utils/dietPlanSchema";
import { steps } from "../../mockData/steps";
import { PersonalizedDietFormRequirements } from "../../mockData/mealFormRequirements";

export default function MealPlanFormForBalance({ onClose }) {
  const { details } = useSelector((state) => state.dietPlanDetails);
  const [formLevel, setFormLevel] = useState(0);
  const customToast = useCustomToast();
  const { createDietPlanBalanceLoading } = useSelector(
    (state) => state.dietPlanDetails,
  );
  const dispatch = useDispatch();
  const schema = useMemo(() => {
    return formLevel === 0
      ? personalInfoSchema
      : formLevel === 1
        ? goalsAndLifestyleSchema
        : dietaryPreferencesSchema;
  }, [formLevel]);

  const methods = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (details.planBalance) {
      const data = details.planBalance;
      methods.reset({
        age: data.age || "",
        gender: data.gender || "",
        height: data.height || "",
        weight: data.weight || "",
        fitnessGoal: data.fitnessGoal || "",
        weightGoals: data.weightGoals || null,
        physicalActivityLevel: data.physicalActivityLevel || "",
        dietaryPreferences: data.dietaryPreferences || "",
        dietaryRestrictions: data.dietaryRestrictions || "",
        foodAllergies: data.foodAllergies || "",
      });
    }
  }, [details.planBalance, methods]);

  // Function to handle the submission for each step
  const onSubmit = async (data) => {
    try {
      if (formLevel === 2) {
        const formData = {
          age: Number(data.age),
          gender: data.gender,
          height: Number(data.height),
          weight: Number(data.weight),
          fitnessGoal: data.fitnessGoal,
          weightGoals: data.weightGoals ? Number(data.weightGoals) : null,
          physicalActivityLevel: data.physicalActivityLevel,
          dietaryPreferences: data.dietaryPreferences,
          dietaryRestrictions: data.dietaryRestrictions,
          foodAllergies: data.foodAllergies || "",
        };

        if (!details.planBalance) {
          await dispatch(createDietPlanBalance(formData)).unwrap();
          customToast({
            title: "Form submitted successfully",
            status: "success",
          });
          onClose();
        } else {
          const hasChanges = Object.keys(formData).some(
            (key) => formData[key] !== details.planBalance[key],
          );

          if (!hasChanges) {
            customToast({
              title: "No changes made",
              status: "info",
            });
          } else {
            await dispatch(updateDietPlanBalance(formData)).unwrap();
            customToast({
              title: "Your changes have been saved",
              status: "success",
            });
            onClose();
          }
        }
      } else {
        setFormLevel((prev) => prev + 1);
      }
    } catch (error) {
      customToast({
        title: "Error submitting form",
        description: error.message,
        status: "error",
      });
    }
  };

  return (
    <div className="container mx-auto mb-24 mt-3 flex max-w-[1400px] flex-col gap-5 md:mb-0 lg:flex-row lg:gap-14 lg:p-1">
      {/*  */}
      <div className="flex h-full w-full flex-col justify-center gap-3 p-0 lg:mt-10 lg:w-1/3 lg:gap-9 lg:p-6">
        {/* Step 1  */}
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex gap-4 ${formLevel === index ? "text-textPrimary" : "text-neutral-500"}`}
          >
            <span
              className={`${formLevel === index ? "text-primaryDark" : formLevel > index ? "text-[#7dbf3f8c]" : "text-neutral-500"}`}
            >
              <IoMdCheckmarkCircleOutline className="mt-[3px] text-xl" />
            </span>
            <div className="flex flex-col items-start justify-start">
              <h3 className="mb-1 text-[15px] font-semibold md:text-base">
                {step.title}
              </h3>
              <p className="text-xs md:text-base">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/*  */}
      <div className="flex min-h-[500px] w-full flex-col justify-center overflow-y-auto rounded-lg border border-borderPrimary bg-background p-5 shadow-custom-light2 md:min-h-[600px] md:p-10 lg:w-2/3 3xl:min-h-[650px] 3xl:p-16">
        <FormProvider {...methods}>
          <form className="mb-9" onSubmit={methods.handleSubmit(onSubmit)}>
            {PersonalizedDietFormRequirements.map((requirement, index) => {
              if (formLevel === index) {
                return (
                  <div className="space-y-3 lg:space-y-4" key={index}>
                    <div className="mb-6 flex w-full flex-col items-start justify-between text-xl font-semibold sm:mb-8 sm:flex-row lg:flex-row lg:items-center">
                      <h3>{requirement.title}</h3>
                      <p className="flex justify-end pt-2 text-sm font-normal text-textPrimary">
                        Fields marked with{" "}
                        <span className="mx-1 text-red-500">*</span> are
                        mandatory.
                      </p>
                    </div>

                    {requirement.data.map((item, index) => {
                      return (
                        <div key={index}>
                          {"options" in item ? (
                            <SelectInputField
                              required={item.required}
                              placeholder={item.placeholder}
                              label={item.label}
                              name={item.name}
                              options={item.options}
                            />
                          ) : (
                            <InputField
                              required={item.required}
                              placeholder={item.placeholder}
                              label={item.label}
                              name={item.name}
                              type={item.type}
                            />
                          )}
                        </div>
                      );
                    })}
                    <div className="flex w-full justify-between gap-4 pt-3 lg:gap-10">
                      {/* Back Button */}
                      {formLevel > 0 && (
                        <button
                          className="text-textPrimarySecondary w-1/2 rounded-full border border-borderColor bg-background px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-backgroundSecondary"
                          onClick={() => setFormLevel((prev) => prev - 1)}
                        >
                          Back
                        </button>
                      )}

                      {/* Next Button */}
                      <button
                        type="submit"
                        disabled={createDietPlanBalanceLoading}
                        className="w-full rounded-full bg-primary py-2 text-black transition-colors duration-300 ease-in-out hover:bg-primaryDark"
                      >
                        {formLevel ===
                        PersonalizedDietFormRequirements.length - 1
                          ? details.planBalance
                            ? "Save"
                            : "Submit"
                          : "Next"}
                      </button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

MealPlanFormForBalance.propTypes = {
  onClose: PropTypes.func,
};
